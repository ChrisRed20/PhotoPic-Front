import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { GalleryComponent } from './features/gallery/gallery.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { CodeAppComponent } from './pages/code-app/code-app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: IndexComponent, pathMatch: 'full' },
    { path: 'gallery', component: GalleryComponent, pathMatch: 'full', canActivate: [authGuard] },
    { path: 'profile', component: UserProfileComponent, pathMatch: 'full', canActivate: [authGuard] },
    { path: 'code', component: CodeAppComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [authGuard] },
];
