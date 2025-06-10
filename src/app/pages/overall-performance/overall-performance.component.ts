import { Component, type OnInit, type AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HttpClient, HttpClientModule } from "@angular/common/http"
import { Chart, registerables } from "chart.js"
import { getDatabase, ref, get } from "firebase/database"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { NgClass } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { LanguageService } from "../../services/language.service"

Chart.register(...registerables)

type Language = 'en' | 'ar';
type TranslationKey = 'performanceExcellent' | 'performanceVeryGood' | 'performanceGood' | 'performanceNeedsImprovement' |
                     'easyLevelSkills' | 'mediumLevelSkills' | 'hardLevelSkills' | 'problemSolvingSpeed' |
                     'errorStudentData' | 'errorNoStudents' | 'errorAnswerData' | 'errorLoadingData' |
                     'averageScore' | 'successRate' | 'studentRanking' | 'monthlyProgress' |
                     'gameTypePerformance' | 'scoreDistribution' | 'numberComposition' | 'writeNumbers' | 'identifyUnits';

interface Student {
  firstName: string
  lastName: string
  role: "Student"
  linkedTeacherId: string
  schoolGrade: string
}

interface Answer {
  studentAnswer: any
  attemptsUsed: number
  isCorrect: boolean
  score: number
  time: number
}

interface GameAnswer {
  id: string
  studentId: string
  date: string
  totalScore: number
  idTeacher: string
  answers: {
    findcomposition?: {
      easy?: Answer
      medium?: Answer
      hard?: Answer
    }
    WritetheFollowingNumberinLetters?: {
      easy?: Answer
      medium?: Answer
      hard?: Answer
    }
    IdentifthUnitsTensHundredsandThousands?: {
      easy?: Answer
      medium?: Answer
      hard?: Answer
    }
  }
  statistics?: {
    totalTimeSpent: number
    totalAttemptsUsed: number
    correctAnswersCount: number
    incorrectAnswersCount: number
  }
}

interface StudentPerformance {
  id: string
  name: string
  averageScore: number
  successRate: number
  completedGames: number
  rank: number
  averageTime: number
  difficultyLevels: {
    easy: number
    medium: number
    hard: number
  }
  previousMonthScore?: number
  improvementRate?: number
  performanceLevel: "Excellent" | "Very Good" | "Good" | "Needs Improvement"
  strengthPoints: string[]
  weakPoints: string[]
}

@Component({
  selector: "app-overall-performance",
  standalone: true,
  imports: [CommonModule, NgClass, FormsModule, HttpClientModule],
  templateUrl: "./overall-performance.component.html",
  styleUrls: ["./overall-performance.component.scss"],
})
export class OverallPerformanceComponent implements OnInit, AfterViewInit {
  students: { [key: string]: Student } = {};
  answers: GameAnswer[] = [];
  studentPerformance: StudentPerformance[] = [];

  overallAverageScore = 0;
  overallSuccessRate = 0;
  totalGamesCompleted = 0;

  loading = true;
  error: string | null = null;

  rankingChart: Chart<"bar", number[], string> | null = null;
  scoreDistributionChart: Chart<"pie", number[], string> | null = null;
  progressChart: Chart<"line", number[], string> | null = null;
  gameTypeChart: Chart<"doughnut", number[], string> | null = null;

