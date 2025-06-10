import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Database, ref, get, update } from '@angular/fire/database';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LanguageService } from '../../services/language.service';

interface MultiLanguageText {
  ar: string;
  fr: string;
  en: string;
}

interface GameBase {
  time: number;
  attemptsAllowed: number;
  number: number;
}

interface FindComposition extends GameBase {
  solution: number[];
}

interface WriteNumberInLetters extends GameBase {
  solution: string[];
}

interface IdentifyPlaceValues extends GameBase {
  solution: {
    units: number;
    tens: number;
    hundreds: number;
    thousands: number;
  };
}

interface DifficultyLevels<T> {
  easy: T;
  medium: T;
  hard: T;
  activeLevel: 'easy' | 'medium' | 'hard';
}

interface Test {
  id: string;
  idTeacher: string;
  title: MultiLanguageText;
  description: MultiLanguageText;
  class: string;
  games?: string[];
  students?: string[];
  createdAt: number;
  updatedAt?: number;
  status?: 'active' | 'inactive';
  isActive?: boolean;
  findcomposition?: DifficultyLevels<FindComposition>;
  WritetheFollowingNumberinLetters?: DifficultyLevels<WriteNumberInLetters>;
  IdentifthUnitsTensHundredsandThousands?: DifficultyLevels<IdentifyPlaceValues>;
}

type Language = 'en' | 'ar';

type TranslationKey = 
  | 'editTest'
  | 'loading'
  | 'testNotFound'
  | 'testIncomplete'
  | 'updateSuccess'
  | 'updateError'
  | 'testIdNotFound'
  | 'gameSettings'
  | 'findComposition'
  | 'writeNumber'
  | 'identifyPlaces'
  | 'easy'
  | 'medium'
  | 'hard'
  | 'time'
  | 'attempts'
  | 'number'
  | 'solution'
  | 'save'
  | 'back'
  | 'enterSolution'
  | 'title'
  | 'description'
  | 'class'
  | 'status'
  | 'active'
  | 'inactive'
  | 'ar'
  | 'en'
  | 'fr'
  | 'langArabic'
  | 'langEnglish'
  | 'langFrench';

@Component({
  selector: 'app-edit-test',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './edit-test.component.html'
})
export class EditTestComponent implements OnInit {
  private translations: Record<Language, Record<TranslationKey, string>> = {
    'en': {
      'editTest': 'Edit Test',
      'loading': 'Loading test data...',
      'testNotFound': 'Test not found',
      'testIncomplete': 'Test data incomplete',
      'updateSuccess': 'Test updated successfully',
      'updateError': 'Update failed',
      'testIdNotFound': 'Test ID not found',
      'gameSettings': 'Game Settings',
      'findComposition': 'Find Composition',
      'writeNumber': 'Write Number in Letters',
      'identifyPlaces': 'Identify Places',
      'easy': 'Easy',
      'medium': 'Medium',
      'hard': 'Hard',
      'time': 'Time (seconds)',
      'attempts': 'Attempts Allowed',
      'number': 'Number',
      'solution': 'Solution',
      'save': 'Save Changes',
      'back': 'Back to Tests',
      'enterSolution': 'Enter solution (comma separated)',
      'title': 'Title',
      'description': 'Description',
      'class': 'Class',
      'status': 'Status',
      'active': 'Active',
      'inactive': 'Inactive',
      'ar': 'Arabic',
      'en': 'English',
      'fr': 'French',
      'langArabic': 'Arabic',
      'langEnglish': 'English',
      'langFrench': 'French'
    },
    'ar': {
      'editTest': 'تعديل الاختبار',
      'loading': 'جاري تحميل بيانات الاختبار...',
      'testNotFound': 'لم يتم العثور على الاختبار',
      'testIncomplete': 'بيانات الاختبار غير مكتملة',
      'updateSuccess': 'تم تحديث الاختبار بنجاح',
      'updateError': 'فشل التحديث',
      'testIdNotFound': 'معرف الاختبار غير موجود',
      'gameSettings': 'إعدادات اللعبة',
      'findComposition': 'إيجاد التركيب',
      'writeNumber': 'كتابة الرقم بالحروف',
      'identifyPlaces': 'تحديد المنازل',
      'easy': 'سهل',
      'medium': 'متوسط',
      'hard': 'صعب',
      'time': 'الوقت (ثواني)',
      'attempts': 'المحاولات المسموحة',
      'number': 'الرقم',
      'solution': 'الحل',
      'save': 'حفظ التغييرات',
      'back': 'العودة إلى الاختبارات',
      'enterSolution': 'أدخل الحل (مفصول بفواصل)',
      'title': 'العنوان',
      'description': 'الوصف',
      'class': 'الصف',
      'status': 'الحالة',
      'active': 'نشط',
      'inactive': 'غير نشط',
      'ar': 'العربية',
      'en': 'الإنجليزية',
      'fr': 'الفرنسية',
      'langArabic': 'العربية',
      'langEnglish': 'الإنجليزية',
      'langFrench': 'الفرنسية'
    }
  };

