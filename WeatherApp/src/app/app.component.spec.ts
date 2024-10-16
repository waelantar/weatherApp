import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { LanguageService } from './services/language/language.service'; 
import { TranslateService } from '@ngx-translate/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const languageServiceMock = jasmine.createSpyObj('LanguageService', ['currentLanguage$']);
    const translateServiceMock = jasmine.createSpyObj('TranslateService', ['setDefaultLang', 'use']);

    TestBed.configureTestingModule({
      imports: [AppComponent], // Import the standalone component here
      providers: [
        { provide: LanguageService, useValue: languageServiceMock },
        { provide: TranslateService, useValue: translateServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    languageServiceSpy = TestBed.inject(LanguageService) as jasmine.SpyObj<LanguageService>;
    translateServiceSpy = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
  });

  it('should update currentLanguage and call TranslateService when ngOnInit is called', () => {
    const mockLanguage = 'it';
    languageServiceSpy.currentLanguage$ = of(mockLanguage);

    component.ngOnInit();

    expect(component.currentLanguage).toBe(mockLanguage);
    expect(translateServiceSpy.setDefaultLang).toHaveBeenCalledWith(mockLanguage);
    expect(translateServiceSpy.use).toHaveBeenCalledWith(mockLanguage);
  });

  it('should subscribe to currentLanguage$', () => {
    const mockLanguage = 'en';
    languageServiceSpy.currentLanguage$ = of(mockLanguage);
    spyOn(languageServiceSpy.currentLanguage$, 'subscribe').and.callThrough();

    component.ngOnInit();

    expect(languageServiceSpy.currentLanguage$.subscribe).toHaveBeenCalled();
  });


});
