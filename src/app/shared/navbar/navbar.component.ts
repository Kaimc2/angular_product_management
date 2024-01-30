import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private auth = inject(AuthService);

  user = signal<User | null>(this.auth.getAuthLocal());
  isLoggedIn = signal(this.auth.isLoggedIn());

  // eUser = effect(() => console.log(this.user()));

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
