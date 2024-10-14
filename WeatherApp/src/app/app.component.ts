import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  title = 'WeatherApp';
  ngOnInit(): void {
    // Check if window and localStorage are available
    if (typeof window !== 'undefined' && localStorage) {
      // Access localStorage safely
      const storedCities = localStorage.getItem('cities');
      
      if (storedCities && JSON.parse(storedCities).length > 0) {
        // If cities are present, navigate to the dashboard
        this.router.navigate(['/dashboard']);
      } else {
        // If no cities found, navigate to the landing page
        this.router.navigate(['/']);
      }
    } else {
      // If localStorage is not available, navigate to the landing page
      this.router.navigate(['/']);
    }
  }
}