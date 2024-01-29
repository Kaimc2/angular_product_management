import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsItemComponent } from './products-item/products-item.component';

export const productsRoutes: Routes = [
  { path: 'products', component: ProductsListComponent },
  { path: 'products/:id', component: ProductsItemComponent },
];
