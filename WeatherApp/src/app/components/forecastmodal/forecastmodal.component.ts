import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeatherData } from '../../models/WeatherData.model';
import { datesData } from '../../models/datesData.model';

@Component({
  selector: 'app-forecastmodal',
  standalone: true,
  imports: [],
  templateUrl: './forecastmodal.component.html',
  styleUrl: './forecastmodal.component.scss'
})
export class ForecastmodalComponent {
  @Input() forecastData: datesData[] = [];
  @Output() close = new EventEmitter<void>();
}