  private translations: Record<Language, Record<TranslationKey, string>> = {
    'en': {
      'performanceExcellent': 'Excellent',
      'performanceVeryGood': 'Very Good',
      'performanceGood': 'Good',
      'performanceNeedsImprovement': 'Needs Improvement',
      'easyLevelSkills': 'Easy Level Skills',
      'mediumLevelSkills': 'Medium Level Skills',
      'hardLevelSkills': 'Hard Level Skills',
      'problemSolvingSpeed': 'Problem Solving Speed',
      'errorStudentData': 'Student data not found',
      'errorNoStudents': 'No students linked to this teacher',
      'errorAnswerData': 'No answers available for students',
      'errorLoadingData': 'Error loading data',
      'averageScore': 'Average Score',
      'successRate': 'Success Rate',
      'studentRanking': 'Student Ranking',
      'monthlyProgress': 'Monthly Progress',
      'gameTypePerformance': 'Game Type Performance',
      'scoreDistribution': 'Score Distribution',
      'numberComposition': 'Number Composition',
      'writeNumbers': 'Write Numbers',
      'identifyUnits': 'Identify Units'
    },
    'ar': {
      'performanceExcellent': 'ممتاز',
      'performanceVeryGood': 'جيد جداً',
      'performanceGood': 'جيد',
      'performanceNeedsImprovement': 'يحتاج إلى تحسين',
      'easyLevelSkills': 'مهارات المستوى السهل',
      'mediumLevelSkills': 'مهارات المستوى المتوسط',
      'hardLevelSkills': 'مهارات المستوى الصعب',
      'problemSolvingSpeed': 'سرعة حل المشكلات',
      'errorStudentData': 'لم يتم العثور على بيانات الطالب',
      'errorNoStudents': 'لا يوجد طلاب مرتبطون بهذا المعلم',
      'errorAnswerData': 'لا توجد إجابات متاحة للطلاب',
      'errorLoadingData': 'خطأ في تحميل البيانات',
      'averageScore': 'متوسط الدرجات',
      'successRate': 'معدل النجاح',
      'studentRanking': 'ترتيب الطلاب',
      'monthlyProgress': 'التقدم الشهري',
      'gameTypePerformance': 'أداء أنواع الألعاب',
      'scoreDistribution': 'توزيع الدرجات',
      'numberComposition': 'تكوين الأرقام',
      'writeNumbers': 'كتابة الأرقام',
      'identifyUnits': 'تحديد الوحدات'
    }
  };

  constructor(
    private http: HttpClient,
    public langService: LanguageService
  ) {}

  getTranslation(key: TranslationKey): string {
    const currentLang = this.langService.getCurrentLanguage() as Language;
    return this.translations[currentLang]?.[key] || key;
  }

  ngOnInit(): void {
    this.loadPerformanceData()
  }

  ngAfterViewInit(): void {}

  destroyCharts(): void {
    if (this.rankingChart) {
      this.rankingChart.destroy()
      this.rankingChart = null
    }

    if (this.scoreDistributionChart) {
      this.scoreDistributionChart.destroy()
      this.scoreDistributionChart = null
    }

    if (this.progressChart) {
      this.progressChart.destroy()
      this.progressChart = null
    }

    if (this.gameTypeChart) {
      this.gameTypeChart.destroy()
      this.gameTypeChart = null
    }
  }

  loadPerformanceData(): void {
    this.loading = true
    this.error = null

    const auth = getAuth()
    const db = getDatabase()

    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        this.error = "User data not found"
        this.loading = false
        return
      }

