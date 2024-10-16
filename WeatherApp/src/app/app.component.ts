import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavComponent } from './components/shared/nav/nav.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageService } from './services/language/language.service';
import { LoadingIndicatorComponent } from "./components/shared/loading-indicator/loading-indicator.component";
import { LoadingService } from './services/loadingIndicator/loading.service';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, TranslateModule, LoadingIndicatorComponent , NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'en';
  private languageSubscription: Subscription | undefined;

  constructor(private translateService:TranslateService,private languageService: LanguageService,private router:Router,private loadingService:LoadingService) {}
  private citiesKey = 'weatherAppCities';

  ngOnInit() {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      lang => {
        this.currentLanguage = lang;
        const userLang=this.currentLanguage;
        this.translateService.setDefaultLang(userLang);
        this.translateService.use(userLang);
      }
    );
    if (typeof window !== 'undefined' && localStorage) {
      const cities = localStorage.getItem(this.citiesKey);
    
      if (cities) {
        const citiesArray = JSON.parse(cities);
    
        if (Array.isArray(citiesArray) && citiesArray.length > 0) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }}

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
 

  title = 'WeatherApp';
 
}