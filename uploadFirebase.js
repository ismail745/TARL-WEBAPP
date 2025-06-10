const { initializeApp } = require('firebase/app');
const { getDatabase, ref, update } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyBa1aBN563ach8soWSP1QeCvrqZFq8yWaM",
  authDomain: "tarl-53b8f.firebaseapp.com",
  databaseURL: "https://tarl-53b8f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tarl-53b8f",
  storageBucket: "tarl-53b8f.appspot.com",
  messagingSenderId: "955448808832",
  appId: "1:955448808832:web:3777761dfdb484caf55d65"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// انسخ بياناتك من الثلاث ملفات وضعها هنا
const data = {
//   "Answers": 
//  [
//   {
//     "gameId": "game_1",
//     "studentId": "stu_1746732217285_1235",
//     "date": "2025-05-29T03:11:23.528911",
//     "totalScore": 381,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             16,
//             96,
//             7
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 15,
//           "time": 38
//         },
//         "medium": {
//           "studentAnswer": [
//             32,
//             74,
//             9
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 60,
//           "time": 13
//         },
//         "hard": {
//           "studentAnswer": [
//             33,
//             44,
//             17
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 16,
//           "time": 31
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 50,
//           "time": 58
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 6,
//           "time": 119
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 46,
//           "time": 61
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 9,
//             "hundreds": 5,
//             "thousands": 0
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 59,
//           "time": 67
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 4,
//             "hundreds": 7,
//             "thousands": 6
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 77,
//           "time": 52
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 8,
//             "hundreds": 8,
//             "thousands": 7
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 52,
//           "time": 16
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 455,
//       "totalAttemptsUsed": 22,
//       "correctAnswersCount": 7,
//       "incorrectAnswersCount": 2
//     }
//   },
//   {
//     "gameId": "game_2",
//     "studentId": "stu_1746732217285_1235",
//     "date": "2025-05-29T03:11:23.528959",
//     "totalScore": 512,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             43,
//             99,
//             36
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 92,
//           "time": 55
//         },
//         "medium": {
//           "studentAnswer": [
//             44,
//             32,
//             21
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 73,
//           "time": 48
//         },
//         "hard": {
//           "studentAnswer": [
//             100,
//             91,
//             56
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 31,
//           "time": 52
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 52,
//           "time": 85
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 84,
//           "time": 88
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 39,
//           "time": 56
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 7,
//             "hundreds": 7,
//             "thousands": 2
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 16,
//           "time": 84
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 6,
//             "hundreds": 4,
//             "thousands": 8
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 39,
//           "time": 32
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 4,
//             "tens": 4,
//             "hundreds": 9,
//             "thousands": 2
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 86,
//           "time": 44
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 544,
//       "totalAttemptsUsed": 16,
//       "correctAnswersCount": 6,
//       "incorrectAnswersCount": 3
//     }
//   },
//   {
//     "gameId": "game_3",
//     "studentId": "stu_1746732217285_1708",
//     "date": "2025-05-29T03:11:23.528995",
//     "totalScore": 592,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             81,
//             62,
//             18
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 92,
//           "time": 24
//         },
//         "medium": {
//           "studentAnswer": [
//             24,
//             31,
//             77
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 61,
//           "time": 108
//         },
//         "hard": {
//           "studentAnswer": [
//             23,
//             97,
//             92
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 13,
//           "time": 48
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 60,
//           "time": 25
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 85,
//           "time": 31
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 24,
//           "time": 63
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 6,
//             "hundreds": 9,
//             "thousands": 6
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 92,
//           "time": 88
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 5,
//             "hundreds": 4,
//             "thousands": 2
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 96,
//           "time": 107
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 9,
//             "hundreds": 3,
//             "thousands": 9
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 69,
//           "time": 93
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 587,
//       "totalAttemptsUsed": 17,
//       "correctAnswersCount": 2,
//       "incorrectAnswersCount": 7
//     }
//   },
//   {
//     "gameId": "game_4",
//     "studentId": "stu_1746732217285_1708",
//     "date": "2025-05-29T03:11:23.529028",
//     "totalScore": 435,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             31,
//             0,
//             46
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 61,
//           "time": 95
//         },
//         "medium": {
//           "studentAnswer": [
//             43,
//             88,
//             60
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 7,
//           "time": 38
//         },
//         "hard": {
//           "studentAnswer": [
//             17,
//             67,
//             46
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 54,
//           "time": 100
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 57,
//           "time": 61
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 58,
//           "time": 36
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 65,
//           "time": 48
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 5,
//             "hundreds": 6,
//             "thousands": 9
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 31,
//           "time": 49
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 5,
//             "hundreds": 3,
//             "thousands": 4
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 73,
//           "time": 105
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 7,
//             "hundreds": 7,
//             "thousands": 1
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 29,
//           "time": 39
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 571,
//       "totalAttemptsUsed": 17,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_5",
//     "studentId": "stu_1746732217285_2504",
//     "date": "2025-05-29T03:11:23.529063",
//     "totalScore": 510,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             68,
//             52,
//             74
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 25,
//           "time": 117
//         },
//         "medium": {
//           "studentAnswer": [
//             85,
//             13,
//             79
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 67,
//           "time": 26
//         },
//         "hard": {
//           "studentAnswer": [
//             3,
//             83,
//             37
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 74,
//           "time": 47
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 89,
//           "time": 33
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 52,
//           "time": 20
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 63,
//           "time": 83
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 6,
//             "hundreds": 7,
//             "thousands": 4
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 83,
//           "time": 66
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 3,
//             "hundreds": 9,
//             "thousands": 4
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 32,
//           "time": 75
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 8,
//             "hundreds": 6,
//             "thousands": 3
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 25,
//           "time": 113
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 580,
//       "totalAttemptsUsed": 21,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_6",
//     "studentId": "stu_1746732217285_2504",
//     "date": "2025-05-29T03:11:23.529117",
//     "totalScore": 377,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             26,
//             40,
//             42
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 32,
//           "time": 61
//         },
//         "medium": {
//           "studentAnswer": [
//             50,
//             42,
//             12
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 35,
//           "time": 98
//         },
//         "hard": {
//           "studentAnswer": [
//             68,
//             39,
//             30
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 6,
//           "time": 21
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 47,
//           "time": 50
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 6,
//           "time": 33
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 47,
//           "time": 52
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 3,
//             "hundreds": 9,
//             "thousands": 6
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 79,
//           "time": 44
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 6,
//             "hundreds": 0,
//             "thousands": 7
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 42,
//           "time": 56
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 6,
//             "hundreds": 9,
//             "thousands": 9
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 83,
//           "time": 40
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 455,
//       "totalAttemptsUsed": 18,
//       "correctAnswersCount": 7,
//       "incorrectAnswersCount": 2
//     }
//   },
//   {
//     "gameId": "game_7",
//     "studentId": "stu_1746732217285_3022",
//     "date": "2025-05-29T03:11:23.529167",
//     "totalScore": 523,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             3,
//             97,
//             70
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 67,
//           "time": 21
//         },
//         "medium": {
//           "studentAnswer": [
//             60,
//             37,
//             8
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 64,
//           "time": 39
//         },
//         "hard": {
//           "studentAnswer": [
//             5,
//             65,
//             33
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 67,
//           "time": 51
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 53,
//           "time": 24
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 89,
//           "time": 30
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 81,
//           "time": 60
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 4,
//             "hundreds": 6,
//             "thousands": 4
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 34,
//           "time": 49
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 8,
//             "hundreds": 1,
//             "thousands": 1
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 34,
//           "time": 20
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 8,
//             "hundreds": 6,
//             "thousands": 8
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 34,
//           "time": 32
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 326,
//       "totalAttemptsUsed": 14,
//       "correctAnswersCount": 6,
//       "incorrectAnswersCount": 3
//     }
//   },
//   {
//     "gameId": "game_8",
//     "studentId": "stu_1746732217285_3022",
//     "date": "2025-05-29T03:11:23.529207",
//     "totalScore": 520,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             50,
//             27,
//             14
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 97,
//           "time": 26
//         },
//         "medium": {
//           "studentAnswer": [
//             30,
//             65,
//             78
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 1,
//           "time": 24
//         },
//         "hard": {
//           "studentAnswer": [
//             12,
//             78,
//             25
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 82,
//           "time": 51
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 52,
//           "time": 28
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 35,
//           "time": 52
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 58,
//           "time": 42
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 8,
//             "hundreds": 8,
//             "thousands": 2
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 30,
//           "time": 99
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 1,
//             "hundreds": 8,
//             "thousands": 0
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 82,
//           "time": 48
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 7,
//             "hundreds": 4,
//             "thousands": 5
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 83,
//           "time": 78
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 448,
//       "totalAttemptsUsed": 20,
//       "correctAnswersCount": 2,
//       "incorrectAnswersCount": 7
//     }
//   },
//   {
//     "gameId": "game_9",
//     "studentId": "stu_1746732217285_3050",
//     "date": "2025-05-29T03:11:23.529249",
//     "totalScore": 380,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             31,
//             93,
//             83
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 31,
//           "time": 28
//         },
//         "medium": {
//           "studentAnswer": [
//             55,
//             75,
//             15
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 86,
//           "time": 60
//         },
//         "hard": {
//           "studentAnswer": [
//             40,
//             6,
//             2
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 71,
//           "time": 49
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 27,
//           "time": 38
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 2,
//           "time": 31
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 26,
//           "time": 50
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 3,
//             "hundreds": 2,
//             "thousands": 1
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 57,
//           "time": 107
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 8,
//             "hundreds": 1,
//             "thousands": 1
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 4,
//           "time": 67
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 6,
//             "hundreds": 4,
//             "thousands": 2
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 76,
//           "time": 79
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 509,
//       "totalAttemptsUsed": 17,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_10",
//     "studentId": "stu_1746732217285_3050",
//     "date": "2025-05-29T03:11:23.529292",
//     "totalScore": 432,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             97,
//             59,
//             28
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 96,
//           "time": 10
//         },
//         "medium": {
//           "studentAnswer": [
//             5,
//             80,
//             56
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 12,
//           "time": 41
//         },
//         "hard": {
//           "studentAnswer": [
//             39,
//             92,
//             56
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 12,
//           "time": 98
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 3,
//           "time": 16
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 72,
//           "time": 64
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 42,
//           "time": 112
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 0,
//             "hundreds": 7,
//             "thousands": 0
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 84,
//           "time": 31
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 9,
//             "hundreds": 7,
//             "thousands": 5
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 83,
//           "time": 102
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 1,
//             "hundreds": 9,
//             "thousands": 2
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 28,
//           "time": 84
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 558,
//       "totalAttemptsUsed": 16,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_11",
//     "studentId": "stu_1746732217285_3262",
//     "date": "2025-05-29T03:11:23.529325",
//     "totalScore": 491,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             72,
//             9,
//             11
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 46,
//           "time": 83
//         },
//         "medium": {
//           "studentAnswer": [
//             65,
//             28,
//             80
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 49,
//           "time": 101
//         },
//         "hard": {
//           "studentAnswer": [
//             63,
//             62,
//             74
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 65,
//           "time": 31
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 78,
//           "time": 70
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 29,
//           "time": 111
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 12,
//           "time": 50
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 4,
//             "hundreds": 4,
//             "thousands": 3
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 77,
//           "time": 63
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 7,
//             "hundreds": 6,
//             "thousands": 9
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 63,
//           "time": 84
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 7,
//             "hundreds": 1,
//             "thousands": 6
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 72,
//           "time": 48
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 641,
//       "totalAttemptsUsed": 15,
//       "correctAnswersCount": 6,
//       "incorrectAnswersCount": 3
//     }
//   },
//   {
//     "gameId": "game_12",
//     "studentId": "stu_1746732217285_3262",
//     "date": "2025-05-29T03:11:23.529357",
//     "totalScore": 368,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             29,
//             94,
//             88
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 55,
//           "time": 91
//         },
//         "medium": {
//           "studentAnswer": [
//             81,
//             8,
//             16
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 40,
//           "time": 31
//         },
//         "hard": {
//           "studentAnswer": [
//             43,
//             43,
//             3
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 20,
//           "time": 64
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 44,
//           "time": 66
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 30,
//           "time": 93
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 25,
//           "time": 113
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 5,
//             "hundreds": 7,
//             "thousands": 8
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 61,
//           "time": 85
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 9,
//             "hundreds": 0,
//             "thousands": 7
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 44,
//           "time": 21
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 5,
//             "hundreds": 3,
//             "thousands": 8
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 49,
//           "time": 36
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 600,
//       "totalAttemptsUsed": 17,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_13",
//     "studentId": "stu_1746732217285_3320",
//     "date": "2025-05-29T03:11:23.530759",
//     "totalScore": 519,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             79,
//             91,
//             40
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 45,
//           "time": 65
//         },
//         "medium": {
//           "studentAnswer": [
//             67,
//             90,
//             40
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 97,
//           "time": 84
//         },
//         "hard": {
//           "studentAnswer": [
//             42,
//             26,
//             55
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 72,
//           "time": 10
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 31,
//           "time": 93
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 50,
//           "time": 60
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 35,
//           "time": 13
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 4,
//             "hundreds": 0,
//             "thousands": 5
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 77,
//           "time": 25
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 9,
//             "hundreds": 3,
//             "thousands": 2
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 89,
//           "time": 61
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 0,
//             "hundreds": 8,
//             "thousands": 3
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 23,
//           "time": 104
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 515,
//       "totalAttemptsUsed": 20,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_14",
//     "studentId": "stu_1746732217285_3320",
//     "date": "2025-05-29T03:11:23.530860",
//     "totalScore": 571,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             51,
//             11,
//             93
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 17,
//           "time": 75
//         },
//         "medium": {
//           "studentAnswer": [
//             25,
//             47,
//             63
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 81,
//           "time": 19
//         },
//         "hard": {
//           "studentAnswer": [
//             24,
//             13,
//             88
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 70,
//           "time": 27
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 19,
//           "time": 30
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 89,
//           "time": 15
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 83,
//           "time": 85
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 9,
//             "hundreds": 9,
//             "thousands": 2
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 75,
//           "time": 20
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 1,
//             "hundreds": 9,
//             "thousands": 7
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 50,
//           "time": 75
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 0,
//             "hundreds": 1,
//             "thousands": 8
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 87,
//           "time": 63
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 409,
//       "totalAttemptsUsed": 21,
//       "correctAnswersCount": 3,
//       "incorrectAnswersCount": 6
//     }
//   },
//   {
//     "gameId": "game_15",
//     "studentId": "stu_1746732217285_3515",
//     "date": "2025-05-29T03:11:23.530908",
//     "totalScore": 400,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             62,
//             78,
//             85
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 25,
//           "time": 117
//         },
//         "medium": {
//           "studentAnswer": [
//             34,
//             3,
//             37
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 43,
//           "time": 53
//         },
//         "hard": {
//           "studentAnswer": [
//             59,
//             98,
//             36
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 62,
//           "time": 60
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 35,
//           "time": 31
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 65,
//           "time": 115
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 85,
//           "time": 32
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 9,
//             "hundreds": 7,
//             "thousands": 6
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 48,
//           "time": 91
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 9,
//             "hundreds": 5,
//             "thousands": 5
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 19,
//           "time": 83
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 1,
//             "hundreds": 6,
//             "thousands": 4
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 18,
//           "time": 51
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 633,
//       "totalAttemptsUsed": 18,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_16",
//     "studentId": "stu_1746732217285_3515",
//     "date": "2025-05-29T03:11:23.530956",
//     "totalScore": 432,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             16,
//             85,
//             95
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 78,
//           "time": 93
//         },
//         "medium": {
//           "studentAnswer": [
//             56,
//             30,
//             97
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 31,
//           "time": 55
//         },
//         "hard": {
//           "studentAnswer": [
//             80,
//             82,
//             44
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 30,
//           "time": 90
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 39,
//           "time": 24
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 52,
//           "time": 92
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 28,
//           "time": 50
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 1,
//             "hundreds": 3,
//             "thousands": 4
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 53,
//           "time": 44
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 8,
//             "hundreds": 9,
//             "thousands": 9
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 75,
//           "time": 64
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 2,
//             "hundreds": 3,
//             "thousands": 8
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 46,
//           "time": 84
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 596,
//       "totalAttemptsUsed": 18,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_17",
//     "studentId": "stu_1746732217285_3548",
//     "date": "2025-05-29T03:11:23.531003",
//     "totalScore": 522,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             32,
//             10,
//             20
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 38,
//           "time": 49
//         },
//         "medium": {
//           "studentAnswer": [
//             29,
//             13,
//             31
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 66,
//           "time": 102
//         },
//         "hard": {
//           "studentAnswer": [
//             19,
//             100,
//             91
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 97,
//           "time": 113
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 8,
//           "time": 28
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 39,
//           "time": 102
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 48,
//           "time": 52
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 4,
//             "hundreds": 8,
//             "thousands": 1
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 80,
//           "time": 72
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 9,
//             "hundreds": 8,
//             "thousands": 5
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 86,
//           "time": 86
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 3,
//             "hundreds": 5,
//             "thousands": 4
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 60,
//           "time": 26
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 630,
//       "totalAttemptsUsed": 15,
//       "correctAnswersCount": 3,
//       "incorrectAnswersCount": 6
//     }
//   },
//   {
//     "gameId": "game_18",
//     "studentId": "stu_1746732217285_3548",
//     "date": "2025-05-29T03:11:23.531051",
//     "totalScore": 383,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             36,
//             83,
//             13
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 41,
//           "time": 31
//         },
//         "medium": {
//           "studentAnswer": [
//             20,
//             70,
//             68
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 62,
//           "time": 35
//         },
//         "hard": {
//           "studentAnswer": [
//             74,
//             71,
//             33
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 10,
//           "time": 75
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 63,
//           "time": 29
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 58,
//           "time": 49
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 33,
//           "time": 64
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 7,
//             "hundreds": 1,
//             "thousands": 2
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 60,
//           "time": 26
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 3,
//             "hundreds": 8,
//             "thousands": 2
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 17,
//           "time": 105
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 5,
//             "hundreds": 3,
//             "thousands": 3
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 39,
//           "time": 57
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 471,
//       "totalAttemptsUsed": 23,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_19",
//     "studentId": "stu_1746732217285_3893",
//     "date": "2025-05-29T03:11:23.531101",
//     "totalScore": 470,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             84,
//             45,
//             23
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 77,
//           "time": 112
//         },
//         "medium": {
//           "studentAnswer": [
//             69,
//             25,
//             68
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 13,
//           "time": 78
//         },
//         "hard": {
//           "studentAnswer": [
//             20,
//             68,
//             15
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 50,
//           "time": 90
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 60,
//           "time": 12
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 87,
//           "time": 73
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 47,
//           "time": 97
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 4,
//             "hundreds": 6,
//             "thousands": 3
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 60,
//           "time": 77
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 1,
//             "hundreds": 9,
//             "thousands": 6
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 25,
//           "time": 111
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 4,
//             "hundreds": 9,
//             "thousands": 4
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 51,
//           "time": 110
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 760,
//       "totalAttemptsUsed": 19,
//       "correctAnswersCount": 7,
//       "incorrectAnswersCount": 2
//     }
//   },
//   {
//     "gameId": "game_20",
//     "studentId": "stu_1746732217285_3893",
//     "date": "2025-05-29T03:11:23.531156",
//     "totalScore": 274,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             73,
//             40,
//             29
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 2,
//           "time": 109
//         },
//         "medium": {
//           "studentAnswer": [
//             77,
//             12,
//             75
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 87,
//           "time": 78
//         },
//         "hard": {
//           "studentAnswer": [
//             47,
//             13,
//             50
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 1,
//           "time": 79
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 34,
//           "time": 91
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 15,
//           "time": 88
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 5,
//           "time": 18
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 4,
//             "hundreds": 3,
//             "thousands": 8
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 35,
//           "time": 51
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 4,
//             "hundreds": 4,
//             "thousands": 7
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 59,
//           "time": 100
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 0,
//             "hundreds": 7,
//             "thousands": 1
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 36,
//           "time": 39
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 653,
//       "totalAttemptsUsed": 23,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_21",
//     "studentId": "stu_1746732217285_4069",
//     "date": "2025-05-29T03:11:23.531215",
//     "totalScore": 452,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             16,
//             22,
//             81
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 88,
//           "time": 55
//         },
//         "medium": {
//           "studentAnswer": [
//             33,
//             80,
//             77
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 14,
//           "time": 77
//         },
//         "hard": {
//           "studentAnswer": [
//             53,
//             59,
//             37
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 77,
//           "time": 49
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 48,
//           "time": 89
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 42,
//           "time": 108
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 56,
//           "time": 50
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 7,
//             "hundreds": 2,
//             "thousands": 8
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 4,
//           "time": 61
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 4,
//             "hundreds": 3,
//             "thousands": 3
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 54,
//           "time": 104
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 4,
//             "hundreds": 0,
//             "thousands": 6
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 69,
//           "time": 105
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 698,
//       "totalAttemptsUsed": 16,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_22",
//     "studentId": "stu_1746732217285_4069",
//     "date": "2025-05-29T03:11:23.531262",
//     "totalScore": 328,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             68,
//             84,
//             88
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 58,
//           "time": 55
//         },
//         "medium": {
//           "studentAnswer": [
//             22,
//             46,
//             21
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 90,
//           "time": 44
//         },
//         "hard": {
//           "studentAnswer": [
//             74,
//             40,
//             16
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 3,
//           "time": 49
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 55,
//           "time": 87
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 2,
//           "time": 73
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 10,
//           "time": 87
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 8,
//             "hundreds": 7,
//             "thousands": 0
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 33,
//           "time": 85
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 5,
//             "hundreds": 8,
//             "thousands": 3
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 75,
//           "time": 52
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 7,
//             "hundreds": 9,
//             "thousands": 3
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 2,
//           "time": 108
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 640,
//       "totalAttemptsUsed": 20,
//       "correctAnswersCount": 2,
//       "incorrectAnswersCount": 7
//     }
//   },
//   {
//     "gameId": "game_23",
//     "studentId": "stu_1746732217285_4614",
//     "date": "2025-05-29T03:11:23.531306",
//     "totalScore": 328,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             73,
//             82,
//             49
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 83,
//           "time": 26
//         },
//         "medium": {
//           "studentAnswer": [
//             38,
//             56,
//             40
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 73,
//           "time": 90
//         },
//         "hard": {
//           "studentAnswer": [
//             66,
//             24,
//             14
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 59,
//           "time": 55
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 51,
//           "time": 64
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 1,
//           "time": 83
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 2,
//           "time": 30
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 1,
//             "hundreds": 7,
//             "thousands": 6
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 8,
//           "time": 70
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 7,
//             "hundreds": 9,
//             "thousands": 1
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 1,
//           "time": 95
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 2,
//             "hundreds": 9,
//             "thousands": 3
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 50,
//           "time": 69
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 582,
//       "totalAttemptsUsed": 21,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_24",
//     "studentId": "stu_1746732217285_4614",
//     "date": "2025-05-29T03:11:23.531356",
//     "totalScore": 414,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             76,
//             9,
//             9
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 100,
//           "time": 24
//         },
//         "medium": {
//           "studentAnswer": [
//             82,
//             67,
//             98
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 33,
//           "time": 15
//         },
//         "hard": {
//           "studentAnswer": [
//             54,
//             61,
//             37
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 25,
//           "time": 48
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 19,
//           "time": 27
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 20,
//           "time": 90
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 97,
//           "time": 120
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 2,
//             "hundreds": 5,
//             "thousands": 6
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 10,
//           "time": 56
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 4,
//             "tens": 8,
//             "hundreds": 7,
//             "thousands": 7
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 13,
//           "time": 83
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 3,
//             "hundreds": 0,
//             "thousands": 8
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 97,
//           "time": 118
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 581,
//       "totalAttemptsUsed": 17,
//       "correctAnswersCount": 6,
//       "incorrectAnswersCount": 3
//     }
//   },
//   {
//     "gameId": "game_25",
//     "studentId": "stu_1746732217285_4741",
//     "date": "2025-05-29T03:11:23.531427",
//     "totalScore": 419,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             14,
//             39,
//             90
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 22,
//           "time": 33
//         },
//         "medium": {
//           "studentAnswer": [
//             99,
//             58,
//             72
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 52,
//           "time": 97
//         },
//         "hard": {
//           "studentAnswer": [
//             78,
//             7,
//             92
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 91,
//           "time": 86
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 67,
//           "time": 97
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 19,
//           "time": 62
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 70,
//           "time": 81
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 9,
//             "hundreds": 5,
//             "thousands": 6
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 5,
//           "time": 117
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 2,
//             "hundreds": 5,
//             "thousands": 0
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 21,
//           "time": 60
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 7,
//             "hundreds": 5,
//             "thousands": 5
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 72,
//           "time": 93
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 726,
//       "totalAttemptsUsed": 15,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_26",
//     "studentId": "stu_1746732217285_4741",
//     "date": "2025-05-29T03:11:23.531495",
//     "totalScore": 488,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             39,
//             17,
//             54
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 89,
//           "time": 114
//         },
//         "medium": {
//           "studentAnswer": [
//             78,
//             2,
//             71
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 46,
//           "time": 30
//         },
//         "hard": {
//           "studentAnswer": [
//             71,
//             2,
//             96
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 57,
//           "time": 63
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 51,
//           "time": 17
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 29,
//           "time": 32
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 14,
//           "time": 106
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 7,
//             "hundreds": 4,
//             "thousands": 0
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 93,
//           "time": 103
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 6,
//             "hundreds": 3,
//             "thousands": 5
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 16,
//           "time": 49
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 3,
//             "hundreds": 2,
//             "thousands": 2
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 93,
//           "time": 112
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 626,
//       "totalAttemptsUsed": 20,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_27",
//     "studentId": "stu_1746732217285_4757",
//     "date": "2025-05-29T03:11:23.531557",
//     "totalScore": 381,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             59,
//             78,
//             44
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 13,
//           "time": 53
//         },
//         "medium": {
//           "studentAnswer": [
//             30,
//             79,
//             91
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 3,
//           "time": 59
//         },
//         "hard": {
//           "studentAnswer": [
//             53,
//             51,
//             16
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 20,
//           "time": 116
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 21,
//           "time": 24
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 48,
//           "time": 52
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 81,
//           "time": 30
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 4,
//             "tens": 2,
//             "hundreds": 9,
//             "thousands": 9
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 78,
//           "time": 65
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 2,
//             "hundreds": 6,
//             "thousands": 6
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 40,
//           "time": 20
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 9,
//             "hundreds": 9,
//             "thousands": 0
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 77,
//           "time": 112
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 531,
//       "totalAttemptsUsed": 20,
//       "correctAnswersCount": 6,
//       "incorrectAnswersCount": 3
//     }
//   },
//   {
//     "gameId": "game_28",
//     "studentId": "stu_1746732217285_4757",
//     "date": "2025-05-29T03:11:23.531616",
//     "totalScore": 346,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             15,
//             71,
//             19
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 82,
//           "time": 41
//         },
//         "medium": {
//           "studentAnswer": [
//             12,
//             81,
//             13
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 5,
//           "time": 53
//         },
//         "hard": {
//           "studentAnswer": [
//             11,
//             52,
//             87
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 49,
//           "time": 65
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 4,
//           "time": 81
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 9,
//           "time": 70
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 85,
//           "time": 13
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 6,
//             "hundreds": 4,
//             "thousands": 4
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 36,
//           "time": 47
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 2,
//             "hundreds": 2,
//             "thousands": 6
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 17,
//           "time": 67
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 0,
//             "hundreds": 0,
//             "thousands": 2
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 59,
//           "time": 102
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 539,
//       "totalAttemptsUsed": 19,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_29",
//     "studentId": "stu_1746732217285_5529",
//     "date": "2025-05-29T03:11:23.531798",
//     "totalScore": 459,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             94,
//             88,
//             53
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 61,
//           "time": 46
//         },
//         "medium": {
//           "studentAnswer": [
//             37,
//             41,
//             0
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 1,
//           "time": 41
//         },
//         "hard": {
//           "studentAnswer": [
//             64,
//             53,
//             1
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 79,
//           "time": 115
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 42,
//           "time": 18
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 62,
//           "time": 106
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 1,
//           "time": 23
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 0,
//             "hundreds": 5,
//             "thousands": 9
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 82,
//           "time": 116
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 1,
//             "hundreds": 7,
//             "thousands": 5
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 98,
//           "time": 112
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 2,
//             "hundreds": 3,
//             "thousands": 8
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 33,
//           "time": 61
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 638,
//       "totalAttemptsUsed": 18,
//       "correctAnswersCount": 3,
//       "incorrectAnswersCount": 6
//     }
//   },
//   {
//     "gameId": "game_30",
//     "studentId": "stu_1746732217285_5529",
//     "date": "2025-05-29T03:11:23.531859",
//     "totalScore": 378,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             28,
//             16,
//             52
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 94,
//           "time": 47
//         },
//         "medium": {
//           "studentAnswer": [
//             72,
//             85,
//             43
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 4,
//           "time": 97
//         },
//         "hard": {
//           "studentAnswer": [
//             7,
//             2,
//             6
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 61,
//           "time": 120
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 13,
//           "time": 20
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 26,
//           "time": 106
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 15,
//           "time": 40
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 4,
//             "hundreds": 2,
//             "thousands": 4
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 50,
//           "time": 80
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 0,
//             "hundreds": 6,
//             "thousands": 0
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 75,
//           "time": 115
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 1,
//             "hundreds": 3,
//             "thousands": 0
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 40,
//           "time": 71
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 696,
//       "totalAttemptsUsed": 18,
//       "correctAnswersCount": 6,
//       "incorrectAnswersCount": 3
//     }
//   },
//   {
//     "gameId": "game_31",
//     "studentId": "stu_1746732217285_5666",
//     "date": "2025-05-29T03:11:23.531919",
//     "totalScore": 450,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             100,
//             70,
//             35
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 69,
//           "time": 87
//         },
//         "medium": {
//           "studentAnswer": [
//             4,
//             53,
//             74
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 50,
//           "time": 96
//         },
//         "hard": {
//           "studentAnswer": [
//             5,
//             9,
//             27
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 39,
//           "time": 65
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 34,
//           "time": 71
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 100,
//           "time": 90
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 33,
//           "time": 32
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 2,
//             "hundreds": 1,
//             "thousands": 3
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 93,
//           "time": 62
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 0,
//             "hundreds": 5,
//             "thousands": 9
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 10,
//           "time": 58
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 0,
//             "hundreds": 1,
//             "thousands": 6
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 22,
//           "time": 64
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 625,
//       "totalAttemptsUsed": 18,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_32",
//     "studentId": "stu_1746732217285_5666",
//     "date": "2025-05-29T03:11:23.532144",
//     "totalScore": 466,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             38,
//             66,
//             0
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 72,
//           "time": 59
//         },
//         "medium": {
//           "studentAnswer": [
//             6,
//             89,
//             60
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 79,
//           "time": 111
//         },
//         "hard": {
//           "studentAnswer": [
//             85,
//             30,
//             72
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 55,
//           "time": 76
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 6,
//           "time": 17
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 98,
//           "time": 79
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 51,
//           "time": 48
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 5,
//             "hundreds": 8,
//             "thousands": 8
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 29,
//           "time": 115
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 0,
//             "hundreds": 4,
//             "thousands": 7
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 65,
//           "time": 37
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 9,
//             "hundreds": 7,
//             "thousands": 7
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 11,
//           "time": 97
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 639,
//       "totalAttemptsUsed": 13,
//       "correctAnswersCount": 6,
//       "incorrectAnswersCount": 3
//     }
//   },
//   {
//     "gameId": "game_33",
//     "studentId": "stu_1746732217285_6217",
//     "date": "2025-05-29T03:11:23.532208",
//     "totalScore": 384,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             91,
//             41,
//             99
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 35,
//           "time": 109
//         },
//         "medium": {
//           "studentAnswer": [
//             73,
//             59,
//             39
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 33,
//           "time": 12
//         },
//         "hard": {
//           "studentAnswer": [
//             9,
//             20,
//             10
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 1,
//           "time": 107
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 22,
//           "time": 90
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 41,
//           "time": 11
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 34,
//           "time": 51
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 7,
//             "hundreds": 8,
//             "thousands": 7
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 93,
//           "time": 100
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 3,
//             "hundreds": 8,
//             "thousands": 2
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 89,
//           "time": 76
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 4,
//             "hundreds": 9,
//             "thousands": 8
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 36,
//           "time": 115
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 671,
//       "totalAttemptsUsed": 18,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_34",
//     "studentId": "stu_1746732217285_6217",
//     "date": "2025-05-29T03:11:23.532266",
//     "totalScore": 380,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             25,
//             38,
//             49
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 85,
//           "time": 81
//         },
//         "medium": {
//           "studentAnswer": [
//             54,
//             1,
//             93
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 16,
//           "time": 118
//         },
//         "hard": {
//           "studentAnswer": [
//             44,
//             56,
//             6
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 60,
//           "time": 17
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 8,
//           "time": 58
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 4,
//           "time": 120
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 47,
//           "time": 97
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 2,
//             "hundreds": 1,
//             "thousands": 5
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 6,
//           "time": 86
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 8,
//             "hundreds": 9,
//             "thousands": 0
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 94,
//           "time": 37
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 5,
//             "hundreds": 3,
//             "thousands": 3
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 60,
//           "time": 41
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 655,
//       "totalAttemptsUsed": 21,
//       "correctAnswersCount": 3,
//       "incorrectAnswersCount": 6
//     }
//   },
//   {
//     "gameId": "game_35",
//     "studentId": "stu_1746732217285_6241",
//     "date": "2025-05-29T03:11:23.532327",
//     "totalScore": 422,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             88,
//             95,
//             76
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 15,
//           "time": 71
//         },
//         "medium": {
//           "studentAnswer": [
//             58,
//             65,
//             41
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 11,
//           "time": 43
//         },
//         "hard": {
//           "studentAnswer": [
//             45,
//             34,
//             66
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 27,
//           "time": 68
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 64,
//           "time": 55
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 18,
//           "time": 18
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 92,
//           "time": 24
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 6,
//             "hundreds": 5,
//             "thousands": 9
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 57,
//           "time": 54
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 0,
//             "hundreds": 3,
//             "thousands": 9
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 59,
//           "time": 80
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 1,
//             "hundreds": 5,
//             "thousands": 2
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 79,
//           "time": 104
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 517,
//       "totalAttemptsUsed": 21,
//       "correctAnswersCount": 6,
//       "incorrectAnswersCount": 3
//     }
//   },
//   {
//     "gameId": "game_36",
//     "studentId": "stu_1746732217285_6241",
//     "date": "2025-05-29T03:11:23.532386",
//     "totalScore": 626,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             43,
//             16,
//             81
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 89,
//           "time": 112
//         },
//         "medium": {
//           "studentAnswer": [
//             56,
//             30,
//             29
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 13,
//           "time": 12
//         },
//         "hard": {
//           "studentAnswer": [
//             57,
//             7,
//             58
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 71,
//           "time": 71
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 75,
//           "time": 104
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 63,
//           "time": 113
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 61,
//           "time": 58
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 4,
//             "tens": 1,
//             "hundreds": 2,
//             "thousands": 0
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 100,
//           "time": 105
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 5,
//             "hundreds": 2,
//             "thousands": 0
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 92,
//           "time": 35
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 3,
//             "hundreds": 7,
//             "thousands": 1
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 62,
//           "time": 37
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 647,
//       "totalAttemptsUsed": 17,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_37",
//     "studentId": "stu_1746732217285_6370",
//     "date": "2025-05-29T03:11:23.532439",
//     "totalScore": 538,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             72,
//             71,
//             91
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 82,
//           "time": 83
//         },
//         "medium": {
//           "studentAnswer": [
//             30,
//             39,
//             31
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 76,
//           "time": 112
//         },
//         "hard": {
//           "studentAnswer": [
//             80,
//             1,
//             20
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 19,
//           "time": 69
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 76,
//           "time": 115
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 95,
//           "time": 66
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 27,
//           "time": 16
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 3,
//             "hundreds": 5,
//             "thousands": 2
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 32,
//           "time": 31
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 1,
//             "hundreds": 4,
//             "thousands": 8
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 92,
//           "time": 118
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 4,
//             "tens": 6,
//             "hundreds": 2,
//             "thousands": 0
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 39,
//           "time": 93
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 703,
//       "totalAttemptsUsed": 19,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_38",
//     "studentId": "stu_1746732217285_6370",
//     "date": "2025-05-29T03:11:23.532501",
//     "totalScore": 546,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             48,
//             3,
//             34
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 25,
//           "time": 52
//         },
//         "medium": {
//           "studentAnswer": [
//             58,
//             58,
//             75
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 99,
//           "time": 16
//         },
//         "hard": {
//           "studentAnswer": [
//             6,
//             85,
//             93
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 25,
//           "time": 114
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 52,
//           "time": 19
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 23,
//           "time": 45
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 81,
//           "time": 114
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 0,
//             "hundreds": 6,
//             "thousands": 5
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 80,
//           "time": 50
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 2,
//             "hundreds": 3,
//             "thousands": 1
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 91,
//           "time": 16
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 0,
//             "hundreds": 4,
//             "thousands": 3
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 70,
//           "time": 41
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 467,
//       "totalAttemptsUsed": 18,
//       "correctAnswersCount": 7,
//       "incorrectAnswersCount": 2
//     }
//   },
//   {
//     "gameId": "game_39",
//     "studentId": "stu_1746732217285_6509",
//     "date": "2025-05-29T03:11:23.532552",
//     "totalScore": 391,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             73,
//             65,
//             29
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 6,
//           "time": 70
//         },
//         "medium": {
//           "studentAnswer": [
//             1,
//             70,
//             0
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 62,
//           "time": 102
//         },
//         "hard": {
//           "studentAnswer": [
//             84,
//             48,
//             88
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 1,
//           "time": 80
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 83,
//           "time": 118
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 32,
//           "time": 47
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 67,
//           "time": 11
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 2,
//             "hundreds": 4,
//             "thousands": 0
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 78,
//           "time": 106
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 8,
//             "hundreds": 6,
//             "thousands": 5
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 36,
//           "time": 67
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 4,
//             "tens": 1,
//             "hundreds": 6,
//             "thousands": 3
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 26,
//           "time": 50
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 651,
//       "totalAttemptsUsed": 15,
//       "correctAnswersCount": 3,
//       "incorrectAnswersCount": 6
//     }
//   },
//   {
//     "gameId": "game_40",
//     "studentId": "stu_1746732217285_6509",
//     "date": "2025-05-29T03:11:23.532606",
//     "totalScore": 295,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             86,
//             23,
//             48
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 91,
//           "time": 37
//         },
//         "medium": {
//           "studentAnswer": [
//             9,
//             73,
//             39
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 53,
//           "time": 37
//         },
//         "hard": {
//           "studentAnswer": [
//             3,
//             33,
//             65
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 8,
//           "time": 45
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 24,
//           "time": 37
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 7,
//           "time": 98
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 27,
//           "time": 77
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 5,
//             "hundreds": 9,
//             "thousands": 2
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 29,
//           "time": 20
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 3,
//             "hundreds": 0,
//             "thousands": 0
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 41,
//           "time": 102
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 0,
//             "hundreds": 9,
//             "thousands": 1
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 15,
//           "time": 60
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 513,
//       "totalAttemptsUsed": 15,
//       "correctAnswersCount": 6,
//       "incorrectAnswersCount": 3
//     }
//   },
//   {
//     "gameId": "game_41",
//     "studentId": "stu_1746732217285_6559",
//     "date": "2025-05-29T03:11:23.532664",
//     "totalScore": 549,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             51,
//             28,
//             31
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 38,
//           "time": 70
//         },
//         "medium": {
//           "studentAnswer": [
//             51,
//             32,
//             24
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 96,
//           "time": 43
//         },
//         "hard": {
//           "studentAnswer": [
//             74,
//             48,
//             0
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 17,
//           "time": 90
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 86,
//           "time": 102
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 50,
//           "time": 33
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 72,
//           "time": 64
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 0,
//             "hundreds": 5,
//             "thousands": 4
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 97,
//           "time": 88
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 3,
//             "hundreds": 3,
//             "thousands": 5
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 53,
//           "time": 40
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 8,
//             "hundreds": 4,
//             "thousands": 9
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 40,
//           "time": 45
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 575,
//       "totalAttemptsUsed": 17,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_42",
//     "studentId": "stu_1746732217285_6559",
//     "date": "2025-05-29T03:11:23.532722",
//     "totalScore": 373,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             18,
//             20,
//             20
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 48,
//           "time": 33
//         },
//         "medium": {
//           "studentAnswer": [
//             4,
//             6,
//             43
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 13,
//           "time": 43
//         },
//         "hard": {
//           "studentAnswer": [
//             19,
//             23,
//             20
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 90,
//           "time": 107
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 83,
//           "time": 81
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 18,
//           "time": 90
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 10,
//           "time": 88
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 0,
//             "hundreds": 0,
//             "thousands": 4
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 66,
//           "time": 21
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 9,
//             "hundreds": 3,
//             "thousands": 4
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 8,
//           "time": 19
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 1,
//             "hundreds": 9,
//             "thousands": 2
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 37,
//           "time": 57
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 539,
//       "totalAttemptsUsed": 15,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_43",
//     "studentId": "stu_1746732217285_6602",
//     "date": "2025-05-29T03:11:23.532780",
//     "totalScore": 286,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             40,
//             28,
//             36
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 89,
//           "time": 27
//         },
//         "medium": {
//           "studentAnswer": [
//             58,
//             46,
//             29
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 17,
//           "time": 79
//         },
//         "hard": {
//           "studentAnswer": [
//             83,
//             62,
//             11
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 2,
//           "time": 86
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 22,
//           "time": 35
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 65,
//           "time": 33
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 24,
//           "time": 36
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 1,
//             "hundreds": 3,
//             "thousands": 6
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 8,
//           "time": 11
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 5,
//             "hundreds": 8,
//             "thousands": 1
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 26,
//           "time": 96
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 1,
//             "hundreds": 2,
//             "thousands": 6
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 33,
//           "time": 107
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 510,
//       "totalAttemptsUsed": 21,
//       "correctAnswersCount": 7,
//       "incorrectAnswersCount": 2
//     }
//   },
//   {
//     "gameId": "game_44",
//     "studentId": "stu_1746732217285_6602",
//     "date": "2025-05-29T03:11:23.532835",
//     "totalScore": 389,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             51,
//             70,
//             77
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 19,
//           "time": 67
//         },
//         "medium": {
//           "studentAnswer": [
//             57,
//             60,
//             1
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 82,
//           "time": 52
//         },
//         "hard": {
//           "studentAnswer": [
//             74,
//             16,
//             47
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 71,
//           "time": 72
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 38,
//           "time": 104
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 35,
//           "time": 28
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 9,
//           "time": 115
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 7,
//             "hundreds": 9,
//             "thousands": 5
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 40,
//           "time": 22
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 8,
//             "hundreds": 4,
//             "thousands": 4
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 18,
//           "time": 31
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 2,
//             "hundreds": 6,
//             "thousands": 9
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 77,
//           "time": 84
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 575,
//       "totalAttemptsUsed": 19,
//       "correctAnswersCount": 3,
//       "incorrectAnswersCount": 6
//     }
//   },
//   {
//     "gameId": "game_45",
//     "studentId": "stu_1746732217285_6629",
//     "date": "2025-05-29T03:11:23.532885",
//     "totalScore": 556,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             80,
//             20,
//             5
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 71,
//           "time": 25
//         },
//         "medium": {
//           "studentAnswer": [
//             30,
//             38,
//             46
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 11,
//           "time": 36
//         },
//         "hard": {
//           "studentAnswer": [
//             81,
//             73,
//             17
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 80,
//           "time": 40
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 68,
//           "time": 67
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 62,
//           "time": 107
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 48,
//           "time": 30
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 3,
//             "hundreds": 6,
//             "thousands": 5
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 68,
//           "time": 52
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 8,
//             "hundreds": 5,
//             "thousands": 0
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 61,
//           "time": 72
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 1,
//             "hundreds": 3,
//             "thousands": 5
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 87,
//           "time": 63
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 492,
//       "totalAttemptsUsed": 17,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_46",
//     "studentId": "stu_1746732217285_6629",
//     "date": "2025-05-29T03:11:23.532954",
//     "totalScore": 687,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             1,
//             43,
//             64
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 66,
//           "time": 118
//         },
//         "medium": {
//           "studentAnswer": [
//             77,
//             74,
//             8
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 87,
//           "time": 114
//         },
//         "hard": {
//           "studentAnswer": [
//             61,
//             88,
//             33
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 79,
//           "time": 104
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 53,
//           "time": 30
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 98,
//           "time": 48
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 83,
//           "time": 53
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 5,
//             "hundreds": 4,
//             "thousands": 3
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 59,
//           "time": 99
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 1,
//             "hundreds": 9,
//             "thousands": 7
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 90,
//           "time": 76
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 7,
//             "hundreds": 0,
//             "thousands": 8
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 72,
//           "time": 89
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 731,
//       "totalAttemptsUsed": 13,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_47",
//     "studentId": "stu_1746732217285_6692",
//     "date": "2025-05-29T03:11:23.533008",
//     "totalScore": 477,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             17,
//             26,
//             34
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 55,
//           "time": 10
//         },
//         "medium": {
//           "studentAnswer": [
//             93,
//             31,
//             94
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 98,
//           "time": 44
//         },
//         "hard": {
//           "studentAnswer": [
//             1,
//             98,
//             99
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 98,
//           "time": 24
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 23,
//           "time": 74
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 5,
//           "time": 56
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 47,
//           "time": 72
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 1,
//             "hundreds": 4,
//             "thousands": 6
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 55,
//           "time": 74
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 8,
//             "hundreds": 0,
//             "thousands": 4
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 47,
//           "time": 12
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 6,
//             "hundreds": 8,
//             "thousands": 3
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 49,
//           "time": 29
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 395,
//       "totalAttemptsUsed": 21,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_48",
//     "studentId": "stu_1746732217285_6692",
//     "date": "2025-05-29T03:11:23.533060",
//     "totalScore": 299,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             11,
//             12,
//             66
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 9,
//           "time": 30
//         },
//         "medium": {
//           "studentAnswer": [
//             73,
//             49,
//             98
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 76,
//           "time": 88
//         },
//         "hard": {
//           "studentAnswer": [
//             83,
//             47,
//             25
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 64,
//           "time": 17
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 37,
//           "time": 97
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 15,
//           "time": 18
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 49,
//           "time": 48
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 8,
//             "hundreds": 2,
//             "thousands": 7
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 8,
//           "time": 56
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 8,
//             "hundreds": 7,
//             "thousands": 0
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 25,
//           "time": 66
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 1,
//             "hundreds": 7,
//             "thousands": 0
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 16,
//           "time": 95
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 515,
//       "totalAttemptsUsed": 16,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_49",
//     "studentId": "stu_1746732217285_6742",
//     "date": "2025-05-29T03:11:23.533115",
//     "totalScore": 468,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             3,
//             35,
//             63
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 85,
//           "time": 115
//         },
//         "medium": {
//           "studentAnswer": [
//             7,
//             40,
//             33
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 29,
//           "time": 36
//         },
//         "hard": {
//           "studentAnswer": [
//             99,
//             6,
//             23
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 71,
//           "time": 103
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 1,
//           "time": 97
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 77,
//           "time": 64
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 1,
//           "time": 77
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 6,
//             "hundreds": 2,
//             "thousands": 3
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 69,
//           "time": 117
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 9,
//             "hundreds": 8,
//             "thousands": 8
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 38,
//           "time": 65
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 4,
//             "hundreds": 5,
//             "thousands": 1
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 97,
//           "time": 93
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 767,
//       "totalAttemptsUsed": 20,
//       "correctAnswersCount": 6,
//       "incorrectAnswersCount": 3
//     }
//   },
//   {
//     "gameId": "game_50",
//     "studentId": "stu_1746732217285_6742",
//     "date": "2025-05-29T03:11:23.533170",
//     "totalScore": 493,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             56,
//             44,
//             32
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 71,
//           "time": 94
//         },
//         "medium": {
//           "studentAnswer": [
//             47,
//             22,
//             3
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 84,
//           "time": 36
//         },
//         "hard": {
//           "studentAnswer": [
//             92,
//             45,
//             66
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 12,
//           "time": 44
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 50,
//           "time": 84
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 69,
//           "time": 78
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 66,
//           "time": 20
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 4,
//             "tens": 6,
//             "hundreds": 8,
//             "thousands": 8
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 10,
//           "time": 107
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 8,
//             "hundreds": 2,
//             "thousands": 7
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 33,
//           "time": 95
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 0,
//             "hundreds": 1,
//             "thousands": 9
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 98,
//           "time": 32
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 590,
//       "totalAttemptsUsed": 19,
//       "correctAnswersCount": 7,
//       "incorrectAnswersCount": 2
//     }
//   },
//   {
//     "gameId": "game_51",
//     "studentId": "stu_1746732217285_6835",
//     "date": "2025-05-29T03:11:23.533226",
//     "totalScore": 419,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             56,
//             74,
//             59
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 11,
//           "time": 90
//         },
//         "medium": {
//           "studentAnswer": [
//             96,
//             2,
//             31
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 80,
//           "time": 62
//         },
//         "hard": {
//           "studentAnswer": [
//             69,
//             83,
//             18
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 28,
//           "time": 39
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 16,
//           "time": 83
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 63,
//           "time": 76
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 53,
//           "time": 57
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 4,
//             "tens": 1,
//             "hundreds": 4,
//             "thousands": 8
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 67,
//           "time": 51
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 8,
//             "hundreds": 0,
//             "thousands": 0
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 31,
//           "time": 119
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 4,
//             "hundreds": 1,
//             "thousands": 2
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 70,
//           "time": 68
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 645,
//       "totalAttemptsUsed": 17,
//       "correctAnswersCount": 3,
//       "incorrectAnswersCount": 6
//     }
//   },
//   {
//     "gameId": "game_52",
//     "studentId": "stu_1746732217285_6835",
//     "date": "2025-05-29T03:11:23.533280",
//     "totalScore": 307,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             21,
//             85,
//             84
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 70,
//           "time": 118
//         },
//         "medium": {
//           "studentAnswer": [
//             11,
//             44,
//             90
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 52,
//           "time": 12
//         },
//         "hard": {
//           "studentAnswer": [
//             2,
//             73,
//             14
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 29,
//           "time": 20
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 68,
//           "time": 15
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 11,
//           "time": 14
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 22,
//           "time": 62
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 3,
//             "hundreds": 9,
//             "thousands": 0
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 5,
//           "time": 84
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 9,
//             "hundreds": 8,
//             "thousands": 1
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 3,
//           "time": 47
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 2,
//             "hundreds": 5,
//             "thousands": 2
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 47,
//           "time": 38
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 410,
//       "totalAttemptsUsed": 19,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_53",
//     "studentId": "stu_1746732217285_7199",
//     "date": "2025-05-29T03:11:23.533334",
//     "totalScore": 673,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             80,
//             70,
//             60
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 87,
//           "time": 112
//         },
//         "medium": {
//           "studentAnswer": [
//             43,
//             9,
//             19
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 59,
//           "time": 88
//         },
//         "hard": {
//           "studentAnswer": [
//             60,
//             49,
//             16
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 84,
//           "time": 57
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 57,
//           "time": 12
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 76,
//           "time": 57
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 81,
//           "time": 85
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 4,
//             "hundreds": 8,
//             "thousands": 4
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 89,
//           "time": 46
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 3,
//             "hundreds": 9,
//             "thousands": 1
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 59,
//           "time": 51
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 2,
//             "hundreds": 4,
//             "thousands": 3
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 81,
//           "time": 101
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 609,
//       "totalAttemptsUsed": 18,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_54",
//     "studentId": "stu_1746732217285_7199",
//     "date": "2025-05-29T03:11:23.533391",
//     "totalScore": 335,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             62,
//             73,
//             36
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 97,
//           "time": 20
//         },
//         "medium": {
//           "studentAnswer": [
//             71,
//             24,
//             84
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 91,
//           "time": 66
//         },
//         "hard": {
//           "studentAnswer": [
//             46,
//             52,
//             13
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 32,
//           "time": 119
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 54,
//           "time": 62
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 3,
//           "time": 109
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 26,
//           "time": 23
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 4,
//             "hundreds": 6,
//             "thousands": 8
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 5,
//           "time": 14
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 7,
//             "hundreds": 8,
//             "thousands": 8
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 23,
//           "time": 20
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 6,
//             "hundreds": 7,
//             "thousands": 2
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 4,
//           "time": 91
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 524,
//       "totalAttemptsUsed": 21,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_55",
//     "studentId": "stu_1746732217285_7271",
//     "date": "2025-05-29T03:11:23.533445",
//     "totalScore": 528,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             59,
//             42,
//             95
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 3,
//           "time": 72
//         },
//         "medium": {
//           "studentAnswer": [
//             78,
//             100,
//             51
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 58,
//           "time": 70
//         },
//         "hard": {
//           "studentAnswer": [
//             64,
//             57,
//             87
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 84,
//           "time": 109
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 70,
//           "time": 104
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 67,
//           "time": 69
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 65,
//           "time": 111
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 4,
//             "hundreds": 5,
//             "thousands": 4
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 33,
//           "time": 79
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 1,
//             "hundreds": 5,
//             "thousands": 1
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 85,
//           "time": 10
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 3,
//             "hundreds": 4,
//             "thousands": 6
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 63,
//           "time": 48
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 672,
//       "totalAttemptsUsed": 19,
//       "correctAnswersCount": 6,
//       "incorrectAnswersCount": 3
//     }
//   },
//   {
//     "gameId": "game_56",
//     "studentId": "stu_1746732217285_7271",
//     "date": "2025-05-29T03:11:23.533500",
//     "totalScore": 449,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             31,
//             63,
//             76
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 87,
//           "time": 81
//         },
//         "medium": {
//           "studentAnswer": [
//             5,
//             80,
//             4
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 40,
//           "time": 115
//         },
//         "hard": {
//           "studentAnswer": [
//             72,
//             94,
//             10
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 50,
//           "time": 41
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 70,
//           "time": 76
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 27,
//           "time": 78
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 26,
//           "time": 108
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 4,
//             "tens": 8,
//             "hundreds": 4,
//             "thousands": 7
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 60,
//           "time": 23
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 1,
//             "hundreds": 5,
//             "thousands": 4
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 76,
//           "time": 34
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 6,
//             "hundreds": 7,
//             "thousands": 5
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 13,
//           "time": 76
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 632,
//       "totalAttemptsUsed": 19,
//       "correctAnswersCount": 8,
//       "incorrectAnswersCount": 1
//     }
//   },
//   {
//     "gameId": "game_57",
//     "studentId": "stu_1746732217285_7460",
//     "date": "2025-05-29T03:11:23.533556",
//     "totalScore": 268,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             21,
//             52,
//             21
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 1,
//           "time": 100
//         },
//         "medium": {
//           "studentAnswer": [
//             97,
//             51,
//             89
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 44,
//           "time": 59
//         },
//         "hard": {
//           "studentAnswer": [
//             17,
//             80,
//             85
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 2,
//           "time": 94
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 28,
//           "time": 19
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 22,
//           "time": 51
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 68,
//           "time": 105
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 4,
//             "hundreds": 5,
//             "thousands": 6
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 0,
//           "time": 47
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 8,
//             "hundreds": 9,
//             "thousands": 5
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 95,
//           "time": 80
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 0,
//             "hundreds": 3,
//             "thousands": 4
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 8,
//           "time": 41
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 596,
//       "totalAttemptsUsed": 19,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_58",
//     "studentId": "stu_1746732217285_7460",
//     "date": "2025-05-29T03:11:23.533605",
//     "totalScore": 476,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             74,
//             25,
//             19
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 91,
//           "time": 66
//         },
//         "medium": {
//           "studentAnswer": [
//             11,
//             46,
//             38
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 48,
//           "time": 79
//         },
//         "hard": {
//           "studentAnswer": [
//             65,
//             68,
//             18
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 73,
//           "time": 63
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 3,
//           "time": 68
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 56,
//           "time": 77
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 28,
//           "time": 108
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 2,
//             "hundreds": 3,
//             "thousands": 0
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 97,
//           "time": 28
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 3,
//             "hundreds": 9,
//             "thousands": 3
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 68,
//           "time": 49
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 7,
//             "hundreds": 2,
//             "thousands": 7
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 12,
//           "time": 41
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 579,
//       "totalAttemptsUsed": 16,
//       "correctAnswersCount": 1,
//       "incorrectAnswersCount": 8
//     }
//   },
//   {
//     "gameId": "game_59",
//     "studentId": "stu_1746732217285_7671",
//     "date": "2025-05-29T03:11:23.533747",
//     "totalScore": 275,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             85,
//             66,
//             3
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 65,
//           "time": 55
//         },
//         "medium": {
//           "studentAnswer": [
//             15,
//             92,
//             94
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 19,
//           "time": 59
//         },
//         "hard": {
//           "studentAnswer": [
//             62,
//             32,
//             14
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 16,
//           "time": 68
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 85,
//           "time": 56
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 1,
//           "time": 27
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 22,
//           "time": 66
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 6,
//             "hundreds": 6,
//             "thousands": 3
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 38,
//           "time": 17
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 2,
//             "hundreds": 4,
//             "thousands": 6
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 12,
//           "time": 98
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 6,
//             "hundreds": 3,
//             "thousands": 9
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 17,
//           "time": 65
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 511,
//       "totalAttemptsUsed": 17,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_60",
//     "studentId": "stu_1746732217285_7671",
//     "date": "2025-05-29T03:11:23.533795",
//     "totalScore": 500,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             22,
//             57,
//             85
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 68,
//           "time": 49
//         },
//         "medium": {
//           "studentAnswer": [
//             92,
//             34,
//             84
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 60,
//           "time": 96
//         },
//         "hard": {
//           "studentAnswer": [
//             92,
//             28,
//             20
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 80,
//           "time": 56
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 75,
//           "time": 15
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 10,
//           "time": 111
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 80,
//           "time": 17
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 4,
//             "tens": 4,
//             "hundreds": 1,
//             "thousands": 7
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 73,
//           "time": 119
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 2,
//             "hundreds": 1,
//             "thousands": 8
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 35,
//           "time": 89
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 6,
//             "hundreds": 2,
//             "thousands": 8
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 19,
//           "time": 31
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 583,
//       "totalAttemptsUsed": 18,
//       "correctAnswersCount": 7,
//       "incorrectAnswersCount": 2
//     }
//   },
//   {
//     "gameId": "game_61",
//     "studentId": "stu_1746732217285_7761",
//     "date": "2025-05-29T03:11:23.533841",
//     "totalScore": 454,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             24,
//             57,
//             8
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 39,
//           "time": 72
//         },
//         "medium": {
//           "studentAnswer": [
//             2,
//             66,
//             22
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 37,
//           "time": 29
//         },
//         "hard": {
//           "studentAnswer": [
//             19,
//             16,
//             32
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 28,
//           "time": 35
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 77,
//           "time": 115
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 81,
//           "time": 84
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 37,
//           "time": 93
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 4,
//             "hundreds": 9,
//             "thousands": 2
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 47,
//           "time": 93
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 0,
//             "hundreds": 6,
//             "thousands": 6
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 62,
//           "time": 76
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 3,
//             "hundreds": 2,
//             "thousands": 9
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 46,
//           "time": 65
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 662,
//       "totalAttemptsUsed": 13,
//       "correctAnswersCount": 3,
//       "incorrectAnswersCount": 6
//     }
//   },
//   {
//     "gameId": "game_62",
//     "studentId": "stu_1746732217285_7761",
//     "date": "2025-05-29T03:11:23.533893",
//     "totalScore": 608,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             33,
//             87,
//             61
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 14,
//           "time": 120
//         },
//         "medium": {
//           "studentAnswer": [
//             93,
//             41,
//             42
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 42,
//           "time": 112
//         },
//         "hard": {
//           "studentAnswer": [
//             32,
//             22,
//             1
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 94,
//           "time": 36
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 71,
//           "time": 90
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 75,
//           "time": 119
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 95,
//           "time": 97
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 3,
//             "hundreds": 3,
//             "thousands": 5
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 31,
//           "time": 80
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 4,
//             "hundreds": 3,
//             "thousands": 2
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 90,
//           "time": 56
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 6,
//             "hundreds": 4,
//             "thousands": 2
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 96,
//           "time": 36
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 746,
//       "totalAttemptsUsed": 18,
//       "correctAnswersCount": 2,
//       "incorrectAnswersCount": 7
//     }
//   },
//   {
//     "gameId": "game_63",
//     "studentId": "stu_1746732217285_7813",
//     "date": "2025-05-29T03:11:23.533940",
//     "totalScore": 463,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             49,
//             23,
//             97
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 93,
//           "time": 85
//         },
//         "medium": {
//           "studentAnswer": [
//             52,
//             51,
//             29
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 12,
//           "time": 65
//         },
//         "hard": {
//           "studentAnswer": [
//             19,
//             89,
//             84
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 60,
//           "time": 115
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 68,
//           "time": 35
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 24,
//           "time": 18
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 74,
//           "time": 24
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 1,
//             "hundreds": 5,
//             "thousands": 8
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 33,
//           "time": 51
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 1,
//             "hundreds": 8,
//             "thousands": 1
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 69,
//           "time": 81
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 8,
//             "hundreds": 1,
//             "thousands": 8
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 30,
//           "time": 54
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 528,
//       "totalAttemptsUsed": 21,
//       "correctAnswersCount": 3,
//       "incorrectAnswersCount": 6
//     }
//   },
//   {
//     "gameId": "game_64",
//     "studentId": "stu_1746732217285_7813",
//     "date": "2025-05-29T03:11:23.533989",
//     "totalScore": 492,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             68,
//             7,
//             90
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 13,
//           "time": 58
//         },
//         "medium": {
//           "studentAnswer": [
//             68,
//             57,
//             32
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 90,
//           "time": 107
//         },
//         "hard": {
//           "studentAnswer": [
//             58,
//             29,
//             15
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 76,
//           "time": 25
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 29,
//           "time": 29
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 20,
//           "time": 80
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 80,
//           "time": 104
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 9,
//             "hundreds": 3,
//             "thousands": 2
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 92,
//           "time": 36
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 6,
//             "hundreds": 0,
//             "thousands": 4
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 18,
//           "time": 23
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 2,
//             "hundreds": 5,
//             "thousands": 0
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 74,
//           "time": 103
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 565,
//       "totalAttemptsUsed": 16,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_65",
//     "studentId": "stu_1746732217285_8257",
//     "date": "2025-05-29T03:11:23.534039",
//     "totalScore": 546,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             37,
//             33,
//             83
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 98,
//           "time": 119
//         },
//         "medium": {
//           "studentAnswer": [
//             15,
//             100,
//             98
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 92,
//           "time": 21
//         },
//         "hard": {
//           "studentAnswer": [
//             22,
//             77,
//             96
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 33,
//           "time": 83
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 35,
//           "time": 83
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 60,
//           "time": 109
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 56,
//           "time": 116
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 1,
//             "hundreds": 5,
//             "thousands": 2
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 57,
//           "time": 26
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 2,
//             "hundreds": 7,
//             "thousands": 1
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 22,
//           "time": 61
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 4,
//             "tens": 1,
//             "hundreds": 0,
//             "thousands": 5
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 93,
//           "time": 49
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 667,
//       "totalAttemptsUsed": 16,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_66",
//     "studentId": "stu_1746732217285_8257",
//     "date": "2025-05-29T03:11:23.534097",
//     "totalScore": 403,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             70,
//             55,
//             57
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 16,
//           "time": 24
//         },
//         "medium": {
//           "studentAnswer": [
//             22,
//             42,
//             5
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 99,
//           "time": 98
//         },
//         "hard": {
//           "studentAnswer": [
//             50,
//             95,
//             31
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 66,
//           "time": 113
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 27,
//           "time": 50
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 44,
//           "time": 30
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 72,
//           "time": 56
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 9,
//             "hundreds": 8,
//             "thousands": 4
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 4,
//           "time": 24
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 8,
//             "hundreds": 0,
//             "thousands": 9
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 17,
//           "time": 34
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 6,
//             "hundreds": 8,
//             "thousands": 7
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 58,
//           "time": 40
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 469,
//       "totalAttemptsUsed": 18,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_67",
//     "studentId": "stu_1746732217285_8596",
//     "date": "2025-05-29T03:11:23.534157",
//     "totalScore": 423,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             29,
//             8,
//             87
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 34,
//           "time": 13
//         },
//         "medium": {
//           "studentAnswer": [
//             52,
//             23,
//             20
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 87,
//           "time": 24
//         },
//         "hard": {
//           "studentAnswer": [
//             4,
//             67,
//             97
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 1,
//           "time": 20
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 51,
//           "time": 114
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 80,
//           "time": 31
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 50,
//           "time": 14
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 3,
//             "hundreds": 5,
//             "thousands": 2
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 8,
//           "time": 23
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 6,
//             "hundreds": 2,
//             "thousands": 5
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 51,
//           "time": 85
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 8,
//             "hundreds": 4,
//             "thousands": 1
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 61,
//           "time": 94
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 418,
//       "totalAttemptsUsed": 22,
//       "correctAnswersCount": 7,
//       "incorrectAnswersCount": 2
//     }
//   },
//   {
//     "gameId": "game_68",
//     "studentId": "stu_1746732217285_8596",
//     "date": "2025-05-29T03:11:23.534206",
//     "totalScore": 390,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             85,
//             87,
//             38
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 21,
//           "time": 119
//         },
//         "medium": {
//           "studentAnswer": [
//             16,
//             94,
//             89
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 16,
//           "time": 107
//         },
//         "hard": {
//           "studentAnswer": [
//             99,
//             88,
//             82
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 45,
//           "time": 118
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 38,
//           "time": 29
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 11,
//           "time": 38
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 34,
//           "time": 85
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 6,
//             "hundreds": 4,
//             "thousands": 8
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 89,
//           "time": 79
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 9,
//             "hundreds": 2,
//             "thousands": 7
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 93,
//           "time": 111
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 5,
//             "hundreds": 2,
//             "thousands": 5
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 43,
//           "time": 36
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 722,
//       "totalAttemptsUsed": 21,
//       "correctAnswersCount": 6,
//       "incorrectAnswersCount": 3
//     }
//   },
//   {
//     "gameId": "game_69",
//     "studentId": "stu_1746732217285_8887",
//     "date": "2025-05-29T03:11:23.534264",
//     "totalScore": 316,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             0,
//             91,
//             70
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 1,
//           "time": 18
//         },
//         "medium": {
//           "studentAnswer": [
//             68,
//             0,
//             34
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 2,
//           "time": 42
//         },
//         "hard": {
//           "studentAnswer": [
//             65,
//             64,
//             36
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 0,
//           "time": 51
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 39,
//           "time": 96
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 46,
//           "time": 10
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 80,
//           "time": 21
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 3,
//             "hundreds": 4,
//             "thousands": 0
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 54,
//           "time": 80
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 6,
//             "hundreds": 6,
//             "thousands": 1
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 67,
//           "time": 56
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 6,
//             "hundreds": 9,
//             "thousands": 7
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 27,
//           "time": 64
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 438,
//       "totalAttemptsUsed": 17,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_70",
//     "studentId": "stu_1746732217285_8887",
//     "date": "2025-05-29T03:11:23.534329",
//     "totalScore": 186,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             26,
//             49,
//             49
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 10,
//           "time": 112
//         },
//         "medium": {
//           "studentAnswer": [
//             91,
//             97,
//             86
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 59,
//           "time": 110
//         },
//         "hard": {
//           "studentAnswer": [
//             63,
//             16,
//             17
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 24,
//           "time": 34
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 20,
//           "time": 48
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 18,
//           "time": 38
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 30,
//           "time": 93
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 6,
//             "hundreds": 0,
//             "thousands": 0
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 16,
//           "time": 78
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 1,
//             "hundreds": 9,
//             "thousands": 7
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 0,
//           "time": 17
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 6,
//             "hundreds": 5,
//             "thousands": 2
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 9,
//           "time": 31
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 561,
//       "totalAttemptsUsed": 19,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_71",
//     "studentId": "stu_1746732217285_8986",
//     "date": "2025-05-29T03:11:23.534380",
//     "totalScore": 635,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             97,
//             64,
//             68
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 82,
//           "time": 54
//         },
//         "medium": {
//           "studentAnswer": [
//             61,
//             13,
//             62
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 73,
//           "time": 31
//         },
//         "hard": {
//           "studentAnswer": [
//             46,
//             35,
//             22
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 47,
//           "time": 57
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 77,
//           "time": 31
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 97,
//           "time": 19
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 81,
//           "time": 17
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 5,
//             "hundreds": 6,
//             "thousands": 3
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 78,
//           "time": 54
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 1,
//             "hundreds": 8,
//             "thousands": 8
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 81,
//           "time": 96
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 8,
//             "hundreds": 9,
//             "thousands": 6
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 19,
//           "time": 37
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 396,
//       "totalAttemptsUsed": 13,
//       "correctAnswersCount": 6,
//       "incorrectAnswersCount": 3
//     }
//   },
//   {
//     "gameId": "game_72",
//     "studentId": "stu_1746732217285_8986",
//     "date": "2025-05-29T03:11:23.534428",
//     "totalScore": 398,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             7,
//             7,
//             69
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 1,
//           "time": 120
//         },
//         "medium": {
//           "studentAnswer": [
//             99,
//             19,
//             4
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 38,
//           "time": 97
//         },
//         "hard": {
//           "studentAnswer": [
//             36,
//             63,
//             80
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 73,
//           "time": 35
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 41,
//           "time": 47
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 87,
//           "time": 40
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 29,
//           "time": 114
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 1,
//             "hundreds": 5,
//             "thousands": 2
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 46,
//           "time": 17
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 3,
//             "tens": 2,
//             "hundreds": 0,
//             "thousands": 3
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 63,
//           "time": 14
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 7,
//             "hundreds": 6,
//             "thousands": 8
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 20,
//           "time": 76
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 560,
//       "totalAttemptsUsed": 20,
//       "correctAnswersCount": 3,
//       "incorrectAnswersCount": 6
//     }
//   },
//   {
//     "gameId": "game_73",
//     "studentId": "stu_1746732217285_9062",
//     "date": "2025-05-29T03:11:23.534481",
//     "totalScore": 585,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             15,
//             34,
//             69
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 37,
//           "time": 113
//         },
//         "medium": {
//           "studentAnswer": [
//             71,
//             62,
//             72
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 46,
//           "time": 54
//         },
//         "hard": {
//           "studentAnswer": [
//             14,
//             8,
//             63
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 94,
//           "time": 14
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 100,
//           "time": 67
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 37,
//           "time": 36
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 97,
//           "time": 28
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 8,
//             "hundreds": 1,
//             "thousands": 0
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 19,
//           "time": 75
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 7,
//             "hundreds": 3,
//             "thousands": 6
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 87,
//           "time": 17
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 7,
//             "hundreds": 1,
//             "thousands": 5
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 68,
//           "time": 30
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 434,
//       "totalAttemptsUsed": 21,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_74",
//     "studentId": "stu_1746732217285_9062",
//     "date": "2025-05-29T03:11:23.534535",
//     "totalScore": 504,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             21,
//             73,
//             89
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 24,
//           "time": 94
//         },
//         "medium": {
//           "studentAnswer": [
//             66,
//             29,
//             24
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 66,
//           "time": 48
//         },
//         "hard": {
//           "studentAnswer": [
//             18,
//             71,
//             66
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 30,
//           "time": 48
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 38,
//           "time": 48
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 74,
//           "time": 109
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 97,
//           "time": 25
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 1,
//             "hundreds": 2,
//             "thousands": 9
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 93,
//           "time": 108
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 9,
//             "hundreds": 4,
//             "thousands": 5
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 41,
//           "time": 14
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 9,
//             "hundreds": 7,
//             "thousands": 4
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 41,
//           "time": 64
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 558,
//       "totalAttemptsUsed": 16,
//       "correctAnswersCount": 8,
//       "incorrectAnswersCount": 1
//     }
//   },
//   {
//     "gameId": "game_75",
//     "studentId": "stu_1746732217285_9236",
//     "date": "2025-05-29T03:11:23.534580",
//     "totalScore": 597,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             45,
//             6,
//             35
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 74,
//           "time": 93
//         },
//         "medium": {
//           "studentAnswer": [
//             83,
//             85,
//             17
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 100,
//           "time": 71
//         },
//         "hard": {
//           "studentAnswer": [
//             24,
//             32,
//             53
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 79,
//           "time": 78
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 6,
//           "time": 79
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 90,
//           "time": 85
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 54,
//           "time": 42
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 4,
//             "tens": 0,
//             "hundreds": 6,
//             "thousands": 4
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 85,
//           "time": 30
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 9,
//             "hundreds": 4,
//             "thousands": 4
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 80,
//           "time": 70
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 6,
//             "hundreds": 4,
//             "thousands": 4
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 29,
//           "time": 12
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 560,
//       "totalAttemptsUsed": 17,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_76",
//     "studentId": "stu_1746732217285_9236",
//     "date": "2025-05-29T03:11:23.534910",
//     "totalScore": 485,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             1,
//             65,
//             92
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 67,
//           "time": 104
//         },
//         "medium": {
//           "studentAnswer": [
//             42,
//             77,
//             69
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 49,
//           "time": 95
//         },
//         "hard": {
//           "studentAnswer": [
//             69,
//             91,
//             72
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 3,
//           "time": 108
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 23,
//           "time": 38
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 97,
//           "time": 34
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 49,
//           "time": 118
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 1,
//             "hundreds": 3,
//             "thousands": 8
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 59,
//           "time": 83
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 5,
//             "tens": 3,
//             "hundreds": 7,
//             "thousands": 2
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 43,
//           "time": 59
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 2,
//             "hundreds": 9,
//             "thousands": 0
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 95,
//           "time": 31
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 670,
//       "totalAttemptsUsed": 17,
//       "correctAnswersCount": 3,
//       "incorrectAnswersCount": 6
//     }
//   },
//   {
//     "gameId": "game_77",
//     "studentId": "stu_1746732217285_9858",
//     "date": "2025-05-29T03:11:23.534981",
//     "totalScore": 471,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             72,
//             72,
//             0
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 98,
//           "time": 58
//         },
//         "medium": {
//           "studentAnswer": [
//             77,
//             62,
//             31
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 67,
//           "time": 112
//         },
//         "hard": {
//           "studentAnswer": [
//             40,
//             40,
//             82
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 17,
//           "time": 99
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 88,
//           "time": 70
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 46,
//           "time": 59
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 75,
//           "time": 45
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 1,
//             "tens": 0,
//             "hundreds": 0,
//             "thousands": 0
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 12,
//           "time": 58
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 6,
//             "tens": 2,
//             "hundreds": 3,
//             "thousands": 0
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 58,
//           "time": 67
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 7,
//             "hundreds": 7,
//             "thousands": 7
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 10,
//           "time": 42
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 610,
//       "totalAttemptsUsed": 14,
//       "correctAnswersCount": 4,
//       "incorrectAnswersCount": 5
//     }
//   },
//   {
//     "gameId": "game_78",
//     "studentId": "stu_1746732217285_9858",
//     "date": "2025-05-29T03:11:23.535054",
//     "totalScore": 495,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             81,
//             41,
//             44
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 82,
//           "time": 87
//         },
//         "medium": {
//           "studentAnswer": [
//             32,
//             27,
//             56
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 47,
//           "time": 91
//         },
//         "hard": {
//           "studentAnswer": [
//             67,
//             3,
//             95
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 24,
//           "time": 51
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 98,
//           "time": 62
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 95,
//           "time": 34
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 28,
//           "time": 46
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 2,
//             "hundreds": 0,
//             "thousands": 5
//           },
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 71,
//           "time": 56
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 1,
//             "hundreds": 1,
//             "thousands": 3
//           },
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 30,
//           "time": 78
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 4,
//             "tens": 1,
//             "hundreds": 3,
//             "thousands": 6
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 20,
//           "time": 17
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 522,
//       "totalAttemptsUsed": 19,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_79",
//     "studentId": "stu_1746732217285_9967",
//     "date": "2025-05-29T03:11:23.535113",
//     "totalScore": 505,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             69,
//             36,
//             21
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 37,
//           "time": 62
//         },
//         "medium": {
//           "studentAnswer": [
//             56,
//             19,
//             39
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 74,
//           "time": 63
//         },
//         "hard": {
//           "studentAnswer": [
//             44,
//             38,
//             18
//           ],
//           "attemptsUsed": 2,
//           "isCorrect": false,
//           "score": 12,
//           "time": 30
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 9,
//           "time": 106
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 99,
//           "time": 80
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 35,
//           "time": 114
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 5,
//             "hundreds": 7,
//             "thousands": 0
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 47,
//           "time": 16
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 8,
//             "tens": 4,
//             "hundreds": 0,
//             "thousands": 5
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 93,
//           "time": 95
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 2,
//             "tens": 6,
//             "hundreds": 0,
//             "thousands": 8
//           },
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 99,
//           "time": 25
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 591,
//       "totalAttemptsUsed": 15,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   },
//   {
//     "gameId": "game_80",
//     "studentId": "stu_1746732217285_9967",
//     "date": "2025-05-29T03:11:23.535163",
//     "totalScore": 529,
//     "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
//     "answers": {
//       "findcomposition": {
//         "easy": {
//           "studentAnswer": [
//             51,
//             30,
//             60
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 97,
//           "time": 18
//         },
//         "medium": {
//           "studentAnswer": [
//             61,
//             1,
//             12
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 84,
//           "time": 21
//         },
//         "hard": {
//           "studentAnswer": [
//             5,
//             77,
//             77
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 74,
//           "time": 112
//         }
//       },
//       "WritetheFollowingNumberinLetters": {
//         "easy": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 3,
//           "isCorrect": true,
//           "score": 33,
//           "time": 68
//         },
//         "medium": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": true,
//           "score": 63,
//           "time": 109
//         },
//         "hard": {
//           "studentAnswer": [
//             "example answer"
//           ],
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 2,
//           "time": 27
//         }
//       },
//       "IdentifthUnitsTensHundredsandThousands": {
//         "easy": {
//           "studentAnswer": {
//             "units": 9,
//             "tens": 4,
//             "hundreds": 2,
//             "thousands": 2
//           },
//           "attemptsUsed": 1,
//           "isCorrect": false,
//           "score": 22,
//           "time": 21
//         },
//         "medium": {
//           "studentAnswer": {
//             "units": 0,
//             "tens": 1,
//             "hundreds": 7,
//             "thousands": 2
//           },
//           "attemptsUsed": 3,
//           "isCorrect": false,
//           "score": 60,
//           "time": 105
//         },
//         "hard": {
//           "studentAnswer": {
//             "units": 7,
//             "tens": 2,
//             "hundreds": 0,
//             "thousands": 3
//           },
//           "attemptsUsed": 2,
//           "isCorrect": true,
//           "score": 94,
//           "time": 96
//         }
//       }
//     },
//     "statistics": {
//       "totalTimeSpent": 577,
//       "totalAttemptsUsed": 18,
//       "correctAnswersCount": 5,
//       "incorrectAnswersCount": 4
//     }
//   }
// ]

  // "School": [
  //   {
  //     "academy": "Oriental",
  //     "address": "987 Liberty St",
  //     "email": "contact0@school.ma",
  //     "name": "Atlas Academy",
  //     "phone": "+212 660-787854"
  //   },
  //   {
  //     "academy": "Guelmim-Oued Noun",
  //     "address": "222 Freedom Ave",
  //     "email": "contact1@school.ma",
  //     "name": "Renaissance School",
  //     "phone": "+212 643-381232"
  //   },
  //   {
  //     "academy": "Tangier-Tetouan-Al Hoceima",
  //     "address": "101 Cedar Dr",
  //     "email": "contact2@school.ma",
  //     "name": "Al Amal School",
  //     "phone": "+212 665-756106"
  //   },
  //   {
  //     "academy": "Oriental",
  //     "address": "789 Atlas Rd",
  //     "email": "contact3@school.ma",
  //     "name": "Al Nour School",
  //     "phone": "+212 648-930721"
  //   },
  //   {
  //     "academy": "Rabat-Salé-Kénitra",
  //     "address": "222 Freedom Ave",
  //     "email": "contact4@school.ma",
  //     "name": "Al Mostaqbal School",
  //     "phone": "+212 691-572971"
  //   },
  //   {
  //     "academy": "Drâa-Tafilalet",
  //     "address": "456 Ocean Ave",
  //     "email": "contact5@school.ma",
  //     "name": "Al Amal School",
  //     "phone": "+212 658-489949"
  //   },
  //   {
  //     "academy": "Marrakech-Safi",
  //     "address": "654 Horizon St",
  //     "email": "contact6@school.ma",
  //     "name": "Al Mostaqbal School",
  //     "phone": "+212 668-777777"
  //   },
  //   {
  //     "academy": "Fès-Meknès",
  //     "address": "123 Main St",
  //     "email": "contact7@school.ma",
  //     "name": "Yassamine School",
  //     "phone": "+212 677-475850"
  //   },
  //   {
  //     "academy": "Dakhla-Oued Ed-Dahab",
  //     "address": "987 Liberty St",
  //     "email": "contact8@school.ma",
  //     "name": "Yassamine School",
  //     "phone": "+212 665-178248"
  //   },
  //   {
  //     "academy": "Casablanca-Settat",
  //     "address": "456 Ocean Ave",
  //     "email": "contact9@school.ma",
  //     "name": "Al Farabi School",
  //     "phone": "+212 672-920264"
  //   },
  //   {
  //     "academy": "Drâa-Tafilalet",
  //     "address": "987 Liberty St",
  //     "email": "contact10@school.ma",
  //     "name": "Al Mostaqbal School",
  //     "phone": "+212 673-755434"
  //   },
  //   {
  //     "academy": "Guelmim-Oued Noun",
  //     "address": "123 Main St",
  //     "email": "contact11@school.ma",
  //     "name": "Al Nour School",
  //     "phone": "+212 613-942929"
  //   },
  //   {
  //     "academy": "Tangier-Tetouan-Al Hoceima",
  //     "address": "123 Main St",
  //     "email": "contact12@school.ma",
  //     "name": "Future Leaders",
  //     "phone": "+212 620-239202"
  //   },
  //   {
  //     "academy": "Rabat-Salé-Kénitra",
  //     "address": "123 Main St",
  //     "email": "contact13@school.ma",
  //     "name": "Atlas Academy",
  //     "phone": "+212 613-298623"
  //   },
  //   {
  //     "academy": "Souss-Massa",
  //     "address": "123 Main St",
  //     "email": "contact14@school.ma",
  //     "name": "Al Mostaqbal School",
  //     "phone": "+212 660-425414"
  //   },
  //   {
  //     "academy": "Souss-Massa",
  //     "address": "123 Main St",
  //     "email": "contact15@school.ma",
  //     "name": "Bright Minds School",
  //     "phone": "+212 655-752559"
  //   },
  //   {
  //     "academy": "Laâyoune-Sakia El Hamra",
  //     "address": "987 Liberty St",
  //     "email": "contact16@school.ma",
  //     "name": "Renaissance School",
  //     "phone": "+212 668-496304"
  //   },
  //   {
  //     "academy": "Laâyoune-Sakia El Hamra",
  //     "address": "222 Freedom Ave",
  //     "email": "contact17@school.ma",
  //     "name": "Future Leaders",
  //     "phone": "+212 668-758719"
  //   },
  //   {
  //     "academy": "Dakhla-Oued Ed-Dahab",
  //     "address": "101 Cedar Dr",
  //     "email": "contact18@school.ma",
  //     "name": "Al Mostaqbal School",
  //     "phone": "+212 672-184772"
  //   },
  //   {
  //     "academy": "Casablanca-Settat",
  //     "address": "789 Atlas Rd",
  //     "email": "contact19@school.ma",
  //     "name": "Zahrat Al Madaen",
  //     "phone": "+212 629-962950"
  //   },
  //   {
  //     "academy": "Béni Mellal-Khénifra",
  //     "address": "123 Main St",
  //     "email": "contact20@school.ma",
  //     "name": "Renaissance School",
  //     "phone": "+212 618-616300"
  //   },
  //   {
  //     "academy": "Béni Mellal-Khénifra",
  //     "address": "222 Freedom Ave",
  //     "email": "contact21@school.ma",
  //     "name": "Bright Minds School",
  //     "phone": "+212 658-658364"
  //   },
  //   {
  //     "academy": "Fès-Meknès",
  //     "address": "222 Freedom Ave",
  //     "email": "contact22@school.ma",
  //     "name": "Yassamine School",
  //     "phone": "+212 635-837758"
  //   },
  //   {
  //     "academy": "Marrakech-Safi",
  //     "address": "654 Horizon St",
  //     "email": "contact23@school.ma",
  //     "name": "Bright Minds School",
  //     "phone": "+212 643-736625"
  //   }
  // ]
  // "miniGames": {
  //   "miniGames": {
  //     "find_compositions": {
  //       "defaultConfig": {
  //         "gradeConfig": [
  //           null,
  //           null,
  //           {
  //             "maxNumberRange": 2,
  //             "minNumCompositions": 2,
  //             "operation": "Addition",
  //             "requiredCorrectAnswersMinimumPercent": 50
  //           },
  //           {
  //             "maxNumberRange": 3,
  //             "minNumCompositions": 3,
  //             "operation": "Subtraction",
  //             "requiredCorrectAnswersMinimumPercent": 75
  //           },
  //           {
  //             "maxNumberRange": 4,
  //             "minNumCompositions": 5,
  //             "operation": "Multiplication",
  //             "requiredCorrectAnswersMinimumPercent": 75
  //           },
  //           {
  //             "maxNumberRange": 4,
  //             "minNumCompositions": 7,
  //             "operation": "Division",
  //             "requiredCorrectAnswersMinimumPercent": 75
  //           }
  //         ],
  //         "skills": [
  //           "Addition",
  //           "Subtraction",
  //           "Multiplication",
  //           "Division"
  //         ]
  //       },
  //       "description": {
  //         "ar": "ابحث عن كل التركيبات الممكنة للنتيجة المطلوبة",
  //         "en": "Find all possible compositions for the target result",
  //         "fr": "Trouve toutes les compositions possibles pour le résultat cible"
  //       },
  //       "id": "find_compositions",
  //       "suggestedGradeRange": {
  //         "max": 5,
  //         "min": 2
  //       },
  //       "title": {
  //         "ar": "ابحث عن التركيبات",
  //         "en": "Find Compositions",
  //         "fr": "Trouve les compositions"
  //       },
  //       "version": "1.0"
  //     },
  //     "identify_place_value": {
  //       "defaultConfig": {
  //         "gradeConfig": [
  //           null,
  //           null,
  //           null,
  //           {
  //             "maxNumberRange": 3,
  //             "numQuestions": 10,
  //             "requiredCorrectAnswersMinimumPercent": 75
  //           },
  //           {
  //             "maxNumberRange": 4,
  //             "numQuestions": 10,
  //             "requiredCorrectAnswersMinimumPercent": 75
  //           },
  //           {
  //             "maxNumberRange": 6,
  //             "numQuestions": 8,
  //             "requiredCorrectAnswersMinimumPercent": 75
  //           },
  //           {
  //             "maxNumberRange": 7,
  //             "numQuestions": 8,
  //             "requiredCorrectAnswersMinimumPercent": 75
  //           }
  //         ],
  //         "skills": [
  //           "Place Value Identification"
  //         ]
  //       },
  //       "description": {
  //         "ar": "حدد القيمة المكانية لكل رقم",
  //         "en": "Identify the place value of each digit in a number",
  //         "fr": "Identifie la valeur de position de chaque chiffre"
  //       },
  //       "id": "identify_place_value",
  //       "suggestedGradeRange": {
  //         "max": 6,
  //         "min": 3
  //       },
  //       "title": {
  //         "ar": "حدد الوحدات والعشرات والمئات والآلاف",
  //         "en": "Identify the Units, Tens, Hundreds, and Thousands",
  //         "fr": "Identifie les unités, dizaines, centaines et milliers"
  //       },
  //       "version": "1.0"
  //     },
  //     "write_number_in_letters": {
  //       "defaultConfig": {
  //         "gradeConfig": [
  //           null,
  //           {
  //             "maxNumberRange": 1,
  //             "numQuestions": 2,
  //             "requiredCorrectAnswersMinimumPercent": 75
  //           },
  //           {
  //             "maxNumberRange": 2,
  //             "numQuestions": 3,
  //             "requiredCorrectAnswersMinimumPercent": 75
  //           },
  //           {
  //             "maxNumberRange": 4,
  //             "numQuestions": 4,
  //             "requiredCorrectAnswersMinimumPercent": 75
  //           }
  //         ],
  //         "skills": [
  //           "Numbers to Words"
  //         ]
  //       },
  //       "description": {
  //         "ar": "اكتب الرقم بالكلمات",
  //         "en": "Write the number in words",
  //         "fr": "Écris le nombre en toutes lettres"
  //       },
  //       "id": "write_number_in_letters",
  //       "suggestedGradeRange": {
  //         "max": 3,
  //         "min": 1
  //       },
  //       "title": {
  //         "ar": "اكتب الرقم التالي بالحروف",
  //         "en": "Write the Following Number in Letters",
  //         "fr": "Écris le nombre suivant en lettres"
  //       },
  //       "version": "1.0"
  //     }
  //   }
  // },
  "tests": 
{
  "eefaf847-440a-42dd-91b8-7d4aba036da3": {
    "id": "eefaf847-440a-42dd-91b8-7d4aba036da3",
    "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
    "title": {
      "ar": "\u0627\u062e\u062a\u0628\u0627\u0631 1",
      "en": "Test 1",
      "fr": "Test 1"
    },
    "description": {
      "ar": "\u0648\u0635\u0641",
      "en": "Description",
      "fr": "Description"
    },
    "class": "1AP1",
    "games": [
      "findcomposition",
      "WritetheFollowingNumberinLetters",
      "IdentifthUnitsTensHundredsandThousands"
    ],
    "createdAt": 1748477248,
    "updatedAt": 1748477248,
    "isActive": true,
    "findcomposition": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "activeLevel": "easy"
    },
    "WritetheFollowingNumberinLetters": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "activeLevel": "easy"
    },
    "IdentifthUnitsTensHundredsandThousands": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "activeLevel": "easy"
    },
            "isSent": false,
        "endDate": "14/06/2025"
  },
  "90bae47d-35d3-46a0-b308-07c8bdc1743b": {
    "id": "90bae47d-35d3-46a0-b308-07c8bdc1743b",
    "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
    "title": {
      "ar": "\u0627\u062e\u062a\u0628\u0627\u0631 2",
      "en": "Test 2",
      "fr": "Test 2"
    },
    "description": {
      "ar": "\u0648\u0635\u0641",
      "en": "Description",
      "fr": "Description"
    },
    "class": "1AP1",
    "games": [
      "findcomposition",
      "WritetheFollowingNumberinLetters",
      "IdentifthUnitsTensHundredsandThousands"
    ],
    "createdAt": 1748477248,
    "updatedAt": 1748477248,
    "isActive": true,
    "findcomposition": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "activeLevel": "easy"
    },
    "WritetheFollowingNumberinLetters": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "activeLevel": "easy"
    },
    "IdentifthUnitsTensHundredsandThousands": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "activeLevel": "easy"
    },
            "isSent": false,
        "endDate": "14/06/2025"
  },
  "e58697df-e5f0-4800-aa99-5b2b2f2041a6": {
    "id": "e58697df-e5f0-4800-aa99-5b2b2f2041a6",
    "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
    "title": {
      "ar": "\u0627\u062e\u062a\u0628\u0627\u0631 3",
      "en": "Test 3",
      "fr": "Test 3"
    },
    "description": {
      "ar": "\u0648\u0635\u0641",
      "en": "Description",
      "fr": "Description"
    },
    "class": "1AP1",
    "games": [
      "findcomposition",
      "WritetheFollowingNumberinLetters",
      "IdentifthUnitsTensHundredsandThousands"
    ],
    "createdAt": 1748477248,
    "updatedAt": 1748477248,
    "isActive": true,
    "findcomposition": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "activeLevel": "easy"
    },
    "WritetheFollowingNumberinLetters": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "activeLevel": "easy"
    },
    "IdentifthUnitsTensHundredsandThousands": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "activeLevel": "easy"
    },
            "isSent": false,
        "endDate": "14/06/2025"
  },
  "1c1f9fdc-ed4c-479d-8f15-0cd252be2f2f": {
    "id": "1c1f9fdc-ed4c-479d-8f15-0cd252be2f2f",
    "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
    "title": {
      "ar": "\u0627\u062e\u062a\u0628\u0627\u0631 4",
      "en": "Test 4",
      "fr": "Test 4"
    },
    "description": {
      "ar": "\u0648\u0635\u0641",
      "en": "Description",
      "fr": "Description"
    },
    "class": "1AP1",
    "games": [
      "findcomposition",
      "WritetheFollowingNumberinLetters",
      "IdentifthUnitsTensHundredsandThousands"
    ],
    "createdAt": 1748477248,
    "updatedAt": 1748477248,
    "isActive": true,
    "findcomposition": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "activeLevel": "easy"
    },
    "WritetheFollowingNumberinLetters": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "activeLevel": "easy"
    },
    "IdentifthUnitsTensHundredsandThousands": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "activeLevel": "easy"
    },
            "isSent": false,
        "endDate": "14/06/2025"
  },
  "84d5abbd-cdad-4bca-9e19-9b71dc1a0437": {
    "id": "84d5abbd-cdad-4bca-9e19-9b71dc1a0437",
    "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
    "title": {
      "ar": "\u0627\u062e\u062a\u0628\u0627\u0631 5",
      "en": "Test 5",
      "fr": "Test 5"
    },
    "description": {
      "ar": "\u0648\u0635\u0641",
      "en": "Description",
      "fr": "Description"
    },
    "class": "1Z2",
    "games": [
      "findcomposition",
      "WritetheFollowingNumberinLetters",
      "IdentifthUnitsTensHundredsandThousands"
    ],
    "createdAt": 1748477248,
    "updatedAt": 1748477248,
    "isActive": true,
    "findcomposition": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "activeLevel": "easy"
    },
    "WritetheFollowingNumberinLetters": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "activeLevel": "easy"
    },
    "IdentifthUnitsTensHundredsandThousands": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "activeLevel": "easy"
    },
            "isSent": false,
        "endDate": "14/06/2025"
  },
  "94e99488-ecc4-48da-a903-7707f258383b": {
    "id": "94e99488-ecc4-48da-a903-7707f258383b",
    "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
    "title": {
      "ar": "\u0627\u062e\u062a\u0628\u0627\u0631 6",
      "en": "Test 6",
      "fr": "Test 6"
    },
    "description": {
      "ar": "\u0648\u0635\u0641",
      "en": "Description",
      "fr": "Description"
    },
    "class": "1Z2",
    "games": [
      "findcomposition",
      "WritetheFollowingNumberinLetters",
      "IdentifthUnitsTensHundredsandThousands"
    ],
    "createdAt": 1748477248,
    "updatedAt": 1748477248,
    "isActive": true,
    "findcomposition": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "activeLevel": "easy"
    },
    "WritetheFollowingNumberinLetters": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "activeLevel": "easy"
    },
    "IdentifthUnitsTensHundredsandThousands": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "activeLevel": "easy"
    },
            "isSent": false,
        "endDate": "14/06/2025"
  },
  "99ab1635-112f-469c-8cf4-1e6692c91137": {
    "id": "99ab1635-112f-469c-8cf4-1e6692c91137",
    "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
    "title": {
      "ar": "\u0627\u062e\u062a\u0628\u0627\u0631 7",
      "en": "Test 7",
      "fr": "Test 7"
    },
    "description": {
      "ar": "\u0648\u0635\u0641",
      "en": "Description",
      "fr": "Description"
    },
    "class": "1Z2",
    "games": [
      "findcomposition",
      "WritetheFollowingNumberinLetters",
      "IdentifthUnitsTensHundredsandThousands"
    ],
    "createdAt": 1748477248,
    "updatedAt": 1748477248,
    "isActive": true,
    "findcomposition": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "activeLevel": "easy"
    },
    "WritetheFollowingNumberinLetters": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "activeLevel": "easy"
    },
    "IdentifthUnitsTensHundredsandThousands": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "activeLevel": "easy"
    },
            "isSent": false,
        "endDate": "14/06/2025"
  },
  "a3514d62-1dfe-4c1c-9cfb-125d4ba1a912": {
    "id": "a3514d62-1dfe-4c1c-9cfb-125d4ba1a912",
    "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
    "title": {
      "ar": "\u0627\u062e\u062a\u0628\u0627\u0631 8",
      "en": "Test 8",
      "fr": "Test 8"
    },
    "description": {
      "ar": "\u0648\u0635\u0641",
      "en": "Description",
      "fr": "Description"
    },
    "class": "1AP1",
    "games": [
      "findcomposition",
      "WritetheFollowingNumberinLetters",
      "IdentifthUnitsTensHundredsandThousands"
    ],
    "createdAt": 1748477248,
    "updatedAt": 1748477248,
    "isActive": true,
    "findcomposition": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "activeLevel": "easy"
    },
    "WritetheFollowingNumberinLetters": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "activeLevel": "easy"
    },
    "IdentifthUnitsTensHundredsandThousands": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "activeLevel": "easy"
    },
            "isSent": false,
        "endDate": "14/06/2025"
  },
  "40ddaf91-d466-4ee6-9df1-de09a426d595": {
    "id": "40ddaf91-d466-4ee6-9df1-de09a426d595",
    "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
    "title": {
      "ar": "\u0627\u062e\u062a\u0628\u0627\u0631 9",
      "en": "Test 9",
      "fr": "Test 9"
    },
    "description": {
      "ar": "\u0648\u0635\u0641",
      "en": "Description",
      "fr": "Description"
    },
    "class": "1Z2",
    "games": [
      "findcomposition",
      "WritetheFollowingNumberinLetters",
      "IdentifthUnitsTensHundredsandThousands"
    ],
    "createdAt": 1748477248,
    "updatedAt": 1748477248,
    "isActive": true,
    "findcomposition": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "activeLevel": "easy"
    },
    "WritetheFollowingNumberinLetters": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "activeLevel": "easy"
    },
    "IdentifthUnitsTensHundredsandThousands": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "activeLevel": "easy"
    },
            "isSent": false,
        "endDate": "14/06/2025"
  },
  "93a1ab61-4af5-4a2e-ab34-90eb1891285f": {
    "id": "93a1ab61-4af5-4a2e-ab34-90eb1891285f",
    "idTeacher": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
    "title": {
      "ar": "\u0627\u062e\u062a\u0628\u0627\u0631 10",
      "en": "Test 10",
      "fr": "Test 10"
    },
    "description": {
      "ar": "\u0648\u0635\u0641",
      "en": "Description",
      "fr": "Description"
    },
    "class": "1AP1",
    "games": [
      "findcomposition",
      "WritetheFollowingNumberinLetters",
      "IdentifthUnitsTensHundredsandThousands"
    ],
    "createdAt": 1748477248,
    "updatedAt": 1748477248,
    "isActive": true,
    "findcomposition": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          100,
          20,
          3
        ]
      },
      "activeLevel": "easy"
    },
    "WritetheFollowingNumberinLetters": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 123,
        "solution": [
          "one hundred twenty-three"
        ]
      },
      "activeLevel": "easy"
    },
    "IdentifthUnitsTensHundredsandThousands": {
      "easy": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "medium": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "hard": {
        "time": 60,
        "attemptsAllowed": 3,
        "number": 1234,
        "solution": {
          "units": 4,
          "tens": 3,
          "hundreds": 2,
          "thousands": 1
        }
      },
      "activeLevel": "easy"
    },
            "isSent": false,
        "endDate": "14/06/2025"
  }
}
  // "users": {
  //   "par_1746732217285_6835": {
  //     "academicRole": "Mother",
  //     "address": {
  //       "city": "Fès",
  //       "postalCode": "9100",
  //       "street": "Rue B"
  //     },
  //     "childrenCount": 1,
  //     "childrenList": [
  //       "stu_1746732217285_6835"
  //     ],
  //     "childrenSchool": "École Modèle",
  //     "civility": "Madame",
  //     "dataCompleted": true,
  //     "email": "fatima.el idrissi@example.com",
  //     "firstname": "Fatima",
  //     "frozen": true,
  //     "lastname": "El Idrissi",
  //     "nationalId": "ID0001",
  //     "password": "pass101",
  //     "phone": "0601345678",
  //     "role": "Parent"
  //   },
  //   "par_1746732217285_7199": {
  //     "academicRole": "Father",
  //     "address": {
  //       "city": "Rabat",
  //       "postalCode": "9200",
  //       "street": "Rue C"
  //     },
  //     "childrenCount": 1,
  //     "childrenList": [
  //       "stu_1746732217285_7199"
  //     ],
  //     "childrenSchool": "École Modèle",
  //     "civility": "Monsieur",
  //     "dataCompleted": true,
  //     "email": "khalid.touhami@example.com",
  //     "firstname": "Khalid",
  //     "frozen": false,
  //     "lastname": "Touhami",
  //     "nationalId": "ID0002",
  //     "password": "pass102",
  //     "phone": "0602345678",
  //     "role": "Parent"
  //   },
  //   "par_1746732217285_7271": {
  //     "academicRole": "Mother",
  //     "address": {
  //       "city": "Casablanca",
  //       "postalCode": "9300",
  //       "street": "Rue D"
  //     },
  //     "childrenCount": 1,
  //     "childrenList": [
  //       "stu_1746732217285_7271"
  //     ],
  //     "childrenSchool": "École Modèle",
  //     "civility": "Madame",
  //     "dataCompleted": true,
  //     "email": "nadia.oumhani@example.com",
  //     "firstname": "Nadia",
  //     "frozen": false,
  //     "lastname": "Oumhani",
  //     "nationalId": "ID0003",
  //     "password": "pass103",
  //     "phone": "0603345678",
  //     "role": "Parent",
  //     "updatedAt": "2025-05-13T16:50:03.853Z"
  //   },
  //   "par_1746732217285_7460": {
  //     "academicRole": "Father",
  //     "address": {
  //       "city": "Agadir",
  //       "postalCode": "9400",
  //       "street": "Rue E"
  //     },
  //     "childrenCount": 2,
  //     "childrenList": [
  //       "stu_1746732217285_7460",
  //       "stu_1746732217285_7671"
  //     ],
  //     "childrenSchool": "École Modèle",
  //     "civility": "Monsieur",
  //     "dataCompleted": true,
  //     "email": "youssef.mouline@example.com",
  //     "firstname": "Youssef",
  //     "frozen": false,
  //     "lastname": "Mouline",
  //     "nationalId": "ID0004",
  //     "password": "pass104",
  //     "phone": "0604345678",
  //     "role": "Parent"
  //   },
  //   "par_1746732217285_7761": {
  //     "academicRole": "Mother",
  //     "address": {
  //       "city": "Marrakech",
  //       "postalCode": "9500",
  //       "street": "Rue F"
  //     },
  //     "childrenCount": 1,
  //     "childrenList": [
  //       "stu_1746732217285_7761"
  //     ],
  //     "childrenSchool": "École Modèle",
  //     "civility": "Madame",
  //     "dataCompleted": true,
  //     "email": "samira.bakkali@example.com",
  //     "firstname": "Samira",
  //     "frozen": true,
  //     "lastname": "Bakkali",
  //     "nationalId": "ID0005",
  //     "password": "pass105",
  //     "phone": "0605345678",
  //     "role": "Parent"
  //   },
  //   "par_1746732217285_7813": {
  //     "academicRole": "Father",
  //     "address": {
  //       "city": "Tanger",
  //       "postalCode": "9600",
  //       "street": "Rue G"
  //     },
  //     "childrenCount": 1,
  //     "childrenList": [
  //       "stu_1746732217285_7813"
  //     ],
  //     "childrenSchool": "École Modèle",
  //     "civility": "Monsieur",
  //     "dataCompleted": false,
  //     "email": "rachid.najmi@example.com",
  //     "firstname": "Rachid",
  //     "frozen": false,
  //     "lastname": "Najmi",
  //     "nationalId": "ID0006",
  //     "password": "pass106",
  //     "phone": "0606345678",
  //     "role": "Parent"
  //   },
  //   "par_1746732217285_8257": {
  //     "academicRole": "Mother",
  //     "address": {
  //       "city": "Oujda",
  //       "postalCode": "9700",
  //       "street": "Rue H"
  //     },
  //     "childrenCount": 1,
  //     "childrenList": [
  //       "stu_1746732217285_8257"
  //     ],
  //     "childrenSchool": "École Modèle",
  //     "civility": "Madame",
  //     "dataCompleted": true,
  //     "email": "layla.zahraoui@example.com",
  //     "firstname": "Layla",
  //     "frozen": true,
  //     "lastname": "Zahraoui",
  //     "nationalId": "ID0007",
  //     "password": "pass107",
  //     "phone": "0607345678",
  //     "role": "Parent"
  //   },
  //   "par_1746732217285_8596": {
  //     "academicRole": "Father",
  //     "address": {
  //       "city": "Kénitra",
  //       "postalCode": "9800",
  //       "street": "Rue I"
  //     },
  //     "childrenCount": 2,
  //     "childrenList": [
  //       "stu_1746732217285_8596",
  //       "stu_1746732217285_8887"
  //     ],
  //     "childrenSchool": "École Modèle",
  //     "civility": "Monsieur",
  //     "dataCompleted": true,
  //     "email": "mounir.fadili@example.com",
  //     "firstname": "Mounir",
  //     "frozen": false,
  //     "lastname": "Fadili",
  //     "nationalId": "ID0008",
  //     "password": "pass108",
  //     "phone": "0608345678",
  //     "role": "Parent"
  //   },
  //   "par_1746732217285_8986": {
  //     "academicRole": "Mother",
  //     "address": {
  //       "city": "Salé",
  //       "postalCode": "9900",
  //       "street": "Rue J"
  //     },
  //     "childrenCount": 1,
  //     "childrenList": [
  //       "stu_1746732217285_8986"
  //     ],
  //     "childrenSchool": "École Modèle",
  //     "civility": "Madame",
  //     "dataCompleted": false,
  //     "email": "ikram.harir@example.com",
  //     "firstname": "Ikram",
  //     "frozen": true,
  //     "lastname": "Harir",
  //     "nationalId": "ID0009",
  //     "password": "pass109",
  //     "phone": "0609345678",
  //     "role": "Parent"
  //   },
  //   "par_1746732217285_9062": {
  //     "academicRole": "Father",
  //     "address": {
  //       "city": "Errachidia",
  //       "postalCode": "10000",
  //       "street": "Rue K"
  //     },
  //     "childrenCount": 1,
  //     "childrenList": [
  //       "stu_1746732217285_9062"
  //     ],
  //     "childrenSchool": "École Modèle",
  //     "civility": "Monsieur",
  //     "dataCompleted": true,
  //     "email": "hamza.draoui@example.com",
  //     "firstname": "Hamza",
  //     "frozen": false,
  //     "lastname": "Draoui",
  //     "nationalId": "ID0010",
  //     "password": "pass110",
  //     "phone": "0610345678",
  //     "role": "Parent"
  //   },
  //   "par_1746732217285_9236": {
  //     "academicRole": "Mother",
  //     "address": {
  //       "city": "Mohammedia",
  //       "postalCode": "10100",
  //       "street": "Rue L"
  //     },
  //     "childrenCount": 1,
  //     "childrenList": [
  //       "stu_1746732217285_9236"
  //     ],
  //     "childrenSchool": "École Modèle",
  //     "civility": "Madame",
  //     "dataCompleted": true,
  //     "email": "amina.salmi@example.com",
  //     "firstname": "Amina",
  //     "frozen": false,
  //     "lastname": "Salmi",
  //     "nationalId": "ID0011",
  //     "password": "pass111",
  //     "phone": "0611345678",
  //     "role": "Parent",
  //     "updatedAt": "2025-05-13T16:49:45.368Z"
  //   },
  //   "par_1746732217285_9858": {
  //     "academicRole": "Father",
  //     "address": {
  //       "city": "Settat",
  //       "postalCode": "10200",
  //       "street": "Rue M"
  //     },
  //     "childrenCount": 2,
  //     "childrenList": [
  //       "stu_1746732217285_9858",
  //       "stu_1746732217285_9967"
  //     ],
  //     "childrenSchool": "École Modèle",
  //     "civility": "Monsieur",
  //     "dataCompleted": false,
  //     "email": "zineb.yassine@example.com",
  //     "firstname": "Zineb",
  //     "frozen": false,
  //     "lastname": "Yassine",
  //     "nationalId": "ID0012",
  //     "password": "pass112",
  //     "phone": "0612345678",
  //     "role": "Parent"
  //   },
  //   "par_1747042205403_2209": {
  //     "academicRole": "Mother",
  //     "address": {
  //       "city": "El Jadida",
  //       "postalCode": "10300",
  //       "street": "Rue N"
  //     },
  //     "childrenCount": 1,
  //     "childrenList": [
  //       "stu_1747042205403_2209"
  //     ],
  //     "childrenSchool": "École Modèle",
  //     "civility": "Madame",
  //     "dataCompleted": true,
  //     "email": "hicham.tazi@example.com",
  //     "firstname": "Hicham",
  //     "frozen": true,
  //     "lastname": "Tazi",
  //     "nationalId": "ID0013",
  //     "password": "pass113",
  //     "phone": "0613345678",
  //     "role": "Parent"
  //   },
  //   "par_1747042205928_1027": {
  //     "academicRole": "Father",
  //     "address": {
  //       "city": "Nador",
  //       "postalCode": "10400",
  //       "street": "Rue O"
  //     },
  //     "childrenCount": 1,
  //     "childrenList": [
  //       "stu_1747042205928_1027"
  //     ],
  //     "childrenSchool": "École Modèle",
  //     "civility": "Monsieur",
  //     "dataCompleted": true,
  //     "email": "sara.slaoui@example.com",
  //     "firstname": "Sara",
  //     "frozen": false,
  //     "lastname": "Slaoui",
  //     "nationalId": "ID0014",
  //     "password": "pass114",
  //     "phone": "0614345678",
  //     "role": "Parent"
  //   },
  //   "stu_1746732217285_1235": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:12:20Z",
  //     "firstName": "student38",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "1",
  //     "uid": "stu_1746732217285_1235"
  //   },
  //   "stu_1746732217285_1708": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:00:20Z",
  //     "firstName": "student2",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "1",
  //     "uid": "stu_1746732217285_1708"
  //   },
  //   "stu_1746732217285_2504": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:04:00Z",
  //     "firstName": "student13",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "1",
  //     "uid": "stu_1746732217285_2504"
  //   },
  //   "stu_1746732217285_3022": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:04:40Z",
  //     "firstName": "student15",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "4",
  //     "uid": "stu_1746732217285_3022"
  //   },
  //   "stu_1746732217285_3050": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:09:20Z",
  //     "firstName": "student29",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "2",
  //     "uid": "stu_1746732217285_3050"
  //   },
  //   "stu_1746732217285_3262": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:03:00Z",
  //     "firstName": "student10",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "4",
  //     "uid": "stu_1746732217285_3262"
  //   },
  //   "stu_1746732217285_3320": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:03:40Z",
  //     "firstName": "student12",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "1",
  //     "uid": "stu_1746732217285_3320"
  //   },
  //   "stu_1746732217285_3515": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:05:40Z",
  //     "firstName": "student18",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "4",
  //     "uid": "stu_1746732217285_3515"
  //   },
  //   "stu_1746732217285_3548": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:12:40Z",
  //     "firstName": "student39",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "6",
  //     "uid": "stu_1746732217285_3548"
  //   },
  //   "stu_1746732217285_3893": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:02:40Z",
  //     "firstName": "student9",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "4",
  //     "uid": "stu_1746732217285_3893"
  //   },
  //   "stu_1746732217285_4069": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:05:00Z",
  //     "firstName": "student16",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "3",
  //     "uid": "stu_1746732217285_4069"
  //   },
  //   "stu_1746732217285_4614": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:07:40Z",
  //     "firstName": "student24",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "5",
  //     "uid": "stu_1746732217285_4614"
  //   },
  //   "stu_1746732217285_4741": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:12:00Z",
  //     "firstName": "student37",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "4",
  //     "uid": "stu_1746732217285_4741"
  //   },
  //   "stu_1746732217285_4757": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:06:40Z",
  //     "firstName": "student21",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "4",
  //     "uid": "stu_1746732217285_4757"
  //   },
  //   "stu_1746732217285_5529": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:00:00Z",
  //     "firstName": "student1",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "3",
  //     "uid": "stu_1746732217285_5529"
  //   },
  //   "stu_1746732217285_5666": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:01:00Z",
  //     "firstName": "student4",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "5",
  //     "uid": "stu_1746732217285_5666"
  //   },
  //   "stu_1746732217285_6217": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:00:40Z",
  //     "firstName": "student3",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "3",
  //     "uid": "stu_1746732217285_6217"
  //   },
  //   "stu_1746732217285_6241": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:09:00Z",
  //     "firstName": "student28",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "4",
  //     "uid": "stu_1746732217285_6241"
  //   },
  //   "stu_1746732217285_6370": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:10:00Z",
  //     "firstName": "student31",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "4",
  //     "uid": "stu_1746732217285_6370"
  //   },
  //   "stu_1746732217285_6509": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:08:00Z",
  //     "firstName": "student25",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "3",
  //     "uid": "stu_1746732217285_6509"
  //   },
  //   "stu_1746732217285_6559": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:05:20Z",
  //     "firstName": "student17",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "1",
  //     "uid": "stu_1746732217285_6559"
  //   },
  //   "stu_1746732217285_6602": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:02:00Z",
  //     "firstName": "student7",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "1",
  //     "uid": "stu_1746732217285_6602"
  //   },
  //   "stu_1746732217285_6629": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:01:20Z",
  //     "firstName": "student5",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "4",
  //     "uid": "stu_1746732217285_6629"
  //   },
  //   "stu_1746732217285_6692": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:10:20Z",
  //     "firstName": "student32",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "2",
  //     "uid": "stu_1746732217285_6692"
  //   },
  //   "stu_1746732217285_6742": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:07:20Z",
  //     "firstName": "student23",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "3",
  //     "uid": "stu_1746732217285_6742"
  //   },
  //   "stu_1746732217285_6835": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:02:20Z",
  //     "firstName": "student8",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "2",
  //     "uid": "stu_1746732217285_6835"
  //   },
  //   "stu_1746732217285_7199": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:04:20Z",
  //     "firstName": "student14",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "4",
  //     "uid": "stu_1746732217285_7199"
  //   },
  //   "stu_1746732217285_7271": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:09:40Z",
  //     "firstName": "student30",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "2",
  //     "uid": "stu_1746732217285_7271"
  //   },
  //   "stu_1746732217285_7460": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:11:40Z",
  //     "firstName": "student36",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "5",
  //     "uid": "stu_1746732217285_7460"
  //   },
  //   "stu_1746732217285_7671": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:11:00Z",
  //     "firstName": "student34",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "1",
  //     "uid": "stu_1746732217285_7671"
  //   },
  //   "stu_1746732217285_7761": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:08:20Z",
  //     "firstName": "student26",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "5",
  //     "uid": "stu_1746732217285_7761"
  //   },
  //   "stu_1746732217285_7813": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:07:00Z",
  //     "firstName": "student22",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "1",
  //     "uid": "stu_1746732217285_7813"
  //   },
  //   "stu_1746732217285_8257": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:06:20Z",
  //     "firstName": "student20",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "5",
  //     "uid": "stu_1746732217285_8257"
  //   },
  //   "stu_1746732217285_8596": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:01:40Z",
  //     "firstName": "student6",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "1",
  //     "uid": "stu_1746732217285_8596"
  //   },
  //   "stu_1746732217285_8887": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:13:00Z",
  //     "firstName": "student40",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "3",
  //     "uid": "stu_1746732217285_8887"
  //   },
  //   "stu_1746732217285_8986": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:03:20Z",
  //     "firstName": "student11",
  //     "gender": "Male",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "4",
  //     "uid": "stu_1746732217285_8986"
  //   },
  //   "stu_1746732217285_9062": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:10:40Z",
  //     "firstName": "student33",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "3",
  //     "uid": "stu_1746732217285_9062"
  //   },
  //   "stu_1746732217285_9236": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:11:20Z",
  //     "firstName": "student35",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "2",
  //     "uid": "stu_1746732217285_9236"
  //   },
  //   "stu_1746732217285_9858": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:08:40Z",
  //     "firstName": "student27",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "6",
  //     "uid": "stu_1746732217285_9858"
  //   },
  //   "stu_1746732217285_9967": {
  //     "birthday": "2025-05-04",
  //     "createdAt": "2025-05-01T00:06:00Z",
  //     "firstName": "student19",
  //     "gender": "Female",
  //     "lastName": "test",
  //     "linkedSchoolId": "Al Amal School",
  //     "linkedTeacherId": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "password": "1234",
  //     "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAXNSR0IArs4c6QAADepJREFUeF7tndmW4yAMRJP5...",
  //     "role": "Student",
  //     "schoolGrade": "6",
  //     "uid": "stu_1746732217285_9967"
  //   },
  //   "uid_123": {
  //     "email": "principal@school.com",
  //     "firstName": "Amine",
  //     "lastName": "Bakkali",
  //     "role": "Principal",
  //     "school": "Tangier Science Academy",
  //     "uid": "uid_123"
  //   },
  //   "uid_456": {
  //     "email": "admin@school.com",
  //     "firstName": "Salma",
  //     "lastName": "Zahra",
  //     "role": "Administrator",
  //     "school": "Tangier Science Academy",
  //     "uid": "uid_456"
  //   },
  //   "uid_789": {
  //     "email": "teacher1@school.com",
  //     "firstName": "Younes",
  //     "lastName": "El Idrissi",
  //     "role": "Teacher",
  //     "school": "Tangier Science Academy",
  //     "uid": "uid_789"
  //   },
  //   "xZHGOCwsgkP22g7ijGXRWAY4jG72": {
  //     "academy": "Tangier-Tetouan-Al Hoceima",
  //     "data_completed": true,
  //     "dateEmbauche": "2025-05-03",
  //     "dateNaissance": "2025-05-01",
  //     "ecole": "Al Amal School",
  //     "email": "mussumuhand@gmail.com",
  //     "emailVerified": false,
  //     "firstName": "moussa",
  //     "frozen": false,
  //     "lastName": "mohand",
  //     "matieres_enseignees": "R",
  //     "photo": "P2.png",
  //     "role": "Teacher",
  //     "telephone": "3",
  //     "uid": "xZHGOCwsgkP22g7ijGXRWAY4jG72",
  //     "updatedAt": "2025-05-08T19:18:42.289Z",
  //     "userId": "xZHGOCwsgkP22g7ijGXRWAY4jG72"
  //   }
  // }
    
};

const updates = {
  // '/users': data.users,
  '/tests': data.tests
  // '/miniGames': data.miniGames,
  // '/School': data.School
  // '/Answers': data.Answers
};

update(ref(db), updates)
  .then(() => console.log('✅ تم إدخال البيانات بنجاح'))
  .catch(err => console.error('❌ خطأ أثناء الإدخال:', err));
