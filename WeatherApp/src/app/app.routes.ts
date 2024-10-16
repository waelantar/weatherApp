import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent }, 
    { path: 'dashboard', component: DashboardComponent }, 
    { path: '**', redirectTo: '' } 
  ];

