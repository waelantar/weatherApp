import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a default language of "en"', () => {
    expect(service.getCurrentLanguage()).toBe('en');
  });

  it('should update the language', () => {
    service.setLanguage('it');
    expect(service.getCurrentLanguage()).toBe('it');
  });

  

});
