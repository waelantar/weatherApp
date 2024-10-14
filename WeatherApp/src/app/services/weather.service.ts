import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../enviroments/enviroment';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { WeatherData } from '../models/WeatherData.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.apiKey;
  private citiesKey = 'weatherAppCities';

  constructor(private http: HttpClient) { }

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

  getForecast(city: string): Observable<WeatherData[]> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric');

    return this.http.get<any>(API_ENDPOINTS.FORECAST, { params }).pipe(
      map(response => {
        return response.list.map((item: any) => ({
          date: item.dt_txt,
          temperature: item.main.temp,
          condition: item.weather[0].description,
          icon: item.weather[0].icon
        }));
      }),
      catchError(this.handleError)
    );
  }

  getAllCities(): Observable<any[]> {
    return this.http.get<any[]>('assets/cities500.json').pipe(
      catchError(this.handleError)
    );
  }

  addCityToLocalStorage(city: WeatherData): void {
    if (typeof localStorage !== 'undefined') {
      const cities = this.getCitiesFromLocalStorage();
      cities.push(city);
      localStorage.setItem(this.citiesKey, JSON.stringify(cities));
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