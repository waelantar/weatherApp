import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../enviroments/enviroment';
import { API_ENDPOINTS } from '../../constants/api-endpoints.constant';
import { WeatherData } from '../../models/WeatherData.model';
import { datesData } from '../../models/datesData.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.apiKey;
  private citiesKey = 'weatherAppCities';
  private storedCityNames: Set<string> = new Set();
  private allCities: any[] = [];
  private filteredCities: any[] = [];
  private pageSize = 20;

  private citiesSubject = new BehaviorSubject<any[]>([]); // Use BehaviorSubject

  constructor(private http: HttpClient) {
    this.initializeCities();
  }

  private initializeCities(): void {
    const storedCities = this.getCitiesFromLocalStorage();
    const storedCityNames = new Set(storedCities.map(city => city.city.toLowerCase()));

    this.http.get<any[]>('assets/cities500.json').pipe(
      catchError(this.handleError)
    ).subscribe(cities => {
      this.allCities = cities.filter(city => !storedCityNames.has(city.name.toLowerCase()));
      this.filteredCities = this.allCities;
      this.citiesSubject.next(this.filteredCities); // Emit the filtered cities
    });
  }
  getCurrentWeather(city: string): Observable<WeatherData> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric'); // You can change 'metric' to 'imperial' for Fahrenheit

    return this.http.get<any>(API_ENDPOINTS.WEATHER, { params }).pipe(
      map(response => {
        return {
          city: response.name,
          temperature: response.main.temp,
          condition: response.weather[0].description,
          icon: response.weather[0].icon
        };
      }),
      catchError(this.handleError)
    );
  }

  getForecast(city: string): Observable<datesData[]> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric');
  
    return this.http.get<any>(API_ENDPOINTS.FORECAST, { params }).pipe(
      map(response => {
        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 7); // Set end date to 7 days from today
  
        // Create a map to store the first forecast of each day
        const dailyForecastMap: { [key: string]: any } = {};
  
        response.list.forEach((item: any) => {
          const forecastDate = new Date(item.dt_txt);
          // Format the date to YYYY-MM-DD for grouping
          const dateKey = forecastDate.toISOString().split('T')[0];
  
          // Only add if the date is within the next 7 days and not already added
          if (forecastDate >= today && forecastDate < endDate && !dailyForecastMap[dateKey]) {
            dailyForecastMap[dateKey] = {
              date: item.dt_txt,
              temperature: item.main.temp,
              condition: item.weather[0].description,
              icon: item.weather[0].icon
            };
          }
        });
  
        // Return only the values from the map as an array
        return Object.values(dailyForecastMap);
      }),
      catchError(this.handleError)
    );
  }
  
  
  getAllCities(): Observable<any[]> {  
    return this.citiesSubject.asObservable(); // Return the BehaviorSubject as an Observable
  }

 

  addCityToLocalStorage(city: WeatherData): void {
    if (typeof localStorage !== 'undefined') {
      const cities = this.getCitiesFromLocalStorage();
      
      // Check if the city already exists in the array
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

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError('Something went wrong; please try again later.');
  }
}