import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { productCustomizeGuard } from './product-customize.guard';

export const productsRoutes: Routes = [
  { path: 'products', component: ProductsListComponent },
  {
    path: 'products/create',
    component: ProductCreateComponent,
    canDeactivate: [productCustomizeGuard],
  },
  { path: 'products/:id', component: ProductDetailComponent },
];
