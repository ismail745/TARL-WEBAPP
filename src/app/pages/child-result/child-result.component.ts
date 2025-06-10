import { Component, OnInit } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common';
import { AnswerModel } from '../../models/answer.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-child-result',
   standalone: true, 
  imports: [CommonModule],
  templateUrl: './child-result.component.html',
  styleUrls: ['./child-result.component.css']
})
export class ChildResultComponent implements OnInit {
  children: any[] = [];
  selectedChild: any = null;
  childResults: AnswerModel | null = null;
  showModal = false;
  barChartGame: string | null = null;
  currentLanguage = 'en';

  translations: Record<string, Record<string, string>> = {
    en: {
      trackProgress: 'Track Progress',
      game: 'Game',
      level: 'Level',
      result: 'Result',
      correct: 'Correct',
      attempts: 'Attempts',
      statistics: 'Statistics',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      yes: 'Yes',
      no: 'No',
      results: 'Results',
      close: 'Close',
      showChart: 'Show Chart',
      chartTitle: 'Chart for',
      findComposition: 'Find Composition',
      writeNumberInLetters: 'Write Numbers in Letters',
      identifyPlace: 'Identify Place Values'
    },
    ar: {
      trackProgress: 'متابعة التقدم',
      game: 'اللعبة',
      level: 'المستوى',
      result: 'النتيجة',
      correct: 'صحيح',
      attempts: 'المحاولات',
      statistics: 'الإحصائيات',
      easy: 'سهل',
      medium: 'متوسط',
      hard: 'صعب',
      yes: 'نعم',
      no: 'لا',
      results: 'نتائج',
      close: 'إغلاق',
      showChart: 'عرض الرسم البياني',
      chartTitle: 'الرسم البياني لـ',
      findComposition: 'البحث عن التكوين',
      writeNumberInLetters: 'كتابة الأرقام بالحروف', 
      identifyPlace: 'تحديد الآحاد والعشرات والمئات والآلاف'
    }
  };

  constructor(private db: Database, private auth: AuthService, private languageService: LanguageService) {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  async ngOnInit() {
    const user = await this.auth.getCurrentUserWithRole().toPromise();
    if (user && user.la_liste_enfants) {
      // Charge les enfants liés
      const usersSnap = await get(ref(this.db, 'users'));
      const users = usersSnap.val();
      this.children = user.la_liste_enfants.map((uid: string) => users[uid]);
    }
  }

  async selectChild(child: any) {
    this.selectedChild = child;
    // Récupère tous les résultats
    const answersSnap = await get(ref(this.db, 'Answers'));
    if (answersSnap.exists()) {
      const allAnswers = answersSnap.val();
      // allAnswers est un tableau ou un objet indexé
      let found = null;
      // Si c'est un tableau
      if (Array.isArray(allAnswers)) {
        found = allAnswers.find(ans => ans && ans.studentId === child.uid);
      } else {
        // Si c'est un objet indexé
        found = Object.values(allAnswers).find((ans: any) => ans && ans.studentId === child.uid);
      }
      this.childResults = found || null;
    } else {
      this.childResults = null;
    }
  }

  async openModal(child: any) {
    this.selectedChild = child;
    // Récupère tous les résultats
    const answersSnap = await get(ref(this.db, 'Answers'));
    if (answersSnap.exists()) {
      const allAnswers = answersSnap.val();
      let found = null;
      if (Array.isArray(allAnswers)) {
        found = allAnswers.find(ans => ans && ans.studentId === child.uid);
      } else {
        found = Object.values(allAnswers).find((ans: any) => ans && ans.studentId === child.uid);
      }
      this.childResults = found || null;
    } else {
      this.childResults = null;
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedChild = null;
    this.childResults = null;
  }

  showBarChart(game: string) {
    this.barChartGame = this.getTranslatedGameName(game);
  }
    closeBarChart() {
    this.barChartGame = null;
  }

  getTranslatedGameName(game: string): string {
    switch (game) {
      case 'findcomposition':
        return this.getTranslation('findComposition');
      case 'WritetheFollowingNumberinLetters':
        return this.getTranslation('writeNumberInLetters');
      case 'IdentifthUnitsTensHundredsandThousands':
        return this.getTranslation('identifyPlace');
      default:
        return game;
    }
  }

  getGameAnswers(game: string) {
    return (this.childResults?.answers as any)?.[game];
  }

  getTranslation(key: string): string {
    return this.translations[this.currentLanguage][key] || key;
  }
}
