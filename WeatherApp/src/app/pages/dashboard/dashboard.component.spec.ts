import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { WeatherService } from '../../services/weather/weather.service';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { WeatherData } from '../../models/WeatherData.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { datesData } from '../../models/datesData.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    weatherServiceMock = jasmine.createSpyObj('WeatherService', ['getCitiesFromLocalStorage', 'getCurrentWeather', 'addCityToLocalStorage', 'removeCityFromLocalStorage', 'getForecast']);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, TranslateModule.forRoot()],
      providers: [
        { provide: WeatherService, useValue: weatherServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // This will ignore unknown elements and attributes
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 

  it('should add a city', fakeAsync(() => {
    const newCity: WeatherData = { city: 'Berlin', temperature: 15, condition: 'Rainy', icon: '10d' };
    weatherServiceMock.getCurrentWeather.and.returnValue(of(newCity));
    weatherServiceMock.getCitiesFromLocalStorage.and.returnValue([newCity]);

    component.addCity('Berlin');
    tick();

    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledWith('Berlin');
    expect(weatherServiceMock.addCityToLocalStorage).toHaveBeenCalledWith(newCity);
    expect(component.cities).toContain(newCity);
  }));

  it('should remove a city', () => {
    const cityToRemove: WeatherData = { city: 'London', temperature: 20, condition: 'Sunny', icon: '01d' };
    component.cities = [cityToRemove, { city: 'Paris', temperature: 18, condition: 'Cloudy', icon: '02d' }];
    weatherServiceMock.getCitiesFromLocalStorage.and.returnValue([{ city: 'Paris', temperature: 18, condition: 'Cloudy', icon: '02d' }]);

    component.removeCity(cityToRemove);

    expect(weatherServiceMock.removeCityFromLocalStorage).toHaveBeenCalledWith(cityToRemove);
    expect(component.cities).not.toContain(cityToRemove);
  });

  it('should handle city selection for forecast', fakeAsync(() => {
    const selectedCity: WeatherData = { city: 'London', temperature: 20, condition: 'Sunny', icon: '01d' };
    const mockForecast: datesData[] = [{
        date: new Date(Date.now()), temperature: 22, condition: 'Sunny', icon: '01d',
        city: 'London'
    }];
    weatherServiceMock.getForecast.and.returnValue(of(mockForecast));

    component.handleCitySelection(selectedCity);
    tick();

    expect(component.showModal).toBeTrue();
    expect(weatherServiceMock.getForecast).toHaveBeenCalledWith('London');
    expect(component.selectedCityForecast).toEqual(mockForecast);
  }));
});