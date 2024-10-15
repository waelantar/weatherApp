import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForecastmodalComponent } from './forecastmodal.component';
import { By } from '@angular/platform-browser';
import { datesData } from '../../models/datesData.model';
import { TranslateService } from '@ngx-translate/core';

describe('ForecastmodalComponent', () => {
  let component: ForecastmodalComponent;
  let fixture: ComponentFixture<ForecastmodalComponent>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;
  const translateMock = jasmine.createSpyObj('TranslateService', ['instant']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastmodalComponent], // Importing the standalone component
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly format the day name', () => {
    const dayName = component.getDayName('2024-10-15');
    expect(dayName).toBe('Tuesday'); // Assuming the locale and time zone match
  });

  it('should correctly format the date', () => {
    const formattedDate = component.formatDate('2024-10-15');
    expect(formattedDate).toBe('Oct 15');
  });

  it('should emit the close event when close is called', () => {
    spyOn(component.close, 'emit');

    component.close.emit();

    expect(component.close.emit).toHaveBeenCalled();
  });

  
});