  test: Test | null = null;
  loading = true;
  errorMessage = '';
  successMessage = '';
  findCompSolutionString = '';
  writeNumberSolutionString = '';
  activeLevel: 'easy' | 'medium' | 'hard' = 'easy';
  activeFindCompLevel: 'easy' | 'medium' | 'hard' = 'easy';
  activeWriteNumLevel: 'easy' | 'medium' | 'hard' = 'easy';
  activePlaceValueLevel: 'easy' | 'medium' | 'hard' = 'easy';
  findCompSolutionEasy = '';
  findCompSolutionMedium = '';
  findCompSolutionHard = '';
  writeNumSolutionEasy = '';
  writeNumSolutionMedium = '';
  writeNumSolutionHard = '';

  constructor(
    private db: Database,
    private dashboard: DashboardComponent,
    private langService: LanguageService
  ) {}

  getTranslation(key: TranslationKey): string {
    const currentLang = this.langService.getCurrentLanguage() as Language;
    return this.translations[currentLang]?.[key] || key;
  }

  async ngOnInit() {
    try {
      const testId = localStorage.getItem('currentTestId');
      if (!testId) {
        throw new Error('Test not selected');
      }
      await this.loadTest(testId);
      this.initializeSolutionStrings();
    } catch (error) {
      console.error('Error loading test:', error);
      this.errorMessage = 'Failed to load test data';
      setTimeout(() => this.backToTests(), 3000);
    } finally {
      this.loading = false;
    }
  }

  private initializeSolutionStrings() {
    if (this.test?.findcomposition?.activeLevel) {
      this.activeFindCompLevel = this.test.findcomposition.activeLevel;
    }
    if (this.test?.WritetheFollowingNumberinLetters?.activeLevel) {
      this.activeWriteNumLevel = this.test.WritetheFollowingNumberinLetters.activeLevel;
    }
    if (this.test?.IdentifthUnitsTensHundredsandThousands?.activeLevel) {
      this.activePlaceValueLevel = this.test.IdentifthUnitsTensHundredsandThousands.activeLevel;
    }
    
    if (this.test?.findcomposition?.easy?.solution) {
      this.findCompSolutionEasy = this.test.findcomposition.easy.solution.join(',');
    }
    if (this.test?.findcomposition?.medium?.solution) {
      this.findCompSolutionMedium = this.test.findcomposition.medium.solution.join(',');
    }
    if (this.test?.findcomposition?.hard?.solution) {
      this.findCompSolutionHard = this.test.findcomposition.hard.solution.join(',');
    }
    
    if (this.test?.WritetheFollowingNumberinLetters?.easy?.solution) {
      this.writeNumSolutionEasy = this.test.WritetheFollowingNumberinLetters.easy.solution.join(',');
    }
    if (this.test?.WritetheFollowingNumberinLetters?.medium?.solution) {
      this.writeNumSolutionMedium = this.test.WritetheFollowingNumberinLetters.medium.solution.join(',');
    }
    if (this.test?.WritetheFollowingNumberinLetters?.hard?.solution) {
      this.writeNumSolutionHard = this.test.WritetheFollowingNumberinLetters.hard.solution.join(',');
    }
    
    this.findCompSolutionString = this.getFindCompSolutionForActiveLevel();
    this.writeNumberSolutionString = this.getWriteNumSolutionForActiveLevel();
  }
  
  private getFindCompSolutionForActiveLevel(): string {
    if (!this.test?.findcomposition) return '';
    
    switch (this.activeFindCompLevel) {
      case 'easy':
        return this.findCompSolutionEasy;
      case 'medium':
        return this.findCompSolutionMedium;
      case 'hard':
        return this.findCompSolutionHard;
      default:
        return this.findCompSolutionEasy;
    }
  }
  
  private getWriteNumSolutionForActiveLevel(): string {
    if (!this.test?.WritetheFollowingNumberinLetters) return '';
    
    switch (this.activeWriteNumLevel) {
      case 'easy':
        return this.writeNumSolutionEasy;
      case 'medium':
        return this.writeNumSolutionMedium;
      case 'hard':
        return this.writeNumSolutionHard;
      default:
        return this.writeNumSolutionEasy;
    }
  }

