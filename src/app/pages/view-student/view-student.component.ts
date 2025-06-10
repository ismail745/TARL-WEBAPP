import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Database, ref, get } from '@angular/fire/database';
import { StudentService } from '../../services/student.service';

interface PlaceValues {
  units: number;
  tens: number;
  hundreds: number;
  thousands: number;
}

interface Answer {
  studentAnswer: number[] | PlaceValues;
  attemptsUsed: number;
  isCorrect: boolean;
  score: number;
}

interface DifficultyLevels<T> {
  easy: T;
  medium: T;
  hard: T;
}

interface GameAnswer {
  id?: string;
  gameId: string;
  studentId: string;
  date: string;
  totalScore: number;
  idTeacher: string;
  answers: {
    findcomposition: {
      easy: Answer;
      medium: Answer;
      hard: Answer;
    };
    WritetheFollowingNumberinLetters: {
      easy: Answer;
      medium: Answer;
      hard: Answer;
    };
    IdentifthUnitsTensHundredsandThousands: {
      easy: Answer & { studentAnswer: PlaceValues };
      medium: Answer & { studentAnswer: PlaceValues };
      hard: Answer & { studentAnswer: PlaceValues };
    };
  };
  statistics: {
    totalTimeSpent: number;
    totalAttemptsUsed: number;
    correctAnswersCount: number;
    incorrectAnswersCount: number;
  };
}

