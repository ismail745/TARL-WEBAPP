import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Database, ref, get } from '@angular/fire/database';
import { DashboardComponent } from '../dashboard/dashboard.component';
import jsPDF from 'jspdf';

type LanguageCode = 'ar' | 'fr' | 'en';

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

interface MultipleChoiceQuestion {
  time: number;
  attemptsAllowed: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
}

interface TrueFalseQuestion {
  time: number;
  attemptsAllowed: number;
  question: string;
  isTrue: boolean;
}

interface ShortAnswerQuestion {
  time: number;
  attemptsAllowed: number;
  question: string;
  answer: string;
  caseSensitive: boolean;
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
  games: string[];
  students: string[];
  createdAt: number;
  updatedAt: number;
  status: 'active' | 'inactive';
  
  findcomposition?: DifficultyLevels<FindComposition>;
  WritetheFollowingNumberinLetters?: DifficultyLevels<WriteNumberInLetters>;
  IdentifthUnitsTensHundredsandThousands?: DifficultyLevels<IdentifyPlaceValues>;
  
  MultipleChoice?: {
    time: number;
    attemptsAllowed: number;
    question: string;
    options: string[];
    correctOptionIndex: number;
  };
  
  TrueFalse?: {
    time: number;
    attemptsAllowed: number;
    question: string;
    isTrue: boolean;
  };
  
  ShortAnswer?: {
    time: number;
    attemptsAllowed: number;
    question: string;
    answer: string;
    caseSensitive: boolean;
  };
}

@Component({
  selector: 'app-view-test',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-test.component.html',
  styles: [`
    .status-badge {
      @apply px-3 py-1 rounded-full text-sm font-medium;
    }
    .status-active {
      @apply bg-green-100 text-green-800;
    }
    .status-inactive {
      @apply bg-red-100 text-red-800;
    }
  `]
})
export class ViewTestComponent implements OnInit {
  test: Test | null = null;
  loading = true;
  error = '';
  success = '';

  constructor(
    private db: Database,
    private dashboard: DashboardComponent
  ) {}

  async ngOnInit() {
    try {
      const testId = localStorage.getItem('currentTestId');
      if (!testId) {
        throw new Error('Test not selected');
      }
      await this.loadTest(testId);
    } catch (error) {
      
      this.error = error instanceof Error ? error.message : 'Failed to load the test';
      setTimeout(() => this.backToTests(), 3000);
    } finally {
      this.loading = false;
    }
  }

