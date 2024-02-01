import { Component, inject } from '@angular/core';
import { FirestoreService } from '../../../shared/services/firestore.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../products/product';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private firebase = inject(FirestoreService);
  private auth = inject(AuthService);
  private router = inject(Router);

  sub!: Subscription;

  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading!: boolean;

  private _search = '';
  get search() {
    return this._search;
  }
  set search(value: string) {
    this._search = value;
    this.filteredProducts = this.filter(value);
  }

  ngOnInit(): void {
    this.loading = true;
    Notiflix.Loading.dots();

    this.sub = this.firebase
      .getUserProducts(this.auth.getAuthLocal().uid)
      .subscribe((data) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;
        Notiflix.Loading.remove();
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  filter(filterBy: string) {
    return this.products.filter((product) =>
      product.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
    );
  }

  editProduct(id: string) {
    this.router.navigate(['/products', id, 'edit']);
  }

  deleteProduct(product: Product) {
    Notiflix.Confirm.show(
      'Deletion Confirmation',
      `Are you sure you want to delete ${product.name}?`,
      'Yes',
      'No',
      () => {
        this.firebase.removeProduct(product.id);
      },
      () => {},
      { okButtonBackground: '#ef4444', titleColor: '#ef4444' }
    );
  }
}
