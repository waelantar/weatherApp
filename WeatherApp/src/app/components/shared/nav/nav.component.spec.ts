import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { LanguageService } from '../../../services/language.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let languageService: jasmine.SpyObj<LanguageService>;

  beforeEach(() => {
    const languageServiceSpy = jasmine.createSpyObj<LanguageService>('LanguageService', {
      getCurrentLanguage: 'en', // mock getCurrentLanguage to return 'en' by default
      setLanguage: undefined    // mock setLanguage as an empty spy function
    });

    TestBed.configureTestingModule({
      imports: [NavComponent], // use imports instead of declarations for standalone components
      providers: [{ provide: LanguageService, useValue: languageServiceSpy }]
    });

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService) as jasmine.SpyObj<LanguageService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return the current language from the LanguageService', () => {
    languageService.getCurrentLanguage.and.returnValue('en');
    expect(component.currentLanguage).toBe('en');
  });

  it('should toggle language from "en" to "it"', () => {
    languageService.getCurrentLanguage.and.returnValue('en');
    component.toggleLanguage();
    expect(languageService.setLanguage).toHaveBeenCalledWith('it');
  });

  it('should toggle language from "it" to "en"', () => {
    languageService.getCurrentLanguage.and.returnValue('it');
    component.toggleLanguage();
    expect(languageService.setLanguage).toHaveBeenCalledWith('en');
  });
});
