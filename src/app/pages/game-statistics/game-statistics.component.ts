import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Database, ref, get } from '@angular/fire/database';
import { Auth, authState, User } from '@angular/fire/auth';
import { Chart, ChartConfiguration, CoreScaleOptions, Scale, Tick, registerables } from 'chart.js';
import { LanguageService } from '../../services/language.service';

Chart.register(...registerables);

type Language = 'en' | 'ar';

type TranslationKey = 
  | 'findComposition'
  | 'writeNumber'
  | 'identifyPlaces'
  | 'gameStatistics'
  | 'loading'
  | 'noData'
  | 'loginRequired'
  | 'errorLoading'
  | 'filter'
  | 'gameType'
  | 'difficulty'
  | 'all'
  | 'easy'
  | 'medium'
  | 'hard'
  | 'search'
  | 'resetFilters'
  | 'successRate'
  | 'studentsCount'
  | 'averageAttempts'
  | 'totalStudents'
  | 'name'
  | 'statistics'
  | 'noGamesFound'
  | 'seconds';

interface DifficultyData {
  studentAnswer: any;
  attemptsUsed: number;
  isCorrect: boolean;
  score: number;
}

interface GameAnswerData {
  easy: DifficultyData;
  medium: DifficultyData;
  hard: DifficultyData;
}

interface Game {
  id: string;
  name: string;
  type: string;
  difficulty: string;
  studentsCount: number;
  successRate: number;
  averageAttempts: number;
}

interface AnswerModel {
  gameId: string;
  studentId: string;
  date: string;
  totalScore: number;
  idTeacher: string;
  answers: {
    [gameType: string]: GameAnswerData;
  };
  statistics: {
    totalTimeSpent: number;
    totalAttemptsUsed: number;
    correctAnswersCount: number;
    incorrectAnswersCount: number;
  };
}

@Component({
  selector: 'app-game-statistics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-statistics.component.html',
  styleUrls: ['./game-statistics.component.css']
})
export class GameStatisticsComponent implements OnInit, OnDestroy {
  private translations: Record<Language, Record<TranslationKey, string>> = {
    'en': {
      'findComposition': 'Find Composition',
      'writeNumber': 'Write Number in Letters',
      'identifyPlaces': 'Identify Place Values',
      'gameStatistics': 'Game Statistics',
      'loading': 'Loading statistics...',
      'noData': 'No game data found in the database.',
      'loginRequired': 'No user found. Please login again.',
      'errorLoading': 'Failed to load data. Please try again later.',
      'filter': 'Filter',
      'gameType': 'Game Type',
      'difficulty': 'Difficulty',
      'all': 'All',
      'easy': 'Easy',
      'medium': 'Medium',
      'hard': 'Hard',
      'search': 'Search',
      'resetFilters': 'Reset Filters',
      'successRate': 'Success Rate',
      'studentsCount': 'Students Count',
      'averageAttempts': 'Average Attempts',
      'totalStudents': 'Total Students',
      'name': 'Name',
      'statistics': 'Statistics',
      'noGamesFound': 'No games found matching the current filters.',
      'seconds': 'seconds'
    },
    'ar': {
      'findComposition': 'إيجاد التركيب',
      'writeNumber': 'كتابة الرقم بالحروف',
      'identifyPlaces': 'تحديد المنازل',
      'gameStatistics': 'إحصائيات الألعاب',
      'loading': 'جاري تحميل الإحصائيات...',
      'noData': 'لم يتم العثور على بيانات في قاعدة البيانات.',
      'loginRequired': 'لم يتم العثور على المستخدم. يرجى تسجيل الدخول مرة أخرى.',
      'errorLoading': 'فشل في تحميل البيانات. يرجى المحاولة مرة أخرى لاحقاً.',
      'filter': 'تصفية',
      'gameType': 'نوع اللعبة',
      'difficulty': 'مستوى الصعوبة',
      'all': 'الكل',
      'easy': 'سهل',
      'medium': 'متوسط',
      'hard': 'صعب',
      'search': 'بحث',
      'resetFilters': 'إعادة تعيين التصفية',
      'successRate': 'معدل النجاح',
      'studentsCount': 'عدد الطلاب',
      'averageAttempts': 'متوسط المحاولات',
      'totalStudents': 'إجمالي الطلاب',
      'name': 'الاسم',
      'statistics': 'الإحصائيات',
      'noGamesFound': 'لم يتم العثور على ألعاب تطابق عوامل التصفية الحالية.',
      'seconds': 'ثواني'
    }
  };

