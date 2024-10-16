import { Component, HostListener } from '@angular/core';
import { LanguageService } from '../../../services/language/language.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  animations: [
    trigger('slideIn', [
      state('void', style({ transform: 'translateY(-100%)', opacity: 0 })),
      transition(':enter', [
        animate(
          '500ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class NavComponent {
  constructor(private languageService: LanguageService) {}

  isDropdownOpen = false;
  isScrolled = false;

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
