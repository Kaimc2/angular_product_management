import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/errors/not-found.component';
import { CartComponent } from './cart/cart.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { authGuard } from './user/auth.guard';
import { ProductsComponent } from './user/dashboard/products/products.component';
import { AccountComponent } from './user/dashboard/account/account.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: ProductsComponent },
      { path: 'account', component: AccountComponent },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