  private studentsByGameTypeAndDifficulty: { [key: string]: Set<string> } = {};
  private correctAnswersByGameTypeAndDifficulty: { [key: string]: number } = {};
  private totalAnswersByGameTypeAndDifficulty: { [key: string]: number } = {};
  private attemptsByGameTypeAndDifficulty: { [key: string]: number[] } = {};
  private successRateChart?: Chart;
  private studentsCountChart?: Chart;
  private attemptsChart?: Chart;
  private allStudents = new Set<string>(); // Track all students

  games: { [key: string]: Game } = {};
  gameAnswers: AnswerModel[] = [];
  selectedGameType: string = 'all';
  selectedDifficulty: string = 'all';
  searchTerm: string = '';
  sortField: keyof Game = 'successRate';
  sortDirection: 'asc' | 'desc' = 'desc';
  loading: boolean = true;
  error: string | null = null;

  // Make gameTypeMap public for template access
  readonly gameTypeMap: { [key: string]: string } = {
    findcomposition: 'Find Composition',
    WritetheFollowingNumberinLetters: 'Write Number in Letters',
    IdentifthUnitsTensHundredsandThousands: 'Identify Place Values'
  };

  readonly difficultyLevels = ['easy', 'medium', 'hard'];

  constructor(
    private database: Database,
    private auth: Auth,
    private langService: LanguageService
  ) {}

  getTranslation(key: TranslationKey): string {
    const currentLang = this.langService.getCurrentLanguage() as Language;
    return this.translations[currentLang]?.[key] || key;
  }

  private async getCurrentUser(): Promise<User | null> {
    return firstValueFrom(authState(this.auth));
  }

  async ngOnInit(): Promise<void> {
    await this.loadData();
    // تأخير تحديث الرسوم البيانية للتأكد من وجود البيانات
    setTimeout(() => {
      this.updateCharts();
    }, 500);
  }

  ngOnDestroy(): void {
    this.successRateChart?.destroy();
    this.studentsCountChart?.destroy();
    this.attemptsChart?.destroy();
  }