  private async loadTest(testId: string) {
    try {    
      
      const snapshot = await get(ref(this.db, `tests/${testId}`));
      if (!snapshot.exists()) {
        this.errorMessage = this.getTranslation('testNotFound');
        return;
      }
      const data = snapshot.val();
      if (!data.title || !data.class) {
        this.errorMessage = this.getTranslation('testIncomplete');
        return;
      }
      
      this.test = {
        id: testId,
        idTeacher: data.idTeacher || '',
        title: data.title || { ar: '', fr: '', en: '' },
        description: data.description || { ar: '', fr: '', en: '' },
        class: data.class || '',
        games: data.games || [],
        students: data.students || [],
        createdAt: data.createdAt || Date.now(),
        updatedAt: data.updatedAt || data.createdAt || Date.now(),
        status: data.status || 'active',
        isActive: Boolean(data.isActive),
        
        findcomposition: data.findcomposition ? {
          easy: {
            time: data.findcomposition.easy?.time || 0,
            attemptsAllowed: data.findcomposition.easy?.attemptsAllowed || 0,
            number: data.findcomposition.easy?.number || 0,
            solution: data.findcomposition.easy?.solution || []
          },
          medium: {
            time: data.findcomposition.medium?.time || 0,
            attemptsAllowed: data.findcomposition.medium?.attemptsAllowed || 0,
            number: data.findcomposition.medium?.number || 0,
            solution: data.findcomposition.medium?.solution || []
          },
          hard: {
            time: data.findcomposition.hard?.time || 0,
            attemptsAllowed: data.findcomposition.hard?.attemptsAllowed || 0,
            number: data.findcomposition.hard?.number || 0,
            solution: data.findcomposition.hard?.solution || []
          },
          activeLevel: data.findcomposition.activeLevel || 'easy'
        } : undefined,
        
        WritetheFollowingNumberinLetters: data.WritetheFollowingNumberinLetters ? {
          easy: {
            time: data.WritetheFollowingNumberinLetters.easy?.time || 0,
            attemptsAllowed: data.WritetheFollowingNumberinLetters.easy?.attemptsAllowed || 0,
            number: data.WritetheFollowingNumberinLetters.easy?.number || 0,
            solution: data.WritetheFollowingNumberinLetters.easy?.solution || []
          },
          medium: {
            time: data.WritetheFollowingNumberinLetters.medium?.time || 0,
            attemptsAllowed: data.WritetheFollowingNumberinLetters.medium?.attemptsAllowed || 0,
            number: data.WritetheFollowingNumberinLetters.medium?.number || 0,
            solution: data.WritetheFollowingNumberinLetters.medium?.solution || []
          },
          hard: {
            time: data.WritetheFollowingNumberinLetters.hard?.time || 0,
            attemptsAllowed: data.WritetheFollowingNumberinLetters.hard?.attemptsAllowed || 0,
            number: data.WritetheFollowingNumberinLetters.hard?.number || 0,
            solution: data.WritetheFollowingNumberinLetters.hard?.solution || []
          },
          activeLevel: data.WritetheFollowingNumberinLetters.activeLevel || 'easy'
        } : undefined,
        
        IdentifthUnitsTensHundredsandThousands: data.IdentifthUnitsTensHundredsandThousands ? {
          easy: {
            time: data.IdentifthUnitsTensHundredsandThousands.easy?.time || 0,
            attemptsAllowed: data.IdentifthUnitsTensHundredsandThousands.easy?.attemptsAllowed || 0,
            number: data.IdentifthUnitsTensHundredsandThousands.easy?.number || 0,
            solution: {
              units: data.IdentifthUnitsTensHundredsandThousands.easy?.solution?.units || 0,
              tens: data.IdentifthUnitsTensHundredsandThousands.easy?.solution?.tens || 0,
              hundreds: data.IdentifthUnitsTensHundredsandThousands.easy?.solution?.hundreds || 0,
              thousands: data.IdentifthUnitsTensHundredsandThousands.easy?.solution?.thousands || 0
            }
          },
          medium: {
            time: data.IdentifthUnitsTensHundredsandThousands.medium?.time || 0,
            attemptsAllowed: data.IdentifthUnitsTensHundredsandThousands.medium?.attemptsAllowed || 0,
            number: data.IdentifthUnitsTensHundredsandThousands.medium?.number || 0,
            solution: {
              units: data.IdentifthUnitsTensHundredsandThousands.medium?.solution?.units || 0,
              tens: data.IdentifthUnitsTensHundredsandThousands.medium?.solution?.tens || 0,
              hundreds: data.IdentifthUnitsTensHundredsandThousands.medium?.solution?.hundreds || 0,
              thousands: data.IdentifthUnitsTensHundredsandThousands.medium?.solution?.thousands || 0
            }
          },
          hard: {
            time: data.IdentifthUnitsTensHundredsandThousands.hard?.time || 0,
            attemptsAllowed: data.IdentifthUnitsTensHundredsandThousands.hard?.attemptsAllowed || 0,
            number: data.IdentifthUnitsTensHundredsandThousands.hard?.number || 0,
            solution: {
              units: data.IdentifthUnitsTensHundredsandThousands.hard?.solution?.units || 0,
              tens: data.IdentifthUnitsTensHundredsandThousands.hard?.solution?.tens || 0,
              hundreds: data.IdentifthUnitsTensHundredsandThousands.hard?.solution?.hundreds || 0,
              thousands: data.IdentifthUnitsTensHundredsandThousands.hard?.solution?.thousands || 0
            }
          },
          activeLevel: data.IdentifthUnitsTensHundredsandThousands.activeLevel || 'easy'
        } : undefined
      };
      
      
    } catch (error) {
      
      throw error;
    }
  }

