import { Component, OnInit, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Database, ref, get, remove, set } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TestService } from '../../services/test.service';

interface TeacherClass {
  classId: string;
  className: string;
}

interface Test {
  id: string;
  idTeacher: string;
  title: {
    ar: string;
    fr: string;
    en: string;
  };
  description: {
    ar: string;
    fr: string;
    en: string;
  };
  class: string;
  students: string[];
  games: string[];
  createdAt: number;
  updatedAt?: number;
  status: 'active' | 'inactive';
  isSent?: boolean;
}

@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  tests: Test[] = [];
  filteredTests: Test[] = [];
  selectedGrade = '';
  searchQuery = '';
  sortField = 'createdAt';
  sortDirection = 'desc';
  loading = false;
  error = '';
  success = '';
  availableClasses: TeacherClass[] = [];
  
  gameTypes: {[key: string]: string} = {
    'findcomposition': 'Find Composition',
    'WritetheFollowingNumberinLetters': 'Write Number in Letters',
    'IdentifthUnitsTensHundredsandThousands': 'Identify Places',
    'MultipleChoice': 'Multiple Choice',
    'TrueFalse': 'True/False',
    'ShortAnswer': 'Short Answer'
  };

  @Output() sectionSelected = new EventEmitter<string>();
  
  public page = inject(DashboardComponent);
  private testService = inject(TestService);

  constructor(
    private db: Database,
    private auth: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      await this.loadTeacherClasses();
      await this.loadTests();
    } catch (error) {
      
      this.error = 'Failed to initialize component';
    }
  }

  private async loadTeacherClasses() {
    try {
      const user = await firstValueFrom(this.auth.getCurrentUserWithRole());
      if (!user?.uid) {
        this.router.navigate(['/login']);
        return;
      }

      const teacherRef = ref(this.db, `users/${user.uid}`);
      const snapshot = await get(teacherRef);
      
      if (snapshot.exists()) {
        const teacherData = snapshot.val();
        if (Array.isArray(teacherData.schoolGrades)) {
          this.availableClasses = teacherData.schoolGrades;
        }
      }
    } catch (error) {
      
      throw error;
    }
  }

  private async loadTests() {
    try {
      this.loading = true;
      this.error = '';
      
      const user = await firstValueFrom(this.auth.getCurrentUserWithRole());
      if (!user?.uid) {
        this.router.navigate(['/login']);
        return;
      }

      const testsRef = ref(this.db, 'tests');
      const snapshot = await get(testsRef);
      
      if (snapshot.exists()) {
        const testsData = snapshot.val();
        this.tests = Object.entries(testsData)
          .map(([id, data]) => ({
            id,
            ...(data as any)
          }))
          .filter(test => test.idTeacher === user.uid)
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

        this.applyFilter();
      } else {
        this.tests = [];
        this.filteredTests = [];
      }
    } catch (error) {
      
      this.error = 'Failed to load tests. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  applyFilter() {
    if (!this.tests) return;
    
    const query = this.searchQuery?.toLowerCase().trim() || '';
    
    this.filteredTests = this.tests.filter(test => {
      // Grade filter
      const gradeMatch = !this.selectedGrade || test.class === this.selectedGrade;
      
      // If no search query, only apply grade filter
      if (!query) {
        return gradeMatch;
      }
      
      // Search in titles across all languages
      const titleMatch = Object.values(test.title || {}).some(text => 
        text?.toLowerCase().includes(query)
      );
      
      // Search in descriptions across all languages
      const descriptionMatch = Object.values(test.description || {}).some(text => 
        text?.toLowerCase().includes(query)
      );
      
      // Search in game types
      const gameMatch = (test.games || []).some(game => {
        const gameType = game?.toLowerCase() || '';
        const displayName = (this.gameTypes[game] || '').toLowerCase();
        return gameType.includes(query) || displayName.includes(query);
      });

      return gradeMatch && (titleMatch || descriptionMatch || gameMatch);
    });
    
    this.sortTests();
  }
  
  sortTests() {
    this.filteredTests.sort((a, b) => {
      let valueA, valueB;
      
      switch(this.sortField) {
        case 'title':
          valueA = a.title.en.toLowerCase();
          valueB = b.title.en.toLowerCase();
          break;
        case 'grade':
          valueA = a.class;
          valueB = b.class;
          break;
        case 'games':
          valueA = a.games.length;
          valueB = b.games.length;
          break;
        case 'createdAt':
        default:
          valueA = a.createdAt || 0;
          valueB = b.createdAt || 0;
          break;
      }
      
      const direction = this.sortDirection === 'asc' ? 1 : -1;
      
      if (valueA < valueB) return -1 * direction;
      if (valueA > valueB) return 1 * direction;
      return 0;
    });
  }
  
  changeSortField(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'desc';
    }
    this.sortTests();
  }
  
  resetFilters() {
    this.selectedGrade = '';
    this.searchQuery = '';
    this.sortField = 'createdAt';
    this.sortDirection = 'desc';
    this.applyFilter();
  }

  async refreshTests() {
    await this.loadTests();
  }

  viewTest(testId: string) {
    this.testService.setTestToView(testId);
    this.page.onSectionSelected('view-test');
  }

  editTest(testId: string) {
    this.testService.setTestToView(testId);
    this.page.onSectionSelected('edit-test');
  }

  async deleteTest(testId: string) {
    if (!confirm('Are you sure you want to delete this test?')) return;

    try {
      this.loading = true;
      this.error = '';
      
      await remove(ref(this.db, `tests/${testId}`));
      this.tests = this.tests.filter(test => test.id !== testId);
      this.applyFilter();
      
      this.success = 'Test deleted successfully';
      setTimeout(() => this.success = '', 3000);
    } catch (error) {
      
      this.error = 'Failed to delete test';
    } finally {
      this.loading = false;
    }
  }

  async sendTest(testId: string) {
    try {
      this.loading = true;
      this.error = '';
      
      await set(ref(this.db, `tests/${testId}/isSent`), true);
      
      const index = this.tests.findIndex(test => test.id === testId);
      if (index !== -1) {
        this.tests[index].isSent = true;
        this.applyFilter();
      }
      
      this.success = 'Test sent successfully';
      setTimeout(() => this.success = '', 3000);
    } catch (error) {
      
      this.error = 'Failed to send test';
    } finally {
      this.loading = false;
    }
  }

  async cancelSend(testId: string) {
    try {
      this.loading = true;
      this.error = '';
      
      await set(ref(this.db, `tests/${testId}/isSent`), false);
      
      const index = this.tests.findIndex(test => test.id === testId);
      if (index !== -1) {
        this.tests[index].isSent = false;
        this.applyFilter();
      }
      
      this.success = 'Test send cancelled';
      setTimeout(() => this.success = '', 3000);
    } catch (error) {
      
      this.error = 'Failed to cancel test send';
    } finally {
      this.loading = false;
    }
  }

  getGameName(game: string): string {
    return this.gameTypes[game] || game;
  }

  formatDate(timestamp: number): string {
    if (!timestamp) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  }

  clearMessages() {
    this.error = '';
    this.success = '';
  }
}