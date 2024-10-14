import { Component, EventEmitter, Output } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-city',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.scss'
})
export class AddCityComponent {
  cityName: string = '';
  searchResults: any[] = [];

  @Output() cityAdded = new EventEmitter<string>();

  constructor(private weatherService: WeatherService) { }

  searchCities() {
    if (this.cityName.trim()) {
      this.weatherService.getAllCities().subscribe(data => {
        this.searchResults = data.filter(city =>
          city.name.toLowerCase().startsWith(this.cityName.toLowerCase())
        );
      });
    } else {
      this.searchResults = [];
    }
  }
  

  addCity(city: string) {
    this.cityAdded.emit(city);
    this.cityName = '';
    this.searchResults = [];
  }
}
