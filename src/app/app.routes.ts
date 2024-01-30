import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/errors/not-found.component';
import { CartComponent } from './cart/cart.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
