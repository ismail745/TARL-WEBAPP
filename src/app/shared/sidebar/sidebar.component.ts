import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  userRole: string | null = null;
  selectedSection: string = 'teacher-home';

  expandedSections: { [key: string]: boolean } = {
    students: false,
    tests: false,
    statistics: false
  };

  @Output() sectionSelected = new EventEmitter<string>();

  currentLanguage: string;

  translations: Record<string, Record<string, string>> = {
    en: {
      dashboard: 'Dashboard',
      home: 'Home',
      students: 'Students',
      registerStudent: 'Register Student',
      studentList: 'Student List',
      games: 'Games',
      createGame: 'Create Game',
      gameList: 'Game List',
      statistics: 'Statistics',
      parents: 'Parents',
      approvals: 'Approvals',
      settings: 'Settings',
      performance: 'Performance',
      activities: 'Activities',
      skillAnalysis: 'Skill Analysis',
      timeAnalysis: 'Time Analysis'
    },
    ar: {
      dashboard: 'لوحة التحكم',
      home: 'الرئيسية',
      students: 'الطلاب',
      registerStudent: 'تسجيل طالب',
      studentList: 'قائمة الطلاب',
      games: 'الألعاب',
      createGame: 'إنشاء لعبة',
      gameList: 'قائمة الألعاب',
      statistics: 'الإحصائيات',
      parents: 'أولياء الأمور',
      parentList: 'قائمة أولياء الأمور',
      approvals: 'الموافقات',
      settings: 'الإعدادات',
      performance: 'الأداء',
      activities: 'الأنشطة',
      skillAnalysis: 'تحليل المهارات',
      timeAnalysis: 'تحليل الوقت',
      overallPerformance: 'الأداء العام',
      studentProgress: 'تقدم الطالب',
      gameStatistics: 'إحصائيات الألعاب',
      teacherDashboard: 'لوحة تحكم المعلم',
      testStatistics: 'إحصائيات الاختبارات'
    }
  };

  constructor(
    private auth: AuthService, 
    private router: Router,
    private languageService: LanguageService
  ) {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  ngOnInit() {
    this.auth.getCurrentUserWithRole().subscribe(user => {
      if (user) this.userRole = user.role;
    });

    this.setInitialExpandedSection();
  }

  toggleSection(section: 'students' | 'tests' | 'statistics') {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  select(section: string) {
    this.selectedSection = section;
    this.sectionSelected.emit(section);
    
    switch(section) {
      case 'teacher-home':
        this.router.navigate(['/dashboard']);
        break;
      case 'student-stats':
        this.router.navigate(['/student-stats']);
        break;
      case 'game-stats':
        this.router.navigate(['/game-stats']);
        break;
      case 'student-register':
      case 'student-list':
      case 'test-create':
      case 'test-list':
      case 'parent-list':
      default:
        break;
    }
  }

  private setInitialExpandedSection() {
    if (this.selectedSection === 'student-register' || 
        this.selectedSection === 'student-list' ||
        this.selectedSection === 'student-stats') {
      this.expandedSections['students'] = true;
    } else if (this.selectedSection === 'test-create' || 
              this.selectedSection === 'test-list') {
      this.expandedSections['tests'] = true;
    } else if (this.selectedSection === 'teacher-home' || 
              this.selectedSection === 'student-stats' ||
              this.selectedSection === 'game-stats') {
      this.expandedSections['statistics'] = true;
    }
  }

  getTranslation(key: string): string {
    return this.translations[this.currentLanguage][key] || key;
  }
}