import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/navigation/navigation.component').then(
        (m) => m.NavigationComponent
      ),
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'incidents',
        loadComponent: () =>
          import('./components/incidents/incidents.component').then(
            (m) => m.IncidentsComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'tragedy/:id',
        loadComponent: () =>
          import('./components/tragedy/tragedy.component').then(
            (m) => m.TragedyComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'hero/:id',
        loadComponent: () =>
          import(
            './components/heroes-feature/heroes-list/heroes-list.component'
          ).then((m) => m.HeroesListComponent),
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
