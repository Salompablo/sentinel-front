import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Alerts } from './components/alerts/alerts';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'alerts', component: Alerts },
  { path: '**', redirectTo: '' },
];
