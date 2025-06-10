import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../../services/language.service';

Chart.register(...registerables);

interface Student {
  uid: string;
  firstName: string;
  lastName: string;
  role: string;
  linkedTeacherId: string;
  class?: string;
}

interface GameAnswer {
  id?: string;
  gameId: string;
  studentId: string;
  date: string;
  totalScore: number;
  idTeacher: string;
  studentName?: string;
  class?: string;
  answers: any;
  statistics?: {
    totalTimeSpent: number;
    totalAttemptsUsed: number;
    correctAnswersCount: number;
    incorrectAnswersCount: number;
  };
}

interface SkillData {
  name: string;
  successRate: number;
  attemptCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  gameType: string;
}

@Pipe({
  name: 'averageSuccessRate',
  standalone: true
})
export class AverageSuccessRatePipe implements PipeTransform {
  transform(skills: SkillData[]): number {
    if (!skills || skills.length === 0) return 0;
    const totalSuccessRate = skills.reduce((sum, skill) => sum + skill.successRate, 0);
    return totalSuccessRate / skills.length;
  }
}

type Language = 'en' | 'ar';

type TranslationKey = 
  | 'skillAnalysis'
  | 'loading'
  | 'error'
  | 'noData'
  | 'successRate'
  | 'attempts'
  | 'skillName'
  | 'difficulty'
  | 'gameType'
  | 'weakestSkills'
  | 'averageSuccessRate'
  | 'numberComposition'
  | 'writeNumbers'
  | 'identifyUnits'
  | 'easy'
  | 'medium'
  | 'hard';

@Component({
  selector: 'app-skill-analysis',
  standalone: true,
  imports: [CommonModule, FormsModule, AverageSuccessRatePipe],
  templateUrl: './skill-analysis.component.html',
  styleUrls: ['./skill-analysis.component.scss']
})
export class SkillAnalysisComponent implements OnInit, AfterViewInit {
  students: { [key: string]: Student } = {};
  answers: GameAnswer[] = [];
  skillsData: SkillData[] = [];
  weakestSkills: SkillData[] = [];
  
  loading = true;
  error: string | null = null;
  
  skillsChart: Chart<'bar', number[], string> | null = null;
  weakestSkillsChart: Chart<'doughnut', number[], string> | null = null;
  
  private translations: Record<Language, Record<TranslationKey, string>> = {
    'en': {
      'skillAnalysis': 'Skill Analysis',
      'loading': 'Loading...',
      'error': 'Error loading data',
      'noData': 'No data available',
      'successRate': 'Success Rate',
      'attempts': 'Attempts',
      'skillName': 'Skill Name',
      'difficulty': 'Difficulty',
      'gameType': 'Game Type',
      'weakestSkills': 'Skills Needing Improvement',
      'averageSuccessRate': 'Average Success Rate',
      'numberComposition': 'Number Composition',
      'writeNumbers': 'Write Numbers',
      'identifyUnits': 'Identify Units',
      'easy': 'Easy',
      'medium': 'Medium',
      'hard': 'Hard'
    },
    'ar': {
      'skillAnalysis': 'تحليل المهارات',
      'loading': 'جاري التحميل...',
      'error': 'خطأ في تحميل البيانات',
      'noData': 'لا توجد بيانات متاحة',
      'successRate': 'معدل النجاح',
      'attempts': 'المحاولات',
      'skillName': 'اسم المهارة',
      'difficulty': 'المستوى',
      'gameType': 'نوع اللعبة',
      'weakestSkills': 'المهارات التي تحتاج إلى تحسين',
      'averageSuccessRate': 'متوسط معدل النجاح',
      'numberComposition': 'تكوين الأرقام',
      'writeNumbers': 'كتابة الأرقام',
      'identifyUnits': 'تحديد الوحدات',
      'easy': 'سهل',
      'medium': 'متوسط',
      'hard': 'صعب'
    }
  };

  skillNameMapping: { [key: string]: string } = {
    'findcomposition': 'numberComposition',
    'WritetheFollowingNumberinLetters': 'writeNumbers',
    'IdentifthUnitsTensHundredsandThousands': 'identifyUnits'
  };
  