  // Make loadData public for template access
  async loadData(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      const user = await this.getCurrentUser();
      if (!user) {
        this.error = 'No user found. Please login again.';
        this.loading = false;
        return;
      }

      this.resetStatistics();
      console.log('Loading data for teacher:', user.uid);

      // استرداد البيانات من Firebase
      const answersSnap = await get(ref(this.database, 'Answers'));
      if (!answersSnap.exists()) {
        console.log('No answers found in database');
        this.error = 'No game data found in the database.';
        this.loading = false;
        return;
      }

      const answers = answersSnap.val() as Record<string, AnswerModel>;
      let processedAnswers = 0;
      
      console.log('Raw answers data:', answers);
      
      // معالجة كل الإجابات
      Object.entries(answers).forEach(([key, answer]) => {
        if (!answer) {
          console.warn('Null answer found for key:', key);
          return;
        }
        
        console.log('Processing answer:', key, answer);
        
        // التحقق من أن الإجابة تنتمي للمعلم الحالي
        if (answer.idTeacher === user.uid) {
          // Track the student if they belong to this teacher
          this.allStudents.add(answer.studentId);
          
          // معالجة إجابات كل نوع من الألعاب
          if (answer.answers && typeof answer.answers === 'object') {
            Object.entries(answer.answers).forEach(([gameType, gameData]) => {
              // التحقق من صحة البيانات
              if (!gameData || typeof gameData !== 'object') {
                console.warn('Invalid game data for type:', gameType, gameData);
                return;
              }

              // معالجة كل مستوى صعوبة
              this.difficultyLevels.forEach(difficulty => {
                const difficultyData = gameData[difficulty as keyof GameAnswerData] as DifficultyData;
                
                if (difficultyData && typeof difficultyData === 'object') {
                  const gameKey = `${gameType}_${difficulty}`;
                  
                  if (!this.studentsByGameTypeAndDifficulty[gameKey]) {
                    this.initGameStats(gameKey);
                    console.log('Initialized new game key:', gameKey);
                  }

                  // التحقق من وجود محاولات (أي أن الطالب لعب هذا المستوى)
                  if (difficultyData.attemptsUsed > 0) {
                    // إضافة الطالب إلى مجموعة الطلاب لهذا النوع من الألعاب والصعوبة
                    this.studentsByGameTypeAndDifficulty[gameKey].add(answer.studentId);

                    // تحديث إحصائيات النجاح والمحاولات
                    if (difficultyData.isCorrect === true) {
                      this.correctAnswersByGameTypeAndDifficulty[gameKey]++;
                    }
                    this.totalAnswersByGameTypeAndDifficulty[gameKey]++;
                    
                    // إضافة عدد المحاولات
                    this.attemptsByGameTypeAndDifficulty[gameKey].push(difficultyData.attemptsUsed);
                    
                    console.log(`Added data for ${gameKey}:`, {
                      student: answer.studentId,
                      correct: difficultyData.isCorrect,
                      attempts: difficultyData.attemptsUsed
                    });
                  }
                }
              });
            });
            processedAnswers++;
          } else {
            console.warn('No answers data found for student:', answer.studentId);
          }
        }
      });

      console.log(`Processed ${processedAnswers} answers for ${this.allStudents.size} students`);
      console.log('Students by game type and difficulty:', Object.fromEntries(
        Object.entries(this.studentsByGameTypeAndDifficulty).map(([key, students]) => [key, students.size])
      ));

      // التحقق من وجود بيانات
      if (processedAnswers === 0) {
        this.error = 'No game data found for your account.';
        this.loading = false;
        return;
      }

      this.calculateGameStats();
      
      // التحقق من وجود ألعاب بعد المعالجة
      if (Object.keys(this.games).length === 0) {
        this.error = 'No valid game statistics could be calculated.';
      }

    } catch (error) {
      console.error('Error loading data:', error);
      this.error = error instanceof Error ? error.message : 'Failed to load data. Please try again later.';
      
      // Reset data in case of error
      this.resetStatistics();
    } finally {
      this.loading = false;
    }
  }

  private resetStatistics(): void {
    this.studentsByGameTypeAndDifficulty = {};
    this.correctAnswersByGameTypeAndDifficulty = {};
    this.totalAnswersByGameTypeAndDifficulty = {};
    this.attemptsByGameTypeAndDifficulty = {};
    this.allStudents.clear();
    this.games = {};
  }

  private initGameStats(gameKey: string): void {
    this.studentsByGameTypeAndDifficulty[gameKey] = new Set();
    this.correctAnswersByGameTypeAndDifficulty[gameKey] = 0;
    this.totalAnswersByGameTypeAndDifficulty[gameKey] = 0;
    this.attemptsByGameTypeAndDifficulty[gameKey] = [];
  }

  private calculateGameStats(): void {
    console.log('Calculating game stats...');
    Object.entries(this.studentsByGameTypeAndDifficulty).forEach(([gameKey, students]) => {
      const totalAnswers = this.totalAnswersByGameTypeAndDifficulty[gameKey];
      const correctAnswers = this.correctAnswersByGameTypeAndDifficulty[gameKey];
      const attempts = this.attemptsByGameTypeAndDifficulty[gameKey];
      
      console.log(`Game key: ${gameKey}`, {
        studentsCount: students.size,
        totalAnswers,
        correctAnswers,
        attempts: attempts.length
      });

      // التحقق من وجود بيانات صحيحة
      if (totalAnswers > 0 && attempts.length > 0) {
        const [gameType, difficulty] = gameKey.split('_');
        const successRate = (correctAnswers / totalAnswers) * 100;
        const averageAttempts = attempts.reduce((a, b) => a + b, 0) / attempts.length;
        
        this.games[gameKey] = {
          id: gameKey,
          name: `${this.getGameTypeName(gameType)} (${difficulty})`,
          type: gameType,
          difficulty: difficulty,
          studentsCount: students.size,
          successRate: isNaN(successRate) ? 0 : successRate,
          averageAttempts: isNaN(averageAttempts) ? 0 : averageAttempts
        };
        
        console.log('Created game stat:', this.games[gameKey]);
      }
    });
    
    console.log('Final games object:', this.games);
  }

  private getGameTypeName(type: string): string {
    return this.gameTypeMap[type] || type;
  }

  private updateCharts(): void {
    // التأكد من وجود عنصر DOM قبل تحديث الرسوم البيانية
    setTimeout(() => {
      const filteredGames = this.getFilteredGames();
      const labels = filteredGames.map(game => game.name);
      
      this.updateSuccessRateChart(labels, filteredGames);
      this.updateStudentsCountChart(labels, filteredGames);
      this.updateAttemptsChart(labels, filteredGames);
    }, 100);
  }

  // Make getFilteredGames public for template access
  getFilteredGames(): Game[] {
    return Object.values(this.games)
      .filter(game => 
        (this.selectedGameType === 'all' || game.type === this.selectedGameType) &&
        (this.selectedDifficulty === 'all' || game.difficulty === this.selectedDifficulty) &&
        (!this.searchTerm || game.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        const aValue = a[this.sortField];
        const bValue = b[this.sortField];
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
  }

  private updateSuccessRateChart(labels: string[], games: Game[]): void {
    const successRates = games.map(game => game.successRate);
    const ctx = document.getElementById('successRateChart') as HTMLCanvasElement;
    if (!ctx) {
      console.warn('successRateChart canvas not found');
      return;
    }

    if (this.successRateChart) {
      this.successRateChart.data.labels = labels;
      this.successRateChart.data.datasets[0].data = successRates;
      this.successRateChart.update();
    } else {
      this.successRateChart = this.createChart(ctx, 'Success Rate', labels, successRates, '%');
    }
  }

  private createChart(ctx: HTMLCanvasElement, label: string, labels: string[], data: number[], suffix: string = ''): Chart {
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label,
          data,
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return `${value}${suffix}`;
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }

  private updateStudentsCountChart(labels: string[], games: Game[]): void {
    const studentsCount = games.map(game => game.studentsCount);
    const ctx = document.getElementById('studentsCountChart') as HTMLCanvasElement;
    if (!ctx) {
      console.warn('studentsCountChart canvas not found');
      return;
    }

    if (this.studentsCountChart) {
      this.studentsCountChart.data.labels = labels;
      this.studentsCountChart.data.datasets[0].data = studentsCount;
      this.studentsCountChart.update();
    } else {
      this.studentsCountChart = this.createChart(ctx, 'Number of Students', labels, studentsCount);
    }
  }

  private updateAttemptsChart(labels: string[], games: Game[]): void {
    const attempts = games.map(game => game.averageAttempts);
    const ctx = document.getElementById('attemptsChart') as HTMLCanvasElement;
    if (!ctx) {
      console.warn('attemptsChart canvas not found');
      return;
    }

    if (this.attemptsChart) {
      this.attemptsChart.data.labels = labels;
      this.attemptsChart.data.datasets[0].data = attempts;
      this.attemptsChart.update();
    } else {
      this.attemptsChart = this.createChart(ctx, 'Average Attempts', labels, attempts);
    }
  }

  // Public methods for template
  onFilterChange(): void {
    this.updateCharts();
  }

  onSortChange(field: keyof Game): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'desc';
    }
    this.updateCharts();
  }

  resetFilters(): void {
    this.selectedGameType = 'all';
    this.selectedDifficulty = 'all';
    this.searchTerm = '';
    this.updateCharts();
  }

  getGameTypeDisplayName(type: string): string {
    return this.gameTypeMap[type] || type;
  }

  formatNumber(value: number): string {
    if (isNaN(value)) return '0.0';
    return value.toFixed(1);
  }

  getAverageSuccessRate(): string {
    const games = this.getFilteredGames();
    if (games.length === 0) return '0';
    const average = games.reduce((sum, game) => sum + game.successRate, 0) / games.length;
    return this.formatNumber(average);
  }

  getTotalStudentsCount(): number {
    return this.allStudents.size;
  }

  getAverageAttempts(): string {
    const games = this.getFilteredGames();
    if (games.length === 0) return '0';
    const average = games.reduce((sum, game) => sum + game.averageAttempts, 0) / games.length;
    return this.formatNumber(average);
  }
}