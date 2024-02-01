import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from '../products/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private cartService = inject(CartService);

  // cartCheck = effect(() => console.log(this.cart()));

  cart = this.cartService.cart;
  total = this.cartService.cartTotal;

  removeItem(product: Product) {
    this.cartService.removeFromCart(product);
  }

  updateQuantity(product: Product, quantity: number) {
    this.cartService.updateQuantity(product, quantity);
  }
}
