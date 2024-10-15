import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityCardComponent } from './city-card.component';
import { DomSanitizer } from '@angular/platform-browser';

describe('CityCardComponent', () => {
  let component: CityCardComponent;
  let fixture: ComponentFixture<CityCardComponent>;
  let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;

  beforeEach(async () => {
    // Create a spy object for DomSanitizer
    const spy = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml']);

    await TestBed.configureTestingModule({
      imports: [CityCardComponent],
      providers: [
        { provide: DomSanitizer, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CityCardComponent);
    component = fixture.componentInstance;
    sanitizerSpy = TestBed.inject(DomSanitizer) as jasmine.SpyObj<DomSanitizer>;
  });

  it('should set weatherIcon to cold icon when temperature is below 10', () => {
    component.city = { city: 'Test City', temperature: 5, condition: '', icon: '' };
    sanitizerSpy.bypassSecurityTrustHtml.and.returnValue('mockedSafeHtml');
    component.ngOnInit();
    expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledWith('<i class="fas fa-snowflake"></i>');
    expect(component.weatherIcon).toEqual('mockedSafeHtml');
  });

  it('should set weatherIcon to moderate icon when temperature is between 10 and 25', () => {
    component.city = { city: 'Test City', temperature: 15, condition: '', icon: '' };
    sanitizerSpy.bypassSecurityTrustHtml.and.returnValue('mockedSafeHtml');
    component.ngOnInit();
    expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledWith('<i class="fa fa-thermometer-half"></i>');
    expect(component.weatherIcon).toEqual('mockedSafeHtml');
  });

  it('should set weatherIcon to hot icon when temperature is above 25', () => {
    component.city = { city: 'Test City', temperature: 30, condition: '', icon: '' };
    sanitizerSpy.bypassSecurityTrustHtml.and.returnValue('mockedSafeHtml');
    component.ngOnInit();
    expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledWith('<i class="fas fa-sun"></i>');
    expect(component.weatherIcon).toEqual('mockedSafeHtml');
  });
});