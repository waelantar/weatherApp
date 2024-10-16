import { Component } from '@angular/core';
import { LanguageService } from '../../../services/language/language.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  constructor(private languageService: LanguageService) {}

  isDropdownOpen = false;

  

  get currentLanguage(): string {
    return this.languageService.getCurrentLanguage();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectLanguage(language: string): void {
    this.languageService.setLanguage(language);
    this.isDropdownOpen = false;
  }
  }

