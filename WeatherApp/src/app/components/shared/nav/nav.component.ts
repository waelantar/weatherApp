import { Component } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  constructor(private languageService: LanguageService) {}

  get currentLanguage(): string {
    return this.languageService.getCurrentLanguage();
  }

  toggleLanguage(): void {
    const newLang = this.currentLanguage === 'en' ? 'it' : 'en';
    this.languageService.setLanguage(newLang);
  }
  }

