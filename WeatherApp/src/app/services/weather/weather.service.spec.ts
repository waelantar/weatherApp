import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
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

  it('should be created', fakeAsync(() => {
    expect(service).toBeTruthy();
    const req = httpMock.expectOne('assets/cities500.json');
    req.flush([]);
    tick();
  }));

  it('should fetch current weather for a city', fakeAsync(() => {
    const cityName = 'London';
    const mockResponse = {
      name: 'London',
      main: { temp: 15 },
      weather: [{ description: 'clear sky', icon: '01d' }]
    };

    // Handle the initial cities request
    const citiesReq = httpMock.expectOne('assets/cities500.json');
    citiesReq.flush([]);
    tick();

    service.getCurrentWeather(cityName).subscribe((data: WeatherData) => {
      expect(data.city).toBe('London');
      expect(data.temperature).toBe(15);
      expect(data.condition).toBe('clear sky');
      expect(data.icon).toBe('01d');
    });

    const req = httpMock.expectOne(`${API_ENDPOINTS.WEATHER}?q=${cityName}&appid=${environment.apiKey}&units=metric`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    tick();
  }));



  

it('should initialize cities and handle errors', fakeAsync(() => {
    const mockCities = [{ name: 'TestCity' }];
    
    const req = httpMock.expectOne('assets/cities500.json');
    req.flush(mockCities);
    tick();
    
    service.getAllCities().subscribe(cities => {
      expect(cities).toEqual(mockCities);
    });
  }));

  it('should add a city to localStorage', fakeAsync(() => {
    const city: WeatherData = {
      city: 'Berlin',
      temperature: 20,
      condition: 'sunny',
      icon: '01d'
    };
    
    // Handle the initial cities request
    const citiesReq = httpMock.expectOne('assets/cities500.json');
    citiesReq.flush([]);
    tick();

    spyOn(localStorage, 'setItem');
    service.addCityToLocalStorage(city);
    
    expect(localStorage.setItem).toHaveBeenCalledWith(service['citiesKey'], JSON.stringify([city]));
  }));

  it('should get cities from localStorage', fakeAsync(() => {
    const cities = [
      { city: 'Madrid', temperature: 25, condition: 'hot', icon: '01d' }
    ];
    
    // Handle the initial cities request
    const citiesReq = httpMock.expectOne('assets/cities500.json');
    citiesReq.flush([]);
    tick();

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(cities));
    const result = service.getCitiesFromLocalStorage();
    
    expect(result.length).toBe(1);
    expect(result[0].city).toBe('Madrid');
    expect(result[0].temperature).toBe(25);
  }));

  it('should remove a city from localStorage', fakeAsync(() => {
    const city: WeatherData = {
      city: 'Rome',
      temperature: 22,
      condition: 'clear sky',
      icon: '01d'
    };
    
    const cities = [city, { city: 'Paris', temperature: 18, condition: 'cloudy', icon: '02d' }];
    
    // Handle the initial cities request
    const citiesReq = httpMock.expectOne('assets/cities500.json');
    citiesReq.flush([]);
    tick();

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(cities));
    spyOn(localStorage, 'setItem');
    
    service.removeCityFromLocalStorage(city);
    
    expect(localStorage.setItem).toHaveBeenCalledWith(service['citiesKey'], JSON.stringify([{ city: 'Paris', temperature: 18, condition: 'cloudy', icon: '02d' }]));
  }));
});