export interface GameLevelResult {
  studentAnswer: any;
  attemptsUsed: number;
  isCorrect: boolean;
  score: number;
}

export interface IdentifthUnitsTensHundredsandThousandsLevel {
  studentAnswer: {
    units: number;
    tens: number;
    hundreds: number;
    thousands: number;
  };
  isCorrect: boolean;
  attemptsUsed: number;
  score: number;
}

export interface AnswerModel {
  gameId: string;
  studentId: string;
  date: string;
  totalScore: number;
  idTeacher: string;
  answers: {
    findcomposition: {
      easy: GameLevelResult;
      medium: GameLevelResult;
      hard: GameLevelResult;
    };
    WritetheFollowingNumberinLetters: {
      easy: GameLevelResult;
      medium: GameLevelResult;
      hard: GameLevelResult;
    };
    IdentifthUnitsTensHundredsandThousands: {
      easy: IdentifthUnitsTensHundredsandThousandsLevel;
      medium: IdentifthUnitsTensHundredsandThousandsLevel;
      hard: IdentifthUnitsTensHundredsandThousandsLevel;
    };
  };
  statistics: {
    totalTimeSpent: number;
    totalAttemptsUsed: number;
    correctAnswersCount: number;
    incorrectAnswersCount: number;
  };
}