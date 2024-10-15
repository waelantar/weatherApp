import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavComponent } from './components/shared/nav/nav.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageService } from './services/language/language.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavComponent,TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'en';
  private languageSubscription: Subscription | undefined;

  constructor(private translateService:TranslateService,private languageService: LanguageService) {}

  ngOnInit() {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      lang => {
        this.currentLanguage = lang;
        const userLang=this.currentLanguage;
        this.translateService.setDefaultLang(userLang);
        this.translateService.use(userLang);
      }
    );
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }


  title = 'WeatherApp';
  /* ngOnInit(): void {
    // Check if window and localStorage are available
    if (typeof window !== 'undefined' && localStorage) {
      // Access localStorage safely
      const storedCities = localStorage.getItem('cities');
      
      if (storedCities && JSON.parse(storedCities).length > 0) {
        // If cities are present, navigate to the dashboard
        this.router.navigate(['/dashboard']);
      } else {
        // If no cities found, navigate to the landing page
        this.router.navigate(['/']);
      }
    } else {
      // If localStorage is not available, navigate to the landing page
      this.router.navigate(['/']);
    }
  } */
}