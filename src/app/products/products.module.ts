import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { productsRoutes } from './products.routes';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';
import { IconModule } from '../shared/icons/icons.module';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    ProductReviewsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    RouterModule.forChild(productsRoutes),
  ],
})
export class ProductsModule {}
