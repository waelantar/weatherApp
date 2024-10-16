import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WeatherService } from '../../../services/weather/weather.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { AddCity } from '../../../constants/add-city.constant';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-add-city',
  standalone: true,
  imports: [CommonModule,FormsModule,TranslateModule],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.scss'
})
export class AddCityComponent implements OnInit{
  cityName: string = '';
  searchResults: any[] = [];
  allCities:any[]=[]
  addCitySearch:string=AddCity.searchForCity;
  @Output() cityAdded = new EventEmitter<string>();
  searchControl = new FormControl();

  constructor(private weatherService: WeatherService) { }
  ngOnInit(): void {
    this.weatherService.getAllCities().subscribe(data => {
      this.allCities = data;
    });
  }


  searchCities() {
    if (this.cityName.trim()) {
      // Filter cities that start with the input city name
      const filteredCities = this.allCities.filter(city =>
        city.name.toLowerCase().startsWith(this.cityName.toLowerCase())
      );
  
      // Limit the results to the first 10 cities
      this.searchResults = filteredCities.slice(0, 10);
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
