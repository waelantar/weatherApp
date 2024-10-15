import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { LanguageService } from '../../../services/language.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let mockLanguageService: jasmine.SpyObj<LanguageService>;

  beforeEach(async () => {
    mockLanguageService = jasmine.createSpyObj('LanguageService', ['getCurrentLanguage', 'setLanguage']);
    mockLanguageService.getCurrentLanguage.and.returnValue('en');

    await TestBed.configureTestingModule({
      imports: [NavComponent], // Add the standalone component to the imports array
      providers: [{ provide: LanguageService, useValue: mockLanguageService }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the dropdown state', () => {
    expect(component.isDropdownOpen).toBe(false);
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBe(true);
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBe(false);
  });

  it('should get the current language from the LanguageService', () => {
    expect(component.currentLanguage).toBe('en');
  });

  it('should select a language and close the dropdown', () => {
    component.isDropdownOpen = true;
    component.selectLanguage('it');
    expect(mockLanguageService.setLanguage).toHaveBeenCalledWith('it');
    expect(component.isDropdownOpen).toBe(false);
  });
});