  private async loadTest(testId: string) {
    try {
      
      const snapshot = await get(ref(this.db, `tests/${testId}`));

      if (!snapshot.exists()) {
        throw new Error('Test not found');
      }

      const data = snapshot.val();
      

      if (!data.title || !data.class) {
        throw new Error('Test data is incomplete');
      }

      this.test = {
        id: testId,
        idTeacher: data.idTeacher || '',
        title: data.title || { ar: '', fr: '', en: '' },
        description: data.description || { ar: '', fr: '', en: '' },
        class: data.class || '',
        games: data.games || [],
        students: data.students || [],
        
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
        } : undefined,
        
        MultipleChoice: data.MultipleChoice ? {
          time: data.MultipleChoice.time || 0,
          attemptsAllowed: data.MultipleChoice.attemptsAllowed || 0,
          question: data.MultipleChoice.question || '',
          options: data.MultipleChoice.options || [],
          correctOptionIndex: data.MultipleChoice.correctOptionIndex || 0
        } : undefined,
        
        TrueFalse: data.TrueFalse ? {
          time: data.TrueFalse.time || 0,
          attemptsAllowed: data.TrueFalse.attemptsAllowed || 0,
          question: data.TrueFalse.question || '',
          isTrue: data.TrueFalse.isTrue || false
        } : undefined,
        
        ShortAnswer: data.ShortAnswer ? {
          time: data.ShortAnswer.time || 0,
          attemptsAllowed: data.ShortAnswer.attemptsAllowed || 0,
          question: data.ShortAnswer.question || '',
          answer: data.ShortAnswer.answer || '',
          caseSensitive: data.ShortAnswer.caseSensitive || false
        } : undefined,
        
        status: data.status || 'active',
        createdAt: data.createdAt || Date.now(),
        updatedAt: data.updatedAt || data.createdAt || Date.now()
      };
    } catch (error) {
      console.error('Error loading test:', error);
      throw error;
    }
  }

  formatDate(timestamp: number): string {
    if (!timestamp) return 'Not available';
    return new Date(timestamp).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  backToTests(): void {
    localStorage.removeItem('currentTestId');
    this.dashboard.onSectionSelected('test-list');
  }

  changeActiveLevel(gameType: string, level: string): void {
    const typedLevel = level as 'easy' | 'medium' | 'hard';
    
    if (this.test) {
      if (gameType === 'findcomposition' && this.test.findcomposition) {
        this.test.findcomposition.activeLevel = typedLevel;
      } else if (gameType === 'WritetheFollowingNumberinLetters' && this.test.WritetheFollowingNumberinLetters) {
        this.test.WritetheFollowingNumberinLetters.activeLevel = typedLevel;
      } else if (gameType === 'IdentifthUnitsTensHundredsandThousands' && this.test.IdentifthUnitsTensHundredsandThousands) {
        this.test.IdentifthUnitsTensHundredsandThousands.activeLevel = typedLevel;
      }
    }
  }

  editTest(): void {
    if (this.test) {
      localStorage.setItem('editTestId', this.test.id);
      this.dashboard.onSectionSelected('edit-test');
    }
  }

  exportToPdf(): void {
    if (!this.test) return;
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    doc.setFontSize(22);
    doc.setTextColor(66, 133, 244);
    doc.text(this.test.title.ar || 'Test Details', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(this.test.description.ar || 'No description available', pageWidth / 2, 30, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Test Information:', 20, 45);
    
    doc.setFontSize(12);
    doc.text(`ID: ${this.test.id}`, 20, 55);
    doc.text(`Class: ${this.test.class}`, 20, 65);
    doc.text(`Status: ${this.test.status}`, 20, 75);
    doc.text(`Created: ${this.formatDate(this.test.createdAt)}`, 20, 85);
    doc.text(`Updated: ${this.formatDate(this.test.updatedAt)}`, 20, 95);
    doc.text(`Number of Students: ${this.test.students ? this.test.students.length : 0}`, 20, 105);
    
    let yPosition = 125;
    
    if (this.test.findcomposition) {
      doc.setFontSize(14);
      doc.setTextColor(66, 133, 244);
      doc.text('Find Composition Exercise', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Active Level: ${this.test.findcomposition.activeLevel}`, 30, yPosition);
      yPosition += 10;
      
      const activeLevel = this.test.findcomposition[this.test.findcomposition.activeLevel];
      doc.text(`Number: ${activeLevel.number}`, 30, yPosition);
      yPosition += 10;
      doc.text(`Solution: ${activeLevel.solution.join(', ')}`, 30, yPosition);
      yPosition += 10;
      doc.text(`Time: ${activeLevel.time} seconds`, 30, yPosition);
      yPosition += 10;
      doc.text(`Attempts Allowed: ${activeLevel.attemptsAllowed}`, 30, yPosition);
      yPosition += 20;
    }
    
    if (this.test.WritetheFollowingNumberinLetters) {
      doc.setFontSize(14);
      doc.setTextColor(66, 133, 244);
      doc.text('Write Numbers in Letters Exercise', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Active Level: ${this.test.WritetheFollowingNumberinLetters.activeLevel}`, 30, yPosition);
      yPosition += 10;
      
      const activeLevel = this.test.WritetheFollowingNumberinLetters[this.test.WritetheFollowingNumberinLetters.activeLevel];
      doc.text(`Number: ${activeLevel.number}`, 30, yPosition);
      yPosition += 10;
      doc.text(`Solution: ${activeLevel.solution.join(', ')}`, 30, yPosition);
      yPosition += 10;
      doc.text(`Time: ${activeLevel.time} seconds`, 30, yPosition);
      yPosition += 10;
      doc.text(`Attempts Allowed: ${activeLevel.attemptsAllowed}`, 30, yPosition);
      yPosition += 20;
    }
    
    if (this.test.IdentifthUnitsTensHundredsandThousands) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(66, 133, 244);
      doc.text('Place Value Identification Exercise', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Active Level: ${this.test.IdentifthUnitsTensHundredsandThousands.activeLevel}`, 30, yPosition);
      yPosition += 10;
      
      const activeLevel = this.test.IdentifthUnitsTensHundredsandThousands[this.test.IdentifthUnitsTensHundredsandThousands.activeLevel];
      doc.text(`Number: ${activeLevel.number}`, 30, yPosition);
      yPosition += 10;
      doc.text(`Solution:`, 30, yPosition);
      yPosition += 10;
      doc.text(`  Units: ${activeLevel.solution.units}`, 40, yPosition);
      yPosition += 10;
      doc.text(`  Tens: ${activeLevel.solution.tens}`, 40, yPosition);
      yPosition += 10;
      doc.text(`  Hundreds: ${activeLevel.solution.hundreds}`, 40, yPosition);
      yPosition += 10;
      doc.text(`  Thousands: ${activeLevel.solution.thousands}`, 40, yPosition);
      yPosition += 10;
      doc.text(`Time: ${activeLevel.time} seconds`, 30, yPosition);
      yPosition += 10;
      doc.text(`Attempts Allowed: ${activeLevel.attemptsAllowed}`, 30, yPosition);
    }
    
    doc.save(`test_${this.test.id}.pdf`);
  }
}
