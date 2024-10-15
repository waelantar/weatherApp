import { Component, EventEmitter, Output } from '@angular/core';
import { WeatherService } from '../../../services/weather/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddCity } from '../../../constants/add-city.constant';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-add-city',
  standalone: true,
  imports: [CommonModule,FormsModule,TranslateModule],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.scss'
})
export class AddCityComponent {
  cityName: string = '';
  searchResults: any[] = [];
  addCitySearch:string=AddCity.searchForCity;
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
