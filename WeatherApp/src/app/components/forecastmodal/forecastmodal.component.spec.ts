import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastmodalComponent } from './forecastmodal.component';

describe('ForecastmodalComponent', () => {
  let component: ForecastmodalComponent;
  let fixture: ComponentFixture<ForecastmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastmodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
