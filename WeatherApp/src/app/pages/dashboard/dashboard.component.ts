import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { WeatherData } from '../../models/WeatherData.model';
import { WeatherService } from '../../services/weather/weather.service';
import { FormsModule } from '@angular/forms';
import { AddCityComponent } from "../../components/shared/add-city/add-city.component";
import { CityCardComponent } from "../../components/city-card/city-card.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TranslateModule, FormsModule, AddCityComponent, CityCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit ,AfterViewInit{
  cities: WeatherData[] = [];
  filteredCities: WeatherData[] = [];
  searchQuery: string = '';
  @ViewChild('cardContainer')
  cardContainer!: ElementRef;
  showLeftArrow: boolean = false;
  showRightArrow: boolean = false;
  constructor(private weatherService: WeatherService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cities = this.weatherService.getCitiesFromLocalStorage();
    this.filteredCities = [...this.cities];
  }
  ngAfterViewInit() {
    // Defer the initial check to the next change detection cycle
    setTimeout(() => this.checkArrows(), 0);
  }

  @HostListener('window:resize')
  onResize() {
    this.checkArrows();
  }

  checkArrows() {
    if (this.cardContainer && this.cardContainer.nativeElement) {
      const container = this.cardContainer.nativeElement;
      this.showLeftArrow = container.scrollLeft > 0;
      this.showRightArrow = container.scrollLeft < container.scrollWidth - container.clientWidth;
      // Trigger change detection
      this.cdr.detectChanges();
    }
  }

  scrollLeft() {
    if (this.cardContainer && this.cardContainer.nativeElement) {
      this.cardContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
      setTimeout(() => this.checkArrows(), 500);
    }
  }

  scrollRight() {
    if (this.cardContainer && this.cardContainer.nativeElement) {
      this.cardContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
      setTimeout(() => this.checkArrows(), 500);
    }
  }


  removeCity(city: any) {
    this.cities = this.cities.filter(c => c !== city);
    this.weatherService.removeCityFromLocalStorage(city);
    this.cities = this.weatherService.getCitiesFromLocalStorage();

    setTimeout(() => this.checkArrows(), 0);
  }

 

addCity(city: any) {
  this.weatherService.getCurrentWeather(city).subscribe(data => {
    this.cities.push(data);
    this.weatherService.addCityToLocalStorage(data);
    this.cities = this.weatherService.getCitiesFromLocalStorage();

  });    setTimeout(() => {
      this.checkArrows();
      this.scrollToEnd();
    }, 0);
  }

  private scrollToEnd() {
    if (this.cardContainer && this.cardContainer.nativeElement) {
      const container = this.cardContainer.nativeElement;
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    }
  }}
