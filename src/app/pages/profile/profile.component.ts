import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ApiResponse, User } from '../../core/models/common-model';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private readonly authService = inject(AuthService);
  user: ApiResponse<User> = this.authService.user;
}
