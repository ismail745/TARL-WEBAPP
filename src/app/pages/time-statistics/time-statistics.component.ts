import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

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

interface StudentTimeData {
  id: string;
  name: string;
  averageTime: number;
  totalAnswers: number;
  answerSpeed: 'fast' | 'medium' | 'slow';
  timeHistory: {date: string, time: number}[];
}

interface ExerciseTimeData {
  name: string;
  averageTime: number;
  totalAttempts: number;
  gameType: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

@Pipe({
  name: 'formatTime',
  standalone: true
})
export class FormatTimePipe implements PipeTransform {
  transform(seconds: number): string {
    if (seconds < 60) {
      return `${seconds.toFixed(1)} sec`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toFixed(0).padStart(2, '0')} min`;
    }
  }
}

@Component({
  selector: 'app-time-statistics',
  standalone: true,
  imports: [CommonModule, FormsModule, FormatTimePipe],
  templateUrl: './time-statistics.component.html',
  styleUrls: ['./time-statistics.component.scss']
})
export class TimeStatisticsComponent implements OnInit, AfterViewInit {
  students: { [key: string]: Student } = {};
  answers: GameAnswer[] = [];
  studentTimeData: StudentTimeData[] = [];
  exerciseTimeData: ExerciseTimeData[] = [];
  
  loading = true;
  error: string | null = null;
  selectedStudent: string = 'all';
  
  exerciseTimeChart: Chart<'bar', number[], string> | null = null;
  studentSpeedChart: Chart<'bar', number[], string> | null = null;
  timeProgressChart: Chart<'line', number[], string> | null = null;
  
  gameTypeMapping: { [key: string]: string } = {
    'findcomposition': 'Number Composition',
    'WritetheFollowingNumberinLetters': 'Write Numbers',
    'IdentifthUnitsTensHundredsandThousands': 'Identify Units'
  };
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.loadTimeData();
  }
  
  ngAfterViewInit(): void {
  }
  
  destroyCharts(): void {
    if (this.exerciseTimeChart) {
      this.exerciseTimeChart.destroy();
      this.exerciseTimeChart = null;
    }
    
    if (this.studentSpeedChart) {
      this.studentSpeedChart.destroy();
      this.studentSpeedChart = null;
    }
    
    if (this.timeProgressChart) {
      this.timeProgressChart.destroy();
      this.timeProgressChart = null;
    }
  }
  
  loadTimeData(): void {
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
          
          this.processTimeData();
          
          this.createCharts();
          
          this.loading = false;
        }).catch((error) => {
          
          this.error = 'Error occurred while loading answers data';
          this.loading = false;
        });
      }).catch((error) => {
        
        this.error = 'Error occurred while loading student data';
        this.loading = false;
      });
    });
  }
  
  processTimeData(): void {
    const studentTimeMap = new Map<string, {
      totalTime: number,
      totalAnswers: number,
      timeHistory: {date: string, time: number}[]
    }>();
    
    const exerciseTimeMap = new Map<string, {
      totalTime: number,
      totalAttempts: number,
      gameType: string,
      difficulty: string
    }>();
    
    this.answers.forEach(answer => {
      const studentId = answer.studentId;
      const studentName = this.students[studentId]?.firstName + ' ' + this.students[studentId]?.lastName || 'Unknown';
      const answerDate = answer.date;
      
      if (!studentTimeMap.has(studentId)) {
        studentTimeMap.set(studentId, {
          totalTime: 0,
          totalAnswers: 0,
          timeHistory: []
        });
      }
      
      const timeSpent = answer.statistics?.totalTimeSpent || 0;
      if (timeSpent > 0) {
        const studentData = studentTimeMap.get(studentId)!;
        studentData.totalTime += timeSpent;
        studentData.totalAnswers++;
        studentData.timeHistory.push({
          date: answerDate,
          time: timeSpent
        });
      }
      
      Object.entries(answer.answers).forEach(([gameType, difficulties]) => {
        if (typeof difficulties !== 'object' || difficulties === null) return;
        
        Object.entries(difficulties).forEach(([difficulty, answerData]: [string, any]) => {
          if (!answerData || typeof answerData !== 'object') return;
          
          const exerciseKey = `${gameType}_${difficulty}`;
          const timeSpentOnExercise = answerData.time || 0;
          
          if (timeSpentOnExercise > 0) {
            if (!exerciseTimeMap.has(exerciseKey)) {
              exerciseTimeMap.set(exerciseKey, {
                totalTime: 0,
                totalAttempts: 0,
                gameType,
                difficulty
              });
            }
            
            const exerciseData = exerciseTimeMap.get(exerciseKey)!;
            exerciseData.totalTime += timeSpentOnExercise;
            exerciseData.totalAttempts++;
          }
        });
      });
    });
    
    this.studentTimeData = Array.from(studentTimeMap.entries()).map(([id, data]) => {
      const averageTime = data.totalAnswers > 0 ? data.totalTime / data.totalAnswers : 0;
      let answerSpeed: 'fast' | 'medium' | 'slow' = 'medium';
      
      if (averageTime < 30) {
        answerSpeed = 'fast';
      } else if (averageTime > 60) {
        answerSpeed = 'slow';
      }
      
      return {
        id,
        name: this.students[id]?.firstName + ' ' + this.students[id]?.lastName || 'Unknown',
        averageTime,
        totalAnswers: data.totalAnswers,
        answerSpeed,
        timeHistory: data.timeHistory.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      };
    });
    
    this.studentTimeData.sort((a, b) => a.averageTime - b.averageTime);
    
    this.exerciseTimeData = Array.from(exerciseTimeMap.entries()).map(([key, data]) => {
      const [gameType, difficulty] = key.split('_');
      const displayName = this.getExerciseDisplayName(gameType, difficulty);
      const averageTime = data.totalAttempts > 0 ? data.totalTime / data.totalAttempts : 0;
      
      return {
        name: displayName,
        averageTime,
        totalAttempts: data.totalAttempts,
        gameType,
        difficulty: difficulty as 'easy' | 'medium' | 'hard'
      };
    });
    
    this.exerciseTimeData.sort((a, b) => b.averageTime - a.averageTime);
  }
  
  getExerciseDisplayName(gameType: string, difficulty: string): string {
    const gameTypeName = this.gameTypeMapping[gameType] || gameType;
    const difficultyName = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    return `${gameTypeName} (${difficultyName})`;
  }
  
  onStudentChange(): void {
    this.destroyCharts();
    this.createCharts();
  }
  
  getAverageExerciseTime(): number {
    if (this.exerciseTimeData.length === 0) return 0;
    const totalTime = this.exerciseTimeData.reduce((sum, ex) => sum + ex.averageTime, 0);
    return totalTime / this.exerciseTimeData.length;
  }
  
  getAverageStudentTime(): number {
    if (this.studentTimeData.length === 0) return 0;
    const totalTime = this.studentTimeData.reduce((sum, student) => sum + student.averageTime, 0);
    return totalTime / this.studentTimeData.length;
  }
  
  getTotalAttempts(): number {
    return this.exerciseTimeData.reduce((sum, ex) => sum + ex.totalAttempts, 0);
  }
  
  createCharts(): void {
    setTimeout(() => {
      this.createExerciseTimeChart();
      this.createStudentSpeedChart();
      this.createTimeProgressChart();
    }, 100);
  }
  
  createExerciseTimeChart(): void {
    const canvas = document.getElementById('exerciseTimeChart') as HTMLCanvasElement;
    if (!canvas) return;
    
    const topExercises = this.exerciseTimeData.slice(0, 10);
    
    const labels = topExercises.map(exercise => exercise.name);
    const times = topExercises.map(exercise => exercise.averageTime);
    const backgroundColors = topExercises.map(exercise => {
      if (exercise.difficulty === 'easy') return '#a3be8c';
      if (exercise.difficulty === 'medium') return '#4682b4';
      return '#bf616a';
    });
    
    this.exerciseTimeChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Average Time (seconds)',
          data: times,
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
              label: (context) => {
                const seconds = context.parsed.x;
                if (seconds < 60) {
                  return `Average Time: ${seconds.toFixed(1)} seconds`;
                } else {
                  const minutes = Math.floor(seconds / 60);
                  const remainingSeconds = seconds % 60;
                  return `Average Time: ${minutes}:${remainingSeconds.toFixed(0).padStart(2, '0')} minutes`;
                }
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Time (seconds)',
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
              text: 'Exercise',
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
  
  createStudentSpeedChart(): void {
    const canvas = document.getElementById('studentSpeedChart') as HTMLCanvasElement;
    if (!canvas) return;
    
    const topStudents = this.studentTimeData.slice(0, 10);
    
    const labels = topStudents.map(student => student.name);
    const times = topStudents.map(student => student.averageTime);
    const backgroundColors = topStudents.map(student => {
      if (student.answerSpeed === 'fast') return '#a3be8c';
      if (student.answerSpeed === 'medium') return '#4682b4';
      return '#bf616a';
    });
    
    this.studentSpeedChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Average Response Time (seconds)',
          data: times,
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
              label: (context) => {
                const seconds = context.parsed.x;
                if (seconds < 60) {
                  return `Average Time: ${seconds.toFixed(1)} seconds`;
                } else {
                  const minutes = Math.floor(seconds / 60);
                  const remainingSeconds = seconds % 60;
                  return `Average Time: ${minutes}:${remainingSeconds.toFixed(0).padStart(2, '0')} minutes`;
                }
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Time (seconds)',
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
              text: 'Student',
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
  
  createTimeProgressChart(): void {
    const canvas = document.getElementById('timeProgressChart') as HTMLCanvasElement;
    if (!canvas) return;
    
    let timeHistory: {date: string, time: number}[] = [];
    
    if (this.selectedStudent !== 'all') {
      const student = this.studentTimeData.find(s => s.id === this.selectedStudent);
      if (student) {
        timeHistory = student.timeHistory;
      }
    } else {
      const timeByDate = new Map<string, {totalTime: number, count: number}>();
      
      this.studentTimeData.forEach(student => {
        student.timeHistory.forEach(entry => {
          const dateObj = new Date(entry.date);
          const formattedDate = dateObj.toISOString().split('T')[0];
          
          if (!timeByDate.has(formattedDate)) {
            timeByDate.set(formattedDate, {totalTime: 0, count: 0});
          }
          
          const dateData = timeByDate.get(formattedDate)!;
          dateData.totalTime += entry.time;
          dateData.count++;
        });
      });
      
      timeHistory = Array.from(timeByDate.entries())
        .map(([date, data]) => ({
          date,
          time: data.count > 0 ? data.totalTime / data.count : 0
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    
    const labels = timeHistory.map(entry => {
      const date = new Date(entry.date);
      return date.toLocaleDateString();
    });
    
    const times = timeHistory.map(entry => entry.time);
    
    this.timeProgressChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Response Time Over Time',
          data: times,
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
            borderWidth: 1,
            callbacks: {
              label: (context) => {
                const seconds = context.parsed.y;
                if (seconds < 60) {
                  return `Response Time: ${seconds.toFixed(1)} seconds`;
                } else {
                  const minutes = Math.floor(seconds / 60);
                  const remainingSeconds = seconds % 60;
                  return `Response Time: ${minutes}:${remainingSeconds.toFixed(0).padStart(2, '0')} minutes`;
                }
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Time (seconds)',
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
}
