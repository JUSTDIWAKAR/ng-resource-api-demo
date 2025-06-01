import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Tabs } from './pages/tabs/tabs';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'tabs', component: Tabs },
  { path: '**', redirectTo: '' },
];
