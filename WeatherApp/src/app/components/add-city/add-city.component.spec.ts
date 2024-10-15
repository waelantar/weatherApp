import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { WeatherService } from '../../services/weather.service';
import { AddCityComponent } from './add-city.component';
import { CommonModule } from '@angular/common';

describe('AddCityComponent', () => {
  let component: AddCityComponent;
  let fixture: ComponentFixture<AddCityComponent>;
  let mockWeatherService: any;

  beforeEach(async () => {
    // Mock the WeatherService
    mockWeatherService = jasmine.createSpyObj('WeatherService', ['getAllCities']);
    mockWeatherService.getAllCities.and.returnValue(of([
      { name: 'New York' },
      { name: 'Los Angeles' },
      { name: 'Chicago' }
    ]));

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, TranslateModule.forRoot(), AddCityComponent],
      providers: [{ provide: WeatherService, useValue: mockWeatherService }]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter search results based on the input', () => {
    component.cityName = 'New';
    component.searchCities();
    expect(component.searchResults.length).toBe(1);
    expect(component.searchResults[0].name).toBe('New York');
  });

  it('should clear search results when cityName is empty', () => {
    component.cityName = '';
    component.searchCities();
    expect(component.searchResults.length).toBe(0);
  });

  it('should emit cityAdded event when addCity is called', () => {
    spyOn(component.cityAdded, 'emit');

    const city = 'San Francisco';
    component.addCity(city);

    expect(component.cityAdded.emit).toHaveBeenCalledWith(city);
    expect(component.cityName).toBe('');
    expect(component.searchResults.length).toBe(0);
  });

  it('should call getAllCities from WeatherService in searchCities', () => {
    component.cityName = 'Chi';
    component.searchCities();

    expect(mockWeatherService.getAllCities).toHaveBeenCalled();
  });
});
