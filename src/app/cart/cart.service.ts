import { Injectable, computed, effect, signal } from '@angular/core';
import { Product } from '../products/product';
import { CartItem } from './cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<CartItem[]>([]);
  cartCount = computed(() => this.cart().length);
  cartTotal = computed(() =>
    this.cart().reduce(
      (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
      0
    )
  );

  removeFromCart(product: Product) {
    this.cart.update((items) =>
      items.filter((item) => item.product.id !== product.id)
    );
  }

  updateCart(product: Product) {
    const index = this.cart().findIndex(
      (item) => item.product.id == product.id
    );

    if (index === -1) {
      this.cart.update((items) => [...items, { product, quantity: 1 }]);
    } else {
      // Update the quantity if already in the cart
      this.cart.update((items) => [
        ...items.slice(0, index),
        { ...items[index], quantity: items[index].quantity + 1 },
        ...items.slice(index + 1),
      ]);
    }
  }

  updateQuantity(product: Product, quantity: number) {
    this.cart.update((items) =>
      items.map((item) =>
        item.product.id === product.id ? { ...item, quantity: quantity } : item
      )
    );
  }
}
