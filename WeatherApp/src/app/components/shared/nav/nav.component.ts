import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  currentLanguage: string = 'En'; // Default language

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'En' ? 'It' : 'En';
    // Additional logic to change the app language could be added here
    // For example, using a translation service
  }
}