      const studentsRef = ref(db, "users")
      get(studentsRef)
        .then((studentsSnap) => {
          if (!studentsSnap.exists()) {
            this.error = "Student data not found"
            this.loading = false
            return
          }

          try {
            const students = Object.entries(studentsSnap.val())
              .filter(([_, data]: [string, any]) => {
                return data?.role === "Student" && data?.linkedTeacherId === currentUser.uid
              })
              .reduce(
                (acc, [key, value]) => {
                  acc[key] = value as Student
                  return acc
                },
                {} as { [key: string]: Student },
              )

            if (Object.keys(students).length === 0) {
              this.error = "No students linked to this teacher"
              this.loading = false
              return
            }

            this.students = students

            const answersRef = ref(db, "Answers")
            get(answersRef)
              .then((answersSnap) => {
                if (!answersSnap.exists()) {
                  this.error = "Answer data not found"
                  this.loading = false
                  return
                }

                try {
                  const answers = Object.entries(answersSnap.val())
                    .filter(([_, data]: [string, any]) => {
                      return data?.idTeacher === currentUser.uid
                    })
                    .map(([key, value]: [string, any]) => {
                      return { id: key, ...value } as GameAnswer
                    })

                  if (answers.length === 0) {
                    this.error = "No answers available for students"
                    this.loading = false
                    return
                  }

                  this.answers = answers
                  this.calculateStudentPerformance()
                  this.createCharts()
                  this.loading = false
                } catch (err) {
                  console.error("Error processing answers data:", err)
                  this.error = "Error processing answer data"
                  this.loading = false
                }
              })
              .catch((error) => {
                console.error("Error loading answers data:", error)
                this.error = "Error loading answer data"
                this.loading = false
              })
          } catch (err) {
            console.error("Error processing student data:", err)
            this.error = "Error processing student data"
            this.loading = false
          }
        })
        .catch((error) => {
          console.error("Error loading student data:", error)
          this.error = "Error loading student data"
          this.loading = false
        })
    })
  }

  calculateStudentPerformance(): void {
    const studentScores: {
      [key: string]: {
        totalScore: number
        totalGames: number
        correctAnswers: number
        totalAnswers: number
        totalTime: number
        difficultyStats: {
          easy: { correct: number; total: number; time: number }
          medium: { correct: number; total: number; time: number }
          hard: { correct: number; total: number; time: number }
        }
        previousMonthScore?: number
      }
    } = {}

    Object.keys(this.students).forEach((studentId) => {
      studentScores[studentId] = {
        totalScore: 0,
        totalGames: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        totalTime: 0,
        difficultyStats: {
          easy: { correct: 0, total: 0, time: 0 },
          medium: { correct: 0, total: 0, time: 0 },
          hard: { correct: 0, total: 0, time: 0 },
        },
      }
    })

    this.answers.forEach((answer: GameAnswer) => {
      const studentId = answer.studentId
      const studentScore = studentScores[studentId]
      if (!studentScore) return

      studentScore.totalGames++
      studentScore.totalScore += answer.totalScore

      const gameTypes: (keyof GameAnswer["answers"])[] = [
        "findcomposition",
        "WritetheFollowingNumberinLetters",
        "IdentifthUnitsTensHundredsandThousands",
      ]

      const difficulties: ("easy" | "medium" | "hard")[] = ["easy", "medium", "hard"]

      gameTypes.forEach((gameType) => {
        const gameAnswers = answer.answers[gameType]
        if (!gameAnswers) return

        difficulties.forEach((difficulty) => {
          const result = gameAnswers[difficulty]
          if (!result) return

          studentScore.totalAnswers++
          studentScore.totalTime += result.time
          if (result.isCorrect) {
            studentScore.correctAnswers++
          }

          studentScore.difficultyStats[difficulty].total++
          studentScore.difficultyStats[difficulty].time += result.time
          if (result.isCorrect) {
            studentScore.difficultyStats[difficulty].correct++
          }
        })
      })
    })

    const currentDate = new Date()
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)

    this.answers.forEach((answer) => {
      const answerDate = new Date(answer.date)
      if (answerDate.getMonth() === lastMonth.getMonth() && answerDate.getFullYear() === lastMonth.getFullYear()) {
        const studentId = answer.studentId
        if (studentScores[studentId]) {
          if (!studentScores[studentId].previousMonthScore) {
            studentScores[studentId].previousMonthScore = 0
          }
          studentScores[studentId].previousMonthScore! += answer.totalScore
        }
      }
    })

    this.studentPerformance = Object.entries(studentScores).map(([studentId, data]) => {
      const student = this.students[studentId]
      const averageScore = data.totalGames > 0 ? data.totalScore / data.totalGames : 0
      const successRate = data.totalAnswers > 0 ? (data.correctAnswers / data.totalAnswers) * 100 : 0
      const averageTime = data.totalAnswers > 0 ? data.totalTime / data.totalAnswers : 0

      const difficultyLevels = {
        easy:
          data.difficultyStats.easy.total > 0
            ? (data.difficultyStats.easy.correct / data.difficultyStats.easy.total) * 100
            : 0,
        medium:
          data.difficultyStats.medium.total > 0
            ? (data.difficultyStats.medium.correct / data.difficultyStats.medium.total) * 100
            : 0,
        hard:
          data.difficultyStats.hard.total > 0
            ? (data.difficultyStats.hard.correct / data.difficultyStats.hard.total) * 100
            : 0,
      }

      const currentMonthScore = data.totalGames > 0 ? data.totalScore / data.totalGames : 0
      const previousMonthScore = data.previousMonthScore || 0
      const improvementRate =
        previousMonthScore > 0 ? ((currentMonthScore - previousMonthScore) / previousMonthScore) * 100 : 0

      let performanceLevel: "Excellent" | "Very Good" | "Good" | "Needs Improvement"
      if (averageScore >= 90) performanceLevel = "Excellent"
      else if (averageScore >= 80) performanceLevel = "Very Good"
      else if (averageScore >= 70) performanceLevel = "Good"
      else performanceLevel = "Needs Improvement"

      const strengthPoints: string[] = []
      const weakPoints: string[] = []

      if (difficultyLevels.easy >= 80) strengthPoints.push("Easy Level Skills")
      else if (difficultyLevels.easy < 60) weakPoints.push("Easy Level Skills")

      if (difficultyLevels.medium >= 80) strengthPoints.push("Medium Level Skills")
      else if (difficultyLevels.medium < 60) weakPoints.push("Medium Level Skills")

      if (difficultyLevels.hard >= 80) strengthPoints.push("Hard Level Skills")
      else if (difficultyLevels.hard < 60) weakPoints.push("Hard Level Skills")

      if (averageTime < 30) strengthPoints.push("Problem Solving Speed")
      else if (averageTime > 60) weakPoints.push("Problem Solving Speed")

      return {
        id: studentId,
        name: `${student.firstName} ${student.lastName}`,
        averageScore: Math.round(averageScore * 10) / 10,
        successRate: Math.round(successRate * 10) / 10,
        completedGames: data.totalGames,
        averageTime: Math.round(averageTime * 10) / 10,
        difficultyLevels,
        previousMonthScore: data.previousMonthScore,
        improvementRate: Math.round(improvementRate * 10) / 10,
        performanceLevel,
        strengthPoints,
        weakPoints,
      } as StudentPerformance
    })

    this.studentPerformance.sort((a, b) => b.averageScore - a.averageScore)

    this.studentPerformance.forEach((student, index) => {
      student.rank = index + 1
    })

    this.calculateOverallStatistics()
  }

  calculateOverallStatistics(): void {
    if (this.studentPerformance.length === 0) {
      this.overallAverageScore = 0
      this.overallSuccessRate = 0
      this.totalGamesCompleted = 0
      return
    }

    this.totalGamesCompleted = this.studentPerformance.reduce((sum, student) => sum + student.completedGames, 0)

    const totalScore = this.studentPerformance.reduce(
      (sum, student) => sum + student.averageScore * student.completedGames,
      0,
    )
    this.overallAverageScore =
      this.totalGamesCompleted > 0 ? Math.round((totalScore / this.totalGamesCompleted) * 10) / 10 : 0

    const weightedSuccessRate = this.studentPerformance.reduce(
      (sum, student) => sum + student.successRate * student.completedGames,
      0,
    )
    this.overallSuccessRate =
      this.totalGamesCompleted > 0 ? Math.round((weightedSuccessRate / this.totalGamesCompleted) * 10) / 10 : 0
  }

  createCharts(): void {
    setTimeout(() => {
      this._createRankingChart()
      this._createScoreDistributionChart()
      this._createProgressChart()
      this._createGameTypeChart()
    }, 100)
  }

  private _createProgressChart(): void {
    const canvas = document.getElementById("progressChart") as HTMLCanvasElement
    if (!canvas) return

    const monthlyData: { [key: string]: { count: number; avgScore: number } } = {}

    this.answers.forEach((answer) => {
      const date = new Date(answer.date)
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { count: 0, avgScore: 0 }
      }

      monthlyData[monthKey].count++
      monthlyData[monthKey].avgScore += answer.totalScore
    })

    const sortedMonths = Object.keys(monthlyData).sort()
    const labels = sortedMonths.map((month) => {
      const [year, monthNum] = month.split("-")
      return `${monthNum}/${year}`
    })

    const data = sortedMonths.map((month) => {
      const monthData = monthlyData[month]
      return monthData.count > 0 ? monthData.avgScore / monthData.count : 0
    })

    this.progressChart = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Average Score Over Time",
            data,
            fill: true,
            borderColor: "#4682b4",
            backgroundColor: "rgba(70, 130, 180, 0.1)",
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: "#4682b4",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 3,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#f1f5f9",
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            titleColor: "#f1f5f9",
            bodyColor: "#e2e8f0",
            borderColor: "#4682b4",
            borderWidth: 2,
            cornerRadius: 8,
            callbacks: {
              label: (context: any) => `Average Score: ${context.parsed.y.toFixed(1)}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: "Average Score",
              color: "#f1f5f9",
              font: {
                size: 14,
                weight: "bold",
              },
            },
            ticks: {
              color: "#e2e8f0",
            },
            grid: {
              color: "rgba(148, 163, 184, 0.3)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Month",
              color: "#f1f5f9",
              font: {
                size: 14,
                weight: "bold",
              },
            },
            ticks: {
              color: "#e2e8f0",
            },
            grid: {
              color: "rgba(148, 163, 184, 0.3)",
            },
          },
        },
      },
    })
  }

  private _createRankingChart(): void {
    const canvas = document.getElementById("rankingChart") as HTMLCanvasElement
    if (!canvas) return

    const topStudents = this.studentPerformance.slice(0, 10)
    const labels = topStudents.map((student) => student.name)
    const scores = topStudents.map((student) => student.averageScore)

    this.rankingChart = new Chart(canvas, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: this.getTranslation('averageScore'),
            data: scores,
            backgroundColor: "rgba(70, 130, 180, 0.8)",
            borderColor: "#4682b4",
            borderWidth: 2,
            borderRadius: 8,
            hoverBackgroundColor: "rgba(70, 130, 180, 1)",
            hoverBorderWidth: 3,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            titleColor: "#f1f5f9",
            bodyColor: "#e2e8f0",
            borderColor: "#4682b4",
            borderWidth: 2,
            cornerRadius: 8,
            callbacks: {
              label: (context: any) => 
                `${this.getTranslation('averageScore')}: ${context.parsed.x.toFixed(1)}`,
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: this.getTranslation('averageScore'),
              color: "#f1f5f9",
              font: {
                size: 14,
                weight: "bold",
              },
            },
            ticks: {
              color: "#e2e8f0",
            },
            grid: {
              color: "rgba(148, 163, 184, 0.3)",
            },
          },
          y: {
            title: {
              display: true,
              text: this.getTranslation('studentRanking'),
              color: "#f1f5f9",
              font: {
                size: 14,
                weight: "bold",
              },
            },
            ticks: {
              color: "#e2e8f0",
            },
            grid: {
              color: "rgba(148, 163, 184, 0.3)",
            },
          },
        },
      },
    })
  }

  private _createScoreDistributionChart(): void {
    const canvas = document.getElementById("scoreDistributionChart") as HTMLCanvasElement
    if (!canvas) return

    const scoreRanges = ["0-20", "21-40", "41-60", "61-80", "81-100"]

    const distribution = scoreRanges.map((range) => {
      let count = 0
      this.studentPerformance.forEach((student) => {
        const score = student.averageScore
        if (range === "0-20" && score >= 0 && score <= 20) count++
        else if (range === "21-40" && score > 20 && score <= 40) count++
        else if (range === "41-60" && score > 40 && score <= 60) count++
        else if (range === "61-80" && score > 60 && score <= 80) count++
        else if (range === "81-100" && score > 80 && score <= 100) count++
      })
      return count
    })

    this.scoreDistributionChart = new Chart(canvas, {
      type: "pie",
      data: {
        labels: scoreRanges,
        datasets: [
          {
            data: distribution,
            backgroundColor: [
              "rgba(239, 68, 68, 0.8)",
              "rgba(249, 115, 22, 0.8)",
              "rgba(234, 179, 8, 0.8)",
              "rgba(34, 197, 94, 0.8)",
              "rgba(59, 130, 246, 0.8)",
            ],
            borderColor: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"],
            borderWidth: 3,
            hoverBackgroundColor: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"],
            hoverBorderWidth: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: "#f1f5f9",
              font: {
                size: 14,
                weight: "bold",
              },
              padding: 20,
            },
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            titleColor: "#f1f5f9",
            bodyColor: "#e2e8f0",
            borderColor: "#4682b4",
            borderWidth: 2,
            cornerRadius: 8,
            callbacks: {
              label: (context: any) => {
                const label = context.label || ""
                const value = context.parsed || 0
                const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0)
                const percentage = total > 0 ? Math.round((value * 100) / total) : 0
                return `${label}: ${value} students (${percentage}%)`
              },
            },
          },
        },
      },
    })
  }

  private _createGameTypeChart(): void {
    const canvas = document.getElementById("gameTypeChart") as HTMLCanvasElement
    if (!canvas) return

    type GameTypeStats = { correct: number; total: number }
    const gameTypeData = new Map<string, GameTypeStats>()
    gameTypeData.set("findcomposition", { correct: 0, total: 0 })
    gameTypeData.set("WritetheFollowingNumberinLetters", { correct: 0, total: 0 })
    gameTypeData.set("IdentifthUnitsTensHundredsandThousands", { correct: 0, total: 0 })

    this.answers.forEach((answer) => {
      const gameTypes: (keyof typeof answer.answers)[] = [
        "findcomposition",
        "WritetheFollowingNumberinLetters",
        "IdentifthUnitsTensHundredsandThousands",
      ]

      gameTypes.forEach((gameType) => {
        const answers = answer.answers[gameType]
        if (!answers) return

        const stats = gameTypeData.get(gameType)!
        ;["easy", "medium", "hard"].forEach((difficulty) => {
          const result = answers[difficulty as keyof typeof answers]
          if (!result) return

          stats.total++
          if (result.isCorrect) {
            stats.correct++
          }
        })
      })
    })

    const labels = ["Number Composition", "Write Numbers", "Identify Units"]
    const successRates = [
      "findcomposition",
      "WritetheFollowingNumberinLetters",
      "IdentifthUnitsTensHundredsandThousands",
    ].map((gameType) => {
      const stats = gameTypeData.get(gameType)!
      return stats.total > 0 ? (stats.correct / stats.total) * 100 : 0
    })

    this.gameTypeChart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data: successRates,
            backgroundColor: ["rgba(70, 130, 180, 0.8)", "rgba(136, 192, 208, 0.8)", "rgba(163, 190, 140, 0.8)"],
            borderColor: ["#4682b4", "#88c0d0", "#a3be8c"],
            borderWidth: 3,
            hoverBackgroundColor: ["#4682b4", "#88c0d0", "#a3be8c"],
            hoverBorderWidth: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: "#f1f5f9",
              font: {
                size: 14,
                weight: "bold",
              },
              padding: 20,
            },
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            titleColor: "#f1f5f9",
            bodyColor: "#e2e8f0",
            borderColor: "#4682b4",
            borderWidth: 2,
            cornerRadius: 8,
            callbacks: {
              label: (context: any) => {
                const label = context.label || ""
                const value = context.parsed || 0
                return `${label}: ${value.toFixed(1)}% success rate`
              },
            },
          },
        },
      },
    })
  }
}
