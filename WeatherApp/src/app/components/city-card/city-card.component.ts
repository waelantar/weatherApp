import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { WeatherData } from '../../models/WeatherData.model';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-card.component.html',
  styleUrl: './city-card.component.scss',
  encapsulation: ViewEncapsulation.None,

})
export class CityCardComponent implements OnInit {
  @Input() city: WeatherData = { city: '', temperature: 0, condition: '', icon: '' };
  weatherIcon: any;
  @Output() cityRemoved = new EventEmitter<WeatherData>();
  private overlayOpacity: number = 0.1;
   constructor(public sanitizer: DomSanitizer){

   }
  ngOnInit() {
    this.randomizeOpacity();
    this.getWeatherIcon();

  }
  weatherIcons = {
    cold: '<i class="fas fa-snowflake"></i>',
    moderate: '<i class="fa fa-thermometer-half"></i>',
    hot: '<i class="fas fa-sun"></i>',
};


  // Method to get the appropriate icon based on temperature
  getWeatherIcon():any {
    if (this.city.temperature < 10) {
      return this.weatherIcon = this.sanitizer.bypassSecurityTrustHtml(this.weatherIcons.cold);
    } else if (this.city.temperature >= 10 && this.city.temperature <= 25) {
      return this.weatherIcon = this.sanitizer.bypassSecurityTrustHtml(this.weatherIcons.moderate);
    } else {
      return this.weatherIcon = this.sanitizer.bypassSecurityTrustHtml(this.weatherIcons.hot);
    }
  }
  removeCity() {
    this.cityRemoved.emit(this.city);
  }
  getRandomOpacity(): string {
    return this.overlayOpacity.toString();
  }

  private randomizeOpacity() {
    this.overlayOpacity = Math.random() * 0.2 + 0.05; // Random opacity between 0.05 and 0.25
  }
}
