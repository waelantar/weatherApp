import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { WeatherService } from '../../services/weather/weather.service';
import { LandingPageComponent } from './landing-page.component';
import { WeatherData } from '../../models/WeatherData.model';
import { AddCityComponent } from "../../components/shared/add-city/add-city.component";
import { TranslateModule } from '@ngx-translate/core';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Creating spies for dependencies
    mockWeatherService = jasmine.createSpyObj('WeatherService', [
      'getCurrentWeather',
      'addCityToLocalStorage',
      'getCitiesFromLocalStorage'
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Setting up TestBed
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), AddCityComponent,LandingPageComponent],
      providers: [
        { provide: WeatherService, useValue: mockWeatherService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the landing page component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a city and update the cities array', () => {
    const mockCity = 'London';
    const mockWeatherData: WeatherData = {
      city: 'London',
      temperature: 20,
      condition: 'Sunny',
      icon:""
    };

    mockWeatherService.getCurrentWeather.and.returnValue(of(mockWeatherData));
    mockWeatherService.getCitiesFromLocalStorage.and.returnValue([mockWeatherData]);

    component.addCity(mockCity);

    expect(mockWeatherService.getCurrentWeather).toHaveBeenCalledWith(mockCity);
    expect(component.cities).toContain(mockWeatherData);
    expect(mockWeatherService.addCityToLocalStorage).toHaveBeenCalledWith(mockWeatherData);
    expect(component.cities.length).toBe(1);
  });

  it('should navigate to /dashboard if cities array is not empty after adding a city', () => {
    const mockCity = 'Paris';
    const mockWeatherData: WeatherData = {
      city: 'Paris',
      temperature: 25,
      condition: 'Cloudy',
      icon:""
    };

    mockWeatherService.getCurrentWeather.and.returnValue(of(mockWeatherData));
    mockWeatherService.getCitiesFromLocalStorage.and.returnValue([mockWeatherData]);

    component.addCity(mockCity);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should not navigate to /dashboard if cities array remains empty', () => {
    const mockCity = 'NonExistentCity';
    mockWeatherService.getCurrentWeather.and.returnValue(of());
    mockWeatherService.getCitiesFromLocalStorage.and.returnValue([]);

    component.addCity(mockCity);

    expect(mockRouter.navigate).not.toHaveBeenCalledWith(['/dashboard']);
  });
});
