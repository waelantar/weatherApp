import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { WeatherService } from '../../../services/weather/weather.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { AddCity } from '../../../constants/add-city.constant';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-city',
  standalone: true,
  imports: [CommonModule,FormsModule,TranslateModule],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.scss'
})
export class AddCityComponent implements OnInit,OnChanges{
  cityName: string = '';
  searchResults: any[] = [];
  allCities:any[]=[]
  addCitySearch:string=AddCity.searchForCity;
  citySearch:string="";
  animatedPlaceholder = '';
  @Output() cityAdded = new EventEmitter<string>();
  searchControl = new FormControl();

  constructor(private weatherService: WeatherService,private translateService:TranslateService) { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['citySearch']) {
      this.translateService.get(this.addCitySearch).subscribe((translated: string) => {
        this.citySearch = translated;
        this.typePlaceholder();
      });
    }
  }
  
  ngOnInit(): void {
    this.weatherService.getAllCities().subscribe(data => {
      this.allCities = data;
    });
  
   
    this.translateService.onLangChange.subscribe(() => {
      this.animatedPlaceholder = "";
      this.citySearch = this.translateService.instant(this.addCitySearch);
      this.typePlaceholder();
    });
  }
  typePlaceholder() {
    let index = 0;
    const speed = 100; // Typing speed in milliseconds
    
    const type = () => {

      if (index < this.citySearch.length) {
        
        this.animatedPlaceholder += this.citySearch.charAt(index);
        index++;
        setTimeout(type, speed);
      }
      
    };

    type();
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
