import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor() {}

  setLanguage(lang: string): void {
    this.currentLanguageSubject.next(lang);
    localStorage.setItem('appLanguage', lang);
    this.updateDocumentLanguage(lang);
  }

  getCurrentLanguage(): string {
    return localStorage.getItem('appLanguage') || 'en';
  }

  private updateDocumentLanguage(lang: string): void {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  initializeLanguage(): void {
    const savedLang = this.getCurrentLanguage();
    this.currentLanguageSubject.next(savedLang);
    this.updateDocumentLanguage(savedLang);
  }
}
