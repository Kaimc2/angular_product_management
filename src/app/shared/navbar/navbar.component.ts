import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private auth = inject(AuthService);
  private cartService = inject(CartService);

  user = signal<User | null>(this.auth.getAuthLocal());
  isLoggedIn = signal(this.auth.isLoggedIn());
  cartCount = this.cartService.cartCount;

  login() {
    this.auth.loginWithGoogle().then(() => {
      this.user.set(this.auth.getAuthFire());
      this.isLoggedIn.set(true);
    });
  }

  logout() {
    this.auth.logout();
    this.isLoggedIn.set(false);
  }
}
