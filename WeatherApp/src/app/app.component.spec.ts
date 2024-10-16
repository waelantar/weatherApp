import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language/language.service';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavComponent } from './components/shared/nav/nav.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockTranslateService: jasmine.SpyObj<TranslateService>;
  let mockLanguageService: jasmine.SpyObj<LanguageService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Creating spies for dependencies
    mockTranslateService = jasmine.createSpyObj('TranslateService', ['setDefaultLang', 'use']);
    mockLanguageService = jasmine.createSpyObj('LanguageService', ['currentLanguage$']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Mock the language service observable
    mockLanguageService.currentLanguage$ = of('en');

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), NavComponent,AppComponent],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the default language on init', () => {
    component.ngOnInit();
    expect(mockTranslateService.setDefaultLang).toHaveBeenCalledWith('en');
    expect(mockTranslateService.use).toHaveBeenCalledWith('en');
  });

  it('should navigate to /dashboard if cities are present in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('someCities');
    component.ngOnInit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should navigate to / if no cities are found in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.ngOnInit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should unsubscribe from languageSubscription on destroy', () => {
    const subscriptionSpy = jasmine.createSpyObj<Subscription>('Subscription', ['unsubscribe']);
    component['languageSubscription'] = subscriptionSpy;

    component.ngOnDestroy();
    expect(subscriptionSpy.unsubscribe).toHaveBeenCalled();
  });
});
