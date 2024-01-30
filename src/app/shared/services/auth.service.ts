import { Injectable, NgZone } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData!: User;

  constructor(
    private auth: Auth,
    private router: Router,
    public ngZone: NgZone
  ) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  getAuthFire() {
    return this.auth.currentUser;
  }

  getAuthLocal() {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);
    return user;
  }

  isLoggedIn() {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);
    return user !== null ? true : false;
  }

  async loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider()).then(() =>
      this.router.navigate(['/dashboard'])
    );
  }

  logout() {
    signOut(this.auth).then(() => this.router.navigate(['/home']));
  }
}
