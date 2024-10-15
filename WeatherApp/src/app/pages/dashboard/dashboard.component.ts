import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { WeatherData } from '../../models/WeatherData.model';
import { WeatherService } from '../../services/weather/weather.service';
import { FormsModule } from '@angular/forms';
import { AddCityComponent } from "../../components/shared/add-city/add-city.component";
import { CityCardComponent } from "../../components/city-card/city-card.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TranslateModule, FormsModule, AddCityComponent, CityCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  cities: WeatherData[] = [];
  filteredCities: WeatherData[] = [];
  searchQuery: string = '';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.cities = this.weatherService.getCitiesFromLocalStorage();
    this.filteredCities = [...this.cities];
  }

  addCity(city: string) {
    this.weatherService.getCurrentWeather(city).subscribe(data => {
      this.cities.push(data);
      this.weatherService.addCityToLocalStorage(data);
      this.cities = this.weatherService.getCitiesFromLocalStorage();

    });
  }

  removeCity(city: WeatherData) {
    this.cities = this.cities.filter(c => c.city !== city.city);
    this.weatherService.removeCityFromLocalStorage(city);
    this.cities = this.weatherService.getCitiesFromLocalStorage();

  }

  
  
}
