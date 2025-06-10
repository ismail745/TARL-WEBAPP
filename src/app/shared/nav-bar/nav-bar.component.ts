import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Database, ref, get } from '@angular/fire/database';
import { firstValueFrom } from 'rxjs';
import { LanguageService } from '../../services/language.service';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() onSectionSelected?: (section: string) => void;

  userMenuOpen = false;
  languageMenuOpen = false;
  isDarkMode = false;
  currentLanguage = 'en';
  currentUser: User | null = null;
  loading = true;
  error = '';

  languages = [
    { code: 'en', name: () => this.getTranslation('english') },
    { code: 'ar', name: () => this.getTranslation('arabic') }
  ];

  translations: Record<string, Record<string, string>> = {
    en: {
      profile: 'Profile',
      changePassword: 'Change Password',
      logout: 'Logout',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      english: 'English',
      arabic: 'Arabic',
      clinic: 'Clinic',
      guest: 'Guest'
    },
    ar: {
      profile: 'الملف الشخصي',
      changePassword: 'تغيير كلمة المرور',
      logout: 'تسجيل الخروج',
      darkMode: 'الوضع الليلي',
      lightMode: 'الوضع النهاري',
      english: 'الإنجليزية',
      arabic: 'العربية',
      clinic: 'العيادة',
      guest: 'زائر'
    }
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private db: Database,
    private languageService: LanguageService
  ) {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  viewProfile(): void {
    if (this.onSectionSelected) {
      this.onSectionSelected('user-profile');
    } else {
      this.router.navigate(['/user-profile']); 
    }
    this.userMenuOpen = false;
  }

  async ngOnInit() {
    try {
      const user = await firstValueFrom(this.auth.getCurrentUserWithRole());
      if (!user?.uid) {
        this.loading = false;
        return;
      }

      const userRef = ref(this.db, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        this.currentUser = snapshot.val();
      }
    } catch (error) {
      this.error = 'Failed to load user data';
    } finally {
      this.loading = false;
    }
  }

  getUserDisplayName(): string {
    return this.currentUser
      ? `${this.currentUser.firstName} ${this.currentUser.lastName}`
      : this.getTranslation('guest');
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
    this.languageMenuOpen = false;
  }

  toggleLanguageMenu(): void {
    this.languageMenuOpen = !this.languageMenuOpen;
    this.userMenuOpen = false;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark');
  }

  changeLanguage(code: string): void {
    this.currentLanguage = code;
    this.languageService.setLanguage(code);
    this.languageMenuOpen = false;
  }

  async changePassword(): Promise<void> {
    alert('A password reset link has been sent to your email.');
    this.auth.resetPassword(this.currentUser?.email || '');
  }

  async logout(): Promise<void> {
    try {
      await this.auth.logout();
      this.router.navigate(['/login']);
    } catch (error) {}
  }

  closeMenus(): void {
    this.userMenuOpen = false;
    this.languageMenuOpen = false;
  }

  getTranslation(key: string): string {
    return this.translations[this.currentLanguage][key] || key;
  }
}
