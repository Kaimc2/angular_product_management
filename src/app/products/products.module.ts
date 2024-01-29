import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { productsRoutes } from './products.routes';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsItemComponent } from './products-item/products-item.component';

@NgModule({
  declarations: [ProductsListComponent, ProductsItemComponent],
  imports: [CommonModule, RouterModule.forChild(productsRoutes)],
})
export class ProductsModule {}
