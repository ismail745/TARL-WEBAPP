import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FormsModule } from '@angular/forms';

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

interface StudentProgress {
  date: string;
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeSpent: number;
  gameType: string;
  difficulty: string;
}

interface GameComparison {
  name: string;
  scores: number[];
  dates: string[];
  gameType: string;
}

@Component({
  selector: 'app-student-progress',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-progress.component.html',
  styleUrls: ['./student-progress.component.scss']
})
export class StudentProgressComponent implements OnInit, AfterViewInit {
  students: { [key: string]: Student } = {};
  answers: GameAnswer[] = [];
  studentProgress: StudentProgress[] = [];
  gameComparisons: GameComparison[] = [];
  
  loading = true;
  error: string | null = null;
  selectedStudent: string = ''; 
  selectedTimeRange: string = 'all'; 
  
  progressChart: Chart<'line', number[], string> | null = null;
  comparisonChart: Chart<'bar', (number | null)[], string> | null = null;
  scoreDistributionChart: Chart<'doughnut', number[], string> | null = null;
  
  gameTypeMapping: { [key: string]: string } = {
    'findcomposition': 'Number Composition',
    'WritetheFollowingNumberinLetters': 'Write Numbers',
    'IdentifthUnitsTensHundredsandThousands': 'Identify Units'
  };
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.loadStudentData();
  }
  
  ngAfterViewInit(): void {
  }
  
  destroyCharts(): void {
    if (this.progressChart) {
      this.progressChart.destroy();
      this.progressChart = null;
    }
    
    if (this.comparisonChart) {
      this.comparisonChart.destroy();
      this.comparisonChart = null;
    }
    
    if (this.scoreDistributionChart) {
      this.scoreDistributionChart.destroy();
      this.scoreDistributionChart = null;
    }
  }
  
  loadStudentData(): void {
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
        
        const studentIds = Object.keys(students);
        if (studentIds.length > 0 && !this.selectedStudent) {
          this.selectedStudent = studentIds[0];
        }
        
        this.loadAnswersData(db, currentUser.uid);
      }).catch((error) => {
        console.error('Error loading student data:', error);
        this.error = 'Error occurred while loading student data';
        this.loading = false;
      });
    });
  }
  
  loadAnswersData(db: any, teacherId: string): void {
    const answersRef = ref(db, 'Answers');
    get(answersRef).then((answersSnap) => {
      if (!answersSnap.exists()) {
        this.error = 'Answers data not found';
        this.loading = false;
        return;
      }
      
      const answers = Object.entries(answersSnap.val())
        .filter(([_, data]: [string, any]) => {
          return data?.idTeacher === teacherId;
        })
        .map(([key, value]: [string, any]) => {
          return { id: key, ...value } as GameAnswer;
        });
      
      this.answers = answers;
      
      if (this.selectedStudent) {
        this.processStudentProgress();
      }
      
      this.loading = false;
    }).catch((error) => {
      console.error('Error loading answers data:', error);
      this.error = 'Error occurred while loading answers data';
      this.loading = false;
    });
  }
  
  onStudentChange(): void {
    this.destroyCharts();
    this.processStudentProgress();
  }
  
  onTimeRangeChange(): void {
    this.destroyCharts();
    this.processStudentProgress();
  }
  
  processStudentProgress(): void {
    if (!this.selectedStudent) return;
    
    const studentAnswers = this.answers.filter(answer => answer.studentId === this.selectedStudent);
    
    studentAnswers.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    this.studentProgress = [];
    this.gameComparisons = [];
    
    const gameComparisonMap = new Map<string, GameComparison>();
    
    studentAnswers.forEach(answer => {
      const date = new Date(answer.date);
      
      if (!this.isInSelectedTimeRange(date)) {
        return;
      }
      
      Object.entries(answer.answers).forEach(([gameType, difficulties]) => {
        if (typeof difficulties !== 'object' || difficulties === null) return;
        
        Object.entries(difficulties).forEach(([difficulty, answerData]: [string, any]) => {
          if (!answerData || typeof answerData !== 'object') return;
          
          const progress: StudentProgress = {
            date: answer.date,
            score: answerData.score || 0,
            correctAnswers: answerData.isCorrect ? 1 : 0,
            incorrectAnswers: answerData.isCorrect ? 0 : 1,
            timeSpent: answerData.time || 0,
            gameType,
            difficulty
          };
          
          this.studentProgress.push(progress);
          
          const gameKey = `${gameType}_${difficulty}`;
          const displayName = this.getGameDisplayName(gameType, difficulty);
          
          if (!gameComparisonMap.has(gameKey)) {
            gameComparisonMap.set(gameKey, {
              name: displayName,
              scores: [],
              dates: [],
              gameType
            });
          }
          
          const comparison = gameComparisonMap.get(gameKey)!;
          comparison.scores.push(answerData.score || 0);
          comparison.dates.push(answer.date);
        });
      });
    });
    
    this.gameComparisons = Array.from(gameComparisonMap.values());
    
    this.createCharts();
  }
  
  isInSelectedTimeRange(date: Date): boolean {
    if (this.selectedTimeRange === 'all') {
      return true;
    }
    
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    switch (this.selectedTimeRange) {
      case 'week':
        return diffDays <= 7;
      case 'month':
        return diffDays <= 30;
      case 'year':
        return diffDays <= 365;
      default:
        return true;
    }
  }
  
  getGameDisplayName(gameType: string, difficulty: string): string {
    const gameTypeName = this.gameTypeMapping[gameType] || gameType;
    const difficultyName = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    return `${gameTypeName} (${difficultyName})`;
  }
  
  getStudentName(studentId: string): string {
    const student = this.students[studentId];
    if (!student) return 'Unknown Student';
    return `${student.firstName} ${student.lastName}`;
  }
  
  createCharts(): void {
    setTimeout(() => {
      this.createProgressChart();
      this.createComparisonChart();
      this.createScoreDistributionChart();
    }, 100);
  }
  
  createProgressChart(): void {
    const canvas = document.getElementById('progressChart') as HTMLCanvasElement;
    if (!canvas) return;
    
    const progressByDate = new Map<string, { score: number, count: number }>;
    
    this.studentProgress.forEach(progress => {
      const dateStr = new Date(progress.date).toLocaleDateString();
      
      if (!progressByDate.has(dateStr)) {
        progressByDate.set(dateStr, { score: 0, count: 0 });
      }
      
      const dateData = progressByDate.get(dateStr)!;
      dateData.score += progress.score;
      dateData.count++;
    });
    
    const dates = Array.from(progressByDate.keys());
    const scores = Array.from(progressByDate.values()).map(data => 
      data.count > 0 ? data.score / data.count : 0
    );
    
    this.progressChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Average Score',
          data: scores,
          fill: false,
          borderColor: '#4682b4',
          backgroundColor: '#4682b4',
          tension: 0.1,
          borderWidth: 3,
          pointBackgroundColor: '#4682b4',
          pointBorderColor: '#fcefcf',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#fcefcf',
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          },
          tooltip: {
            backgroundColor: '#2f3e46',
            titleColor: '#fcefcf',
            bodyColor: '#e0e8eb',
            borderColor: '#4682b4',
            borderWidth: 1
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Score',
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
          x: {
            title: {
              display: true,
              text: 'Date',
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
  
  createComparisonChart(): void {
    const canvas = document.getElementById('comparisonChart') as HTMLCanvasElement;
    if (!canvas || this.gameComparisons.length === 0) return;
    
    const labels = this.gameComparisons.map(game => game.name);
    const datasets = [];
    
    const maxAttempts = Math.max(...this.gameComparisons.map(game => game.scores.length));
    
    const attemptsToShow = Math.min(maxAttempts, 5);
    
    for (let i = 0; i < attemptsToShow; i++) {
      const attemptIndex = maxAttempts - attemptsToShow + i;
      if (attemptIndex < 0) continue;
      
      const data = this.gameComparisons.map(game => {
        const index = game.scores.length - attemptsToShow + i;
        return index >= 0 ? game.scores[index] : null;
      });
      
      let dateLabel = `Attempt ${i + 1}`;
      for (const game of this.gameComparisons) {
        const index = game.dates.length - attemptsToShow + i;
        if (index >= 0) {
          const date = new Date(game.dates[index]);
          dateLabel = date.toLocaleDateString();
          break;
        }
      }
      
      datasets.push({
        label: dateLabel,
        data,
        backgroundColor: this.getColorForIndex(i),
        borderColor: '#3e4c54',
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 15,
        maxBarThickness: 20
      });
    }
    
    this.comparisonChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#fcefcf',
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          },
          tooltip: {
            backgroundColor: '#2f3e46',
            titleColor: '#fcefcf',
            bodyColor: '#e0e8eb',
            borderColor: '#4682b4',
            borderWidth: 1
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Score',
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
          x: {
            title: {
              display: true,
              text: 'Game Type',
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
  
  createScoreDistributionChart(): void {
    const canvas = document.getElementById('scoreDistributionChart') as HTMLCanvasElement;
    if (!canvas || this.studentProgress.length === 0) return;
    
    const totalCorrect = this.studentProgress.reduce((sum, progress) => sum + progress.correctAnswers, 0);
    const totalIncorrect = this.studentProgress.reduce((sum, progress) => sum + progress.incorrectAnswers, 0);
    
    this.scoreDistributionChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Incorrect'],
        datasets: [{
          data: [totalCorrect, totalIncorrect],
          backgroundColor: ['#a3be8c', '#bf616a'],
          borderColor: '#3e4c54',
          borderWidth: 1,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#fcefcf',
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          },
          tooltip: {
            backgroundColor: '#2f3e46',
            titleColor: '#fcefcf',
            bodyColor: '#e0e8eb',
            borderColor: '#4682b4',
            borderWidth: 1
          }
        }
      }
    });
  }
  
  getColorForIndex(index: number): string {
    const colors = [
      '#4682b4',
      '#a3be8c',
      '#88c0d0',
      '#ebcb8b',
      '#d08770'  
    ];
    
    return colors[index % colors.length];
  }
  
  getAverageScore(): number {
    if (this.studentProgress.length === 0) return 0;
    
    const totalScore = this.studentProgress.reduce((sum, progress) => sum + progress.score, 0);
    return totalScore / this.studentProgress.length;
  }
  
  getAverageTimeSpent(): number {
    if (this.studentProgress.length === 0) return 0;
    
    const totalTime = this.studentProgress.reduce((sum, progress) => sum + progress.timeSpent, 0);
    return totalTime / this.studentProgress.length;
  }
  
  formatTime(seconds: number): string {
    if (seconds < 60) {
      return `${seconds.toFixed(1)} sec`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toFixed(0).padStart(2, '0')} min`;
    }
  }
  
  getTotalGamesPlayed(): number {
    return this.studentProgress.length;
  }
}
