import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { WeatherData } from '../../models/WeatherData.model';
import { WeatherService } from '../../services/weather.service';
import { FormsModule } from '@angular/forms';
import { AddCityComponent } from "../../components/add-city/add-city.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TranslateModule, FormsModule, AddCityComponent],
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
      this.filterCities();
    });
  }

  removeCity(city: WeatherData) {
    this.cities = this.cities.filter(c => c.city !== city.city);
    this.weatherService.removeCityFromLocalStorage(city);
    this.filterCities();
  }

  filterCities() {
    if (this.searchQuery.trim()) {
      this.filteredCities = this.cities.filter(city =>
        city.city.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredCities = [...this.cities];
    }
  }
  
}
