import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { environment } from '../../../enviroments/enviroment';
import { API_ENDPOINTS } from '../../constants/api-endpoints.constant';
import { WeatherData } from '../../models/WeatherData.model';
import { datesData } from '../../models/datesData.model';
import { LoadingService } from '../loadingIndicator/loading.service'; 

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.apiKey;
  private citiesKey = 'weatherAppCities';
  private allCities: any[] = [];
  private filteredCities: any[] = [];
  private pageSize = 20;

  private citiesSubject = new BehaviorSubject<any[]>([]);

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService 
  ) {
    this.initializeCities();
  }

  private initializeCities(): void {
    this.loadingService.loadingOn(); 
    const storedCities = this.getCitiesFromLocalStorage();
    const storedCityNames = new Set(storedCities.map(city => city.city.toLowerCase()));

    this.http.get<any[]>('assets/cities500.json').pipe(
      catchError(error => this.handleError(error, 'Failed to load cities')),
      finalize(() => this.loadingService.loadingOff()) // Stop loading
    ).subscribe({
      next: (cities) => {
        this.allCities = cities.filter(city => !storedCityNames.has(city.name.toLowerCase()));
        this.filteredCities = this.allCities;
        this.citiesSubject.next(this.filteredCities);
      },
      error: (error) => {
        console.error('Error initializing cities:', error);
        this.citiesSubject.next([]);
      }
    });
  }

  getCurrentWeather(city: string): Observable<WeatherData> {
    this.loadingService.loadingOn(); 
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric');

    return this.http.get<any>(API_ENDPOINTS.WEATHER, { params }).pipe(
      map(response => ({
        city: response.name,
        temperature: response.main.temp,
        condition: response.weather[0].description,
        icon: response.weather[0].icon
      })),
      catchError(error => this.handleError(error, `Failed to get weather for ${city}`)),
      finalize(() => this.loadingService.loadingOff()) 
    );
  }

  getForecast(city: string): Observable<datesData[]> {
    this.loadingService.loadingOn(); 
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric');
  
    return this.http.get<any>(API_ENDPOINTS.FORECAST, { params }).pipe(
      map(response => {
        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 7);
  
        const dailyForecastMap: { [key: string]: any } = {};
  
        response.list.forEach((item: any) => {
          const forecastDate = new Date(item.dt_txt);
          const dateKey = forecastDate.toISOString().split('T')[0];
  
          if (forecastDate >= today && forecastDate < endDate && !dailyForecastMap[dateKey]) {
            dailyForecastMap[dateKey] = {
              date: item.dt_txt,
              temperature: item.main.temp,
              condition: item.weather[0].description,
              icon: item.weather[0].icon
            };
          }
        });
  
        return Object.values(dailyForecastMap);
      }),
      catchError(error => this.handleError(error, `Failed to get forecast for ${city}`)),
      finalize(() => this.loadingService.loadingOff()) // Stop loading
    );
  }
  
  getAllCities(): Observable<any[]> {  
    return this.citiesSubject.asObservable(); 
  }

  addCityToLocalStorage(city: WeatherData): void {
    if (typeof localStorage !== 'undefined') {
      const cities = this.getCitiesFromLocalStorage();
      
      const cityExists = cities.some(existingCity => existingCity.city === city.city);
      
      if (!cityExists) {
        cities.push(city);
        localStorage.setItem(this.citiesKey, JSON.stringify(cities));
      }
    }
  }

  getCitiesFromLocalStorage(): WeatherData[] {
    if (typeof localStorage !== 'undefined') {
      const cities = localStorage.getItem(this.citiesKey);
      return cities ? JSON.parse(cities) : [];
    }
    return [];
  }

  removeCityFromLocalStorage(city: WeatherData): void {
    if (typeof localStorage !== 'undefined') {
      let cities = this.getCitiesFromLocalStorage();
      cities = cities.filter(c => c.city !== city.city);
      localStorage.setItem(this.citiesKey, JSON.stringify(cities));
    }
  }

  private handleError(error: any, userFriendlyMessage: string): Observable<never> {
    let errorMessage: string;
  
    if (error.status === 404) {
      errorMessage = `City not found. Please check the city name and try again.`;
    } else if (error.status === 0) {
      errorMessage = `Network error: Unable to reach the server. Please check your internet connection.`;
    } else {
      errorMessage = userFriendlyMessage || `Something went wrong; please try again later.`;
    }
  
    console.error(errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}