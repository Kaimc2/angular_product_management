import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FirestoreService } from '../../shared/services/firestore.service';
import { Router } from '@angular/router';
import { Product } from '../product';
import { Subscription } from 'rxjs';
import { CartService } from '../../cart/cart.service';
import { Confirm, Loading } from 'notiflix';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent implements OnInit, OnDestroy {
  private firebase = inject(FirestoreService);
  private router = inject(Router);
  private cartService = inject(CartService);

  products: Product[] = [];
  filteredProducts: Product[] = [];
  sub!: Subscription;
  loading = false;

  ngOnInit(): void {
    this.loading = true;
    Loading.dots();
    this.sub = this.firebase.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = this.products;
      this.loading = false;
      Loading.remove();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private _search = '';
  get search() {
    return this._search;
  }
  set search(value: string) {
    this._search = value;
    this.filteredProducts = this.filter(value);
  }

  filter(filterBy: string) {
    return this.products.filter((product) =>
      product.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
    );
  }

  viewDetails(id: string): void {
    this.router.navigate(['/products', id]);
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.firebase.removeProduct(id);
    }
  }

  addToCart(product: Product): void {
    this.cartService.updateCart(product);
  }
}
