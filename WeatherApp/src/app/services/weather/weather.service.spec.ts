import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from '../weather.service';
import { WeatherData } from '../../models/WeatherData.model';
import { environment } from '../../../enviroments/enviroment';
import { API_ENDPOINTS } from '../../constants/api-endpoints.constant';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch current weather for a city', () => {
    const cityName = 'London';
    const mockResponse = {
      name: 'London',
      main: { temp: 15 },
      weather: [{ description: 'clear sky', icon: '01d' }]
    };

    service.getCurrentWeather(cityName).subscribe((data: WeatherData) => {
      expect(data.city).toBe('London');
      expect(data.temperature).toBe(15);
      expect(data.condition).toBe('clear sky');
      expect(data.icon).toBe('01d');
    });

    const req = httpMock.expectOne(`${API_ENDPOINTS.WEATHER}?q=${cityName}&appid=${environment.apiKey}&units=metric`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch weather forecast for a city', () => {
    const cityName = 'Paris';
    const mockResponse = {
      list: [
        {
          dt_txt: '2024-10-15 15:00:00',
          main: { temp: 18 },
          weather: [{ description: 'cloudy', icon: '02d' }]
        }
      ]
    };

    service.getForecast(cityName).subscribe((data: WeatherData[]) => {
      expect(data.length).toBe(1);
      expect(data[0].temperature).toBe(18);
      expect(data[0].condition).toBe('cloudy');
      expect(data[0].icon).toBe('02d');
    });

    const req = httpMock.expectOne(`${API_ENDPOINTS.FORECAST}?q=${cityName}&appid=${environment.apiKey}&units=metric`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error while fetching weather data', () => {
    const cityName = 'UnknownCity';

    service.getCurrentWeather(cityName).subscribe(
      () => fail('expected an error, not weather data'),
      (error: string) => {
        expect(error).toBe('Something went wrong; please try again later.');
      }
    );

    const req = httpMock.expectOne(`${API_ENDPOINTS.WEATHER}?q=${cityName}&appid=${environment.apiKey}&units=metric`);
    req.flush('Error fetching data', { status: 500, statusText: 'Server Error' });
  });

  it('should add a city to localStorage', () => {
    const city: WeatherData = {
      city: 'Berlin',
      temperature: 20,
      condition: 'sunny',
      icon: '01d'
    };
    
    spyOn(localStorage, 'setItem');
    service.addCityToLocalStorage(city);
    
    expect(localStorage.setItem).toHaveBeenCalledWith(service['citiesKey'], JSON.stringify([city]));
  });

  it('should get cities from localStorage', () => {
    const cities = [
      { city: 'Madrid', temperature: 25, condition: 'hot', icon: '01d' }
    ];
    
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(cities));
    const result = service.getCitiesFromLocalStorage();
    
    expect(result.length).toBe(1);
    expect(result[0].city).toBe('Madrid');
    expect(result[0].temperature).toBe(25);
  });

  it('should remove a city from localStorage', () => {
    const city: WeatherData = {
      city: 'Rome',
      temperature: 22,
      condition: 'clear sky',
      icon: '01d'
    };
    
    const cities = [city, { city: 'Paris', temperature: 18, condition: 'cloudy', icon: '02d' }];
    
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(cities));
    spyOn(localStorage, 'setItem');
    
    service.removeCityFromLocalStorage(city);
    
    expect(localStorage.setItem).toHaveBeenCalledWith(service['citiesKey'], JSON.stringify([{ city: 'Paris', temperature: 18, condition: 'cloudy', icon: '02d' }]));
  });
});
