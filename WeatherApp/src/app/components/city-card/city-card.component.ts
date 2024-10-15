import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeatherData } from '../../models/WeatherData.model';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [],
  templateUrl: './city-card.component.html',
  styleUrl: './city-card.component.scss'
})
export class CityCardComponent {
  @Input() city: WeatherData = { city: '', temperature: 0, condition: '', icon: '' };

  @Output() cityRemoved = new EventEmitter<WeatherData>();

  removeCity() {
    this.cityRemoved.emit(this.city);
  }
}
