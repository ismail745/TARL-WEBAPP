import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { LanguageService } from '../../services/language.service';

type Language = 'en' | 'ar';

type TranslationKey = 
  | 'home'
  | 'results'
  | 'profile'
  | 'logout'
  | 'dashboard'
  | 'childrenProgress'
  | 'settings';

@Component({
  selector: 'app-parent-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parent-sidebar.component.html',
  styleUrl: './parent-sidebar.component.css'
})

export class ParentSidebarComponent {
  private translations: Record<Language, Record<TranslationKey, string>> = {
    'en': {
      'home': 'Home',
      'results': 'Results',
      'profile': 'Profile',
      'logout': 'Logout',
      'dashboard': 'Dashboard',
      'childrenProgress': 'Children Progress',
      'settings': 'Settings'
    },
    'ar': {
      'home': 'الرئيسية',
      'results': 'النتائج',
      'profile': 'الملف الشخصي',
      'logout': 'تسجيل الخروج',
      'dashboard': 'لوحة التحكم',
      'childrenProgress': 'تقدم الأطفال',
      'settings': 'الإعدادات'
    }
  };

  userRole: string | null = null;
  selectedSection: string = 'parent-home';

  @Output() sectionSelected = new EventEmitter<string>();

  constructor(
    private auth: AuthService, 
    private router: Router,
    private langService: LanguageService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url.startsWith('/child-result')) {
        this.selectedSection = 'child-result';
      } else if (event.url.startsWith('/parent-home')) {
        this.selectedSection = 'parent-home';
      }
    });
  }

  ngOnInit() {
    this.auth.getCurrentUserWithRole().subscribe(user => {
      if (user) this.userRole = user.role;
    });
  }

  select(section: string) {
    this.selectedSection = section;
    this.sectionSelected.emit(section);
  }

  getTranslation(key: TranslationKey): string {
    const currentLang = this.langService.getCurrentLanguage() as Language;
    return this.translations[currentLang]?.[key] || key;
  }
}