interface Test {
  id: string;
  idTeacher: string;
  title: {
    ar: string;
    en: string;
    fr: string;
  };
  description: {
    ar: string;
    en: string;
    fr: string;
  };
  endDate: string;  // Using string for date format
  class: string;
  games: string[];
  createdAt: number;
  updatedAt: number;
  isActive: "active" | "inactive";
  findcomposition: {
    easy: {
      time: number;
      attemptsAllowed: number;
      number: number;
      solution: number[];
    };
    medium: {
      time: number;
      attemptsAllowed: number;
      number: number;
      solution: number[];
    };
    hard: {
      time: number;
      attemptsAllowed: number;
      number: number;
      solution: number[];
    };
    activeLevel: "easy" | "medium" | "hard";
  };
  WritetheFollowingNumberinLetters: {
    easy: {
      time: number;
      attemptsAllowed: number;
      number: number;
      solution: string[];
    };
    medium: {
      time: number;
      attemptsAllowed: number;
      number: number;
      solution: string[];
    };
    hard: {
      time: number;
      attemptsAllowed: number;
      number: number;
      solution: string[];
    };
    activeLevel: "easy" | "medium" | "hard";
  };
  IdentifthUnitsTensHundredsandThousands: {
    easy: {
      time: number;
      attemptsAllowed: number;
      number: number;
      solution: PlaceValues;
    };
    medium: {
      time: number;
      attemptsAllowed: number;
      number: number;
      solution: PlaceValues;
    };
    hard: {
      time: number;
      attemptsAllowed: number;
      number: number;
      solution: PlaceValues;
    };
    activeLevel: "easy" | "medium" | "hard";
  };
}

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent implements OnInit {
  studentId: string = '';
  studentData: any = null;
  loading: boolean = true;
  errorMessage: string = '';
  testHistory: GameAnswer[] = [];
  tests: Test[] = [];
  testStatsLoading: boolean = true;
  difficultyLevels: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
  testStats: {
    totalTests: number;
    averageScore: number;
    successRate: number;
    totalTime: number;
    testsByDifficulty: {
      easy: number;
      medium: number;
      hard: number;
    };
  } = {
    totalTests: 0,
    averageScore: 0,
    successRate: 0,
    totalTime: 0,
    testsByDifficulty: {
      easy: 0,
      medium: 0,
      hard: 0
    }
  };

  constructor(
    private studentService: StudentService,
    private db: Database
  ) {}

  ngOnInit() {
    this.studentService.currentStudent.subscribe(id => {
      if (id) {
        this.studentId = id;
        this.loadStudentData();
        this.loadTestHistory();
      }
    });
  }

  async loadStudentData() {
    try {
      this.loading = true;
      const studentRef = ref(this.db, `users/${this.studentId}`);
      const snapshot = await get(studentRef);

      if (snapshot.exists()) {
        this.studentData = snapshot.val();
      } else {
        this.errorMessage = 'Student not found';
      }
    } catch (error) {
      console.error('Error loading student:', error);
      this.errorMessage = 'Error loading student data';
    } finally {
      this.loading = false;
    }
  }

  async loadTestHistory() {
    try {
      this.testStatsLoading = true;
      
      // Load answers
      const answersRef = ref(this.db, 'Answers');
      const answersSnapshot = await get(answersRef);

      if (answersSnapshot.exists()) {
        const allAnswers = answersSnapshot.val();
        this.testHistory = Object.entries(allAnswers)
          .filter(([_, data]: [string, any]) => data.studentId === this.studentId)
          .map(([key, value]: [string, any]) => ({ id: key, ...value } as GameAnswer))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }

      // Load tests
      const testsRef = ref(this.db, 'tests');
      const testsSnapshot = await get(testsRef);

      if (testsSnapshot.exists()) {
        const allTests = testsSnapshot.val();
        this.tests = Object.entries(allTests)
          .filter(([_, data]: [string, any]) => data.idTeacher === this.studentData.linkedTeacherId)
          .map(([key, value]: [string, any]) => ({ id: key, ...value } as Test));
      }

      this.calculateTestStats();
    } catch (error) {
      console.error('Error loading test history:', error);
    } finally {
      this.testStatsLoading = false;
    }
  }

  private calculateTestStats() {
    if (this.testHistory.length === 0) return;

    let totalScore = 0;
    let totalCorrect = 0;
    let totalQuestions = 0;
    let totalTimeSpent = 0;

    this.testHistory.forEach(answer => {
      totalScore += answer.totalScore;
      if (answer.statistics) {
        totalCorrect += answer.statistics.correctAnswersCount;
        totalQuestions += answer.statistics.correctAnswersCount + answer.statistics.incorrectAnswersCount;
        totalTimeSpent += answer.statistics.totalTimeSpent;
      }

      // Count difficulty levels from actual answers
      for (const gameType of ['findcomposition', 'WritetheFollowingNumberinLetters', 'IdentifthUnitsTensHundredsandThousands'] as const) {
        if (answer.answers[gameType]) {
          for (const difficulty of this.difficultyLevels) {
            const gameAnswer = this.getGameAnswer(answer, gameType, difficulty);
            if (gameAnswer && gameAnswer.attemptsUsed > 0) {
              this.testStats.testsByDifficulty[difficulty]++;
            }
          }
        }
      }
    });

    this.testStats.totalTests = this.testHistory.length;
    this.testStats.averageScore = Math.round(totalScore / this.testHistory.length);
    this.testStats.successRate = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    this.testStats.totalTime = totalTimeSpent;
  }

  // Helper methods for type-safe access to game answers
  getGameAnswer(test: GameAnswer, gameType: keyof GameAnswer['answers'], level: 'easy' | 'medium' | 'hard'): Answer | undefined {
    return test.answers[gameType]?.[level];
  }

  hasGameType(test: GameAnswer, gameType: keyof GameAnswer['answers']): boolean {
    return !!test.answers[gameType];
  }

  hasAnswer(test: GameAnswer, gameType: keyof GameAnswer['answers'], level: 'easy' | 'medium' | 'hard'): boolean {
    return !!this.getGameAnswer(test, gameType, level)?.attemptsUsed;
  }

  getStudentAnswer(test: GameAnswer, gameType: keyof GameAnswer['answers'], level: 'easy' | 'medium' | 'hard'): string {
    const answer = this.getGameAnswer(test, gameType, level);
    if (!answer) return 'No answer';
    
    if (Array.isArray(answer.studentAnswer)) {
      return answer.studentAnswer.join(', ');
    } else if (typeof answer.studentAnswer === 'object') {
      return Object.values(answer.studentAnswer).join(', ');
    }
    return 'Invalid answer format';
  }

  getPlaceValue(test: GameAnswer, level: 'easy' | 'medium' | 'hard', place: keyof PlaceValues): number {
    const answer = this.getGameAnswer(test, 'IdentifthUnitsTensHundredsandThousands', level);
    if (!answer || typeof answer.studentAnswer !== 'object') return 0;
    return (answer.studentAnswer as PlaceValues)[place] || 0;
  }

  isAnswerCorrect(test: GameAnswer, gameType: keyof GameAnswer['answers'], level: 'easy' | 'medium' | 'hard'): boolean {
    return !!this.getGameAnswer(test, gameType, level)?.isCorrect;
  }

  getCorrectAnswer(test: GameAnswer, gameType: keyof GameAnswer['answers'], level: 'easy' | 'medium' | 'hard'): string {
    const testData = this.tests.find(t => t.id === test.gameId);
    if (!testData || !testData[gameType]) return 'Not available';

    const solution = testData[gameType][level]?.solution;
    if (!solution) return 'Not available';

    if (Array.isArray(solution)) {
      return solution.join(', ');
    }
    return 'Not available';
  }

  getCorrectPlaceValue(test: GameAnswer, level: 'easy' | 'medium' | 'hard', place: keyof PlaceValues): number {
    const testData = this.tests.find(t => t.id === test.gameId);
    if (!testData || !testData.IdentifthUnitsTensHundredsandThousands) return 0;

    const solution = testData.IdentifthUnitsTensHundredsandThousands[level]?.solution;
    if (!solution) return 0;

    return solution[place] || 0;
  }
}