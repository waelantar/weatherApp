import { Component } from '@angular/core';
import { AddCityComponent } from "../../components/shared/add-city/add-city.component";
import { WeatherService } from '../../services/weather/weather.service';
import { WeatherData } from '../../models/WeatherData.model';
import { TranslateModule } from '@ngx-translate/core';
import { landingPage } from '../../constants/landing-page.constant';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [AddCityComponent,TranslateModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  cities: WeatherData[] = [];
   title=landingPage.discoverweather;

  constructor(private weatherService: WeatherService,private router:Router) { }
  addCity(city: any) {
    this.weatherService.getCurrentWeather(city).subscribe(data => {
      this.cities.push(data);
      this.weatherService.addCityToLocalStorage(data);
      this.cities = this.weatherService.getCitiesFromLocalStorage();
      if(this.cities.length>0)
      {this.router.navigate(['/dashboard']);}
      
     
    });
  }
}
