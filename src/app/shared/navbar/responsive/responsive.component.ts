import { Component, HostListener, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '@angular/fire/auth';
import { CartService } from '../../../cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-responsive-navbar',
  templateUrl: './responsive.component.html',
  styleUrl: './responsive.component.scss',
})
export class ResponsiveNavbarComponent {
  private auth = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  user = signal<User | null>(this.auth.getAuthLocal());
  isLoggedIn = signal(this.auth.isLoggedIn());
  cartCount = this.cartService.cartCount;
  isOpened = false;

  // eUser = effect(() => console.log(this.user()));

  onDashboardUrl() {
    const currentUrl = this.router.url;
    return currentUrl.includes('/dashboard');
  }

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

  // Close the sidebar on 'Escape' key press
  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent): void {
    this.toggleSidebar();
  }

  toggleSidebar() {
    this.isOpened = !this.isOpened;
  }
}
