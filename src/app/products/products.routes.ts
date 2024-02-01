import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { productCustomizeGuard } from './product-customize.guard';
import { authGuard } from '../user/auth.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';

export const productsRoutes: Routes = [
  { path: 'products', component: ProductsListComponent },
  {
    path: 'products/create',
    component: ProductCreateComponent,
    canActivate: [authGuard],
    canDeactivate: [productCustomizeGuard],
  },
  {
    path: 'products/:id/edit',
    component: ProductEditComponent,
    canActivate: [authGuard],
    canDeactivate: [productCustomizeGuard],
  },
  { path: 'products/:id', component: ProductDetailComponent },
];
