import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  ApiResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from '../models/common-model';
import { EndPoint, LocalStorage } from '../constants/constants';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  users: User[] = [];

  isLoggedIn = signal<boolean>(false);
  user!: ApiResponse<User>;
  registeredUsers!: ApiResponse<User>[];

  constructor() {
    this.getUser();
  }

  getUserToken() {
    return localStorage.getItem(LocalStorage.token);
  }

  getUser() {
    return this.httpClient
      .get<ApiResponse<User>[]>(`${EndPoint.Auth.Register}`)
      .subscribe((res: ApiResponse<User>[]) => {
        this.registeredUsers = res;
      });
  }

  register(payload: RegisterPayload) {
    return this.httpClient
      .post<ApiResponse<User>>(`${EndPoint.Auth.Register}`, payload)
      .pipe(
        map((response) => {
          this.user = response;
          this.registeredUsers.push(response);
        }),
        switchMap(() => this.login(payload))
      );
  }

  isString(param: unknown): param is String {
    return typeof param === 'string';
  }

  login(payload: LoginPayload) {
    return this.httpClient
      .post<ApiResponse<User>>(`${EndPoint.Auth.Login}`, payload)
      .pipe(
        map((response) => {
          const regUser = this.registeredUsers.find(
            (user) =>
              user.email === payload.email && user.password === payload.password
          );
          if (this.isString(response.token) && regUser) {
            const token = response.token;
            localStorage.setItem(LocalStorage.token, token);
            this.isLoggedIn.update(() => true);
          } else {
            this.isLoggedIn.update(() => false);
            alert('Пользователь не найден');
          }
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem(LocalStorage.token);
    this.router.navigate(['/login']);
    this.isLoggedIn.update(() => false);
  }
}
