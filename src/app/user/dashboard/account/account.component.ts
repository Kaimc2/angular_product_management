import { Component, OnInit, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  private auth = inject(AuthService);

  user!: User;

  ngOnInit(): void {
    this.user = this.auth.getAuthLocal();
  }
}
