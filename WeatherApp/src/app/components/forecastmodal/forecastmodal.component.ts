import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeatherData } from '../../models/WeatherData.model';
import { datesData } from '../../models/datesData.model';
import { TranslateModule } from '@ngx-translate/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-forecastmodal',
  standalone: true,
  imports: [TranslateModule, NgOptimizedImage],
  templateUrl: './forecastmodal.component.html',
  styleUrl: './forecastmodal.component.scss'
})
export class ForecastmodalComponent {
  @Input() forecastData: datesData[] = [];
  @Output() close = new EventEmitter<void>();

  getDayName(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}