  constructor(
    private http: HttpClient,
    public langService: LanguageService
  ) {}
  
  ngOnInit(): void {
    this.loadSkillsData();
  }
  
  ngAfterViewInit(): void {
  }

  loadSkillsData(): void {
    this.loading = true;
    this.error = null;
    
    const auth = getAuth();
    const db = getDatabase();
    
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        this.error = 'User data not found';
        this.loading = false;
        return;
      }
      
      const studentsRef = ref(db, 'users');
      get(studentsRef).then((studentsSnap) => {
        if (!studentsSnap.exists()) {
          this.error = 'Student data not found';
          this.loading = false;
          return;
        }
        
        const students = Object.entries(studentsSnap.val())
          .filter(([_, data]: [string, any]) => {
            return data?.role === 'Student' && data?.linkedTeacherId === currentUser.uid;
          })
          .reduce((acc, [key, value]) => {
            acc[key] = value as Student;
            return acc;
          }, {} as { [key: string]: Student });
        
        this.students = students;
        
        const answersRef = ref(db, 'Answers');
        get(answersRef).then((answersSnap) => {
          if (!answersSnap.exists()) {
            this.error = 'Answers data not found';
            this.loading = false;
            return;
          }
          
          const answers = Object.entries(answersSnap.val())
            .filter(([_, data]: [string, any]) => {
              return data?.idTeacher === currentUser.uid;
            })
            .map(([key, value]: [string, any]) => {
              return { id: key, ...value } as GameAnswer;
            });
          
          this.answers = answers;
          
          this.processSkillsData();
          
          this.createCharts();
          
          this.loading = false;
        }).catch((error) => {
          console.error('Error loading answers data:', error);
          this.error = 'Error occurred while loading answers data';
          this.loading = false;
        });
      }).catch((error) => {
        console.error('Error loading student data:', error);
        this.error = 'Error occurred while loading student data';
        this.loading = false;
      });
    });
  }
  
  processSkillsData(): void {
    const skillsMap = new Map<string, { correct: number, total: number, gameType: string, difficulty: string }>();
    
    this.answers.forEach(answer => {
      Object.entries(answer.answers).forEach(([gameType, difficulties]) => {
        if (typeof difficulties !== 'object' || difficulties === null) return;
        
        Object.entries(difficulties).forEach(([difficulty, answerData]: [string, any]) => {
          if (!answerData || typeof answerData !== 'object') return;
          
          const skillKey = `${gameType}_${difficulty}`;
          const isCorrect = answerData.isCorrect || false;
          
          if (!skillsMap.has(skillKey)) {
            skillsMap.set(skillKey, { correct: 0, total: 0, gameType, difficulty });
          }
          
          const skillData = skillsMap.get(skillKey)!;
          skillData.total += 1;
          if (isCorrect) skillData.correct += 1;
        });
      });
    });
    
    this.skillsData = Array.from(skillsMap.entries()).map(([key, data]) => {
      const [gameType, difficulty] = key.split('_');
      const displayName = this.getSkillDisplayName(gameType, difficulty);
      const successRate = data.total > 0 ? (data.correct / data.total) * 100 : 0;
      
      return {
        name: displayName,
        successRate,
        attemptCount: data.total,
        difficulty: difficulty as 'easy' | 'medium' | 'hard',
        gameType
      };
    });
    
    this.weakestSkills = [...this.skillsData]
      .sort((a, b) => a.successRate - b.successRate)
      .slice(0, 5);
  }
  
  getGameTypeTranslation(gameType: string): string {
    const translationKey = this.skillNameMapping[gameType];
    if (translationKey && this.isTranslationKey(translationKey)) {
      return this.getTranslation(translationKey);
    }
    return gameType;
  }

  getDifficultyTranslation(difficulty: 'easy' | 'medium' | 'hard'): string {
    return this.getTranslation(difficulty);
  }

  private isTranslationKey(key: string): key is TranslationKey {
    return Object.keys(this.translations['en']).includes(key);
  }

  getTranslation(key: TranslationKey): string {
    const lang = this.langService.getCurrentLanguage() as Language;
    return this.translations[lang][key];
  }

  getSkillDisplayName(gameType: string, difficulty: string): string {
    const gameTypeKey = this.skillNameMapping[gameType] || gameType;
    const difficultyKey = difficulty as TranslationKey;
    const gameTypeName = this.getTranslation(gameTypeKey as TranslationKey);
    const difficultyName = this.getTranslation(difficultyKey);
    return `${gameTypeName} (${difficultyName})`;
  }
  
  createCharts(): void {
    setTimeout(() => {
      this.createSkillsChart();
      this.createWeakestSkillsChart();
    }, 100);
  }
  
  createSkillsChart(): void {
    const canvas = document.getElementById('skillsChart') as HTMLCanvasElement;
    if (!canvas) return;
    
    const sortedSkills = [...this.skillsData].sort((a, b) => b.successRate - a.successRate);
    
    const labels = sortedSkills.map(skill => skill.name);
    const successRates = sortedSkills.map(skill => skill.successRate);
    const backgroundColors = sortedSkills.map(skill => {
      if (skill.difficulty === 'easy') return '#a3be8c';
      if (skill.difficulty === 'medium') return '#4682b4';
      return '#bf616a'; // hard
    });
    
    this.skillsChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: this.getTranslation('successRate') + ' (%)',
          data: successRates,
          backgroundColor: backgroundColors,
          borderColor: '#3e4c54',
          borderWidth: 1,
          borderRadius: 4,
          barThickness: 20,
          maxBarThickness: 30
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#2f3e46',
            titleColor: '#fcefcf',
            bodyColor: '#e0e8eb',
            borderColor: '#4682b4',
            borderWidth: 1,
            callbacks: {
              label: (context) => `${this.getTranslation('successRate')}: ${context.parsed.x.toFixed(1)}%`
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: this.getTranslation('successRate') + ' (%)',
              color: '#fcefcf',
              font: {
                size: 12,
                weight: 'bold'
              }
            },
            ticks: {
              color: '#e0e8eb'
            },
            grid: {
              color: '#566c79'
            }
          },
          y: {
            title: {
              display: true,
              text: this.getTranslation('skillName'),
              color: '#fcefcf',
              font: {
                size: 12,
                weight: 'bold'
              }
            },
            ticks: {
              color: '#e0e8eb'
            },
            grid: {
              color: '#566c79'
            }
          }
        }
      }
    });
  }
  
  createWeakestSkillsChart(): void {
    const canvas = document.getElementById('weakestSkillsChart') as HTMLCanvasElement;
    if (!canvas) return;
    
    const labels = this.weakestSkills.map(skill => skill.name);
    const successRates = this.weakestSkills.map(skill => skill.successRate);
    
    this.weakestSkillsChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data: successRates,
          backgroundColor: [
            '#bf616a', // Red for weakest
            '#d08770', // Orange
            '#ebcb8b', // Yellow
            '#88c0d0', // Light blue
            '#4682b4'  // Steel blue
          ],
          borderColor: '#3e4c54',
          borderWidth: 2,
          hoverBackgroundColor: [
            '#cf717a', // Lighter red
            '#e0978a', // Lighter orange
            '#f5db9b', // Lighter yellow
            '#98d0e0', // Lighter blue
            '#5e8ca8'  // Lighter steel blue
          ],
          hoverBorderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            position: this.langService.getCurrentLanguage() === 'ar' ? 'left' : 'right',
            labels: {
              color: '#fcefcf',
              font: {
                size: 12,
                weight: 'bold'
              },
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: '#2f3e46',
            titleColor: '#fcefcf',
            bodyColor: '#e0e8eb',
            borderColor: '#4682b4',
            borderWidth: 1,
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                return `${label}: ${value.toFixed(1)}% ${this.getTranslation('successRate')}`;
              }
            }
          }
        }
      }
    });
  }
}
