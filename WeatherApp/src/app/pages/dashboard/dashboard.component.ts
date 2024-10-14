import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { WeatherData } from '../../models/WeatherData.model';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  cities: WeatherData[] = [];
  filteredCities: WeatherData[] = [];
  searchQuery: string = '';
  allCities: any[] = [];

  constructor(private weatherService: WeatherService) { } 
   ngOnInit(): void {
    this.filteredCities = [...this.cities];  
   }
    
  
}