  changeActiveLevel(gameType: string, level: 'easy' | 'medium' | 'hard') {
    if (!this.test) return;
    
    if (gameType === 'findcomposition' && this.test.findcomposition) {
      this.test.findcomposition.activeLevel = level;
      this.activeFindCompLevel = level;
      this.findCompSolutionString = this.getFindCompSolutionForActiveLevel();
    } else if (gameType === 'WritetheFollowingNumberinLetters' && this.test.WritetheFollowingNumberinLetters) {
      this.test.WritetheFollowingNumberinLetters.activeLevel = level;
      this.activeWriteNumLevel = level;
      this.writeNumberSolutionString = this.getWriteNumSolutionForActiveLevel();
    } else if (gameType === 'IdentifthUnitsTensHundredsandThousands' && this.test.IdentifthUnitsTensHundredsandThousands) {
      this.test.IdentifthUnitsTensHundredsandThousands.activeLevel = level;
      this.activePlaceValueLevel = level;
    }
  }
  
  onFindCompSolutionChange(value: string) {
    if (!this.test?.findcomposition) return;
    
    const numbers = value.split(',')
      .map(n => n.trim())
      .filter(n => n !== '')
      .map(n => parseInt(n, 10))
      .filter(n => !isNaN(n));
    
    const activeLevel = this.activeFindCompLevel;
    if (activeLevel === 'easy') {
      this.test.findcomposition.easy.solution = numbers;
      this.findCompSolutionEasy = value;
    } else if (activeLevel === 'medium') {
      this.test.findcomposition.medium.solution = numbers;
      this.findCompSolutionMedium = value;
    } else if (activeLevel === 'hard') {
      this.test.findcomposition.hard.solution = numbers;
      this.findCompSolutionHard = value;
    }
  }
  
  onWriteNumberSolutionChange(value: string) {
    if (!this.test?.WritetheFollowingNumberinLetters) return;
    
    const solutions = value.split(',')
      .map(s => s.trim())
      .filter(s => s !== '');
    
    const activeLevel = this.activeWriteNumLevel;
    if (activeLevel === 'easy') {
      this.test.WritetheFollowingNumberinLetters.easy.solution = solutions;
      this.writeNumSolutionEasy = value;
    } else if (activeLevel === 'medium') {
      this.test.WritetheFollowingNumberinLetters.medium.solution = solutions;
      this.writeNumSolutionMedium = value;
    } else if (activeLevel === 'hard') {
      this.test.WritetheFollowingNumberinLetters.hard.solution = solutions;
      this.writeNumSolutionHard = value;
    }
  }

  async saveChanges() {
    if (!this.test?.id) {
      this.errorMessage = this.getTranslation('testIdNotFound');
      return;
    }
    try {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';
      
      const status = this.test.isActive ? 'active' : 'inactive';
      
      const testRef = ref(this.db, `tests/${this.test.id}`);
      const updates = {
        title: this.test.title,
        description: this.test.description,
        class: this.test.class,
        findcomposition: this.test.findcomposition,
        WritetheFollowingNumberinLetters: this.test.WritetheFollowingNumberinLetters,
        IdentifthUnitsTensHundredsandThousands: this.test.IdentifthUnitsTensHundredsandThousands,
        isActive: this.test.isActive,
        status: status,
        updatedAt: Date.now(),
        games: this.test.games || [],
        students: this.test.students || []
      };
      
      await update(testRef, updates);
      this.successMessage = this.getTranslation('updateSuccess');
      setTimeout(() => this.successMessage = '', 3000);
    } catch (error) {
      
      this.errorMessage = `${this.getTranslation('updateError')}: ${error instanceof Error ? error.message : 'Unknown error'}`;
      setTimeout(() => this.errorMessage = '', 3000);
    } finally {
      this.loading = false;
    }
  }

  backToTests() {
    localStorage.removeItem('currentTestId');
    this.dashboard.onSectionSelected('test-list');
  }
}