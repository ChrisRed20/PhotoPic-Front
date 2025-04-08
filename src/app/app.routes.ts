import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/index/index.component').then(m => m.IndexComponent), pathMatch: 'full' },
    { path: 'code', loadComponent: () => import('./pages/code-app/code-app.component').then(m => m.CodeAppComponent), pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), pathMatch: 'full' },
    { path: 'signup', loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent), pathMatch: 'full' },
    {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/dashboard-content/dashboard-content.component').then(m => m.DashboardContentComponent),
            pathMatch: 'full'
          },
          {
            path: 'gallery',
            loadComponent: () =>
              import('./pages/gallery/gallery.component').then(m => m.GalleryComponent),
            pathMatch: 'full'
          },
          {
            path: 'profile',
            loadComponent: () =>
              import('./pages/user-profile/user-profile.component').then(m => m.UserProfileComponent),
            pathMatch: 'full'
          },
          {
            path: '**',
            redirectTo: '',
            pathMatch: 'full'
          }
        ]
      }
];
