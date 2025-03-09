import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { CodeAppComponent } from './pages/code-app/code-app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { DashboardContentComponent } from './pages/dashboard-content/dashboard-content.component';

export const routes: Routes = [
    { path: '', component: IndexComponent, pathMatch: 'full' },
    // { path: 'gallery', component: GalleryComponent, pathMatch: 'full', canActivate: [authGuard] },
    // { path: 'profile', component: UserProfileComponent, pathMatch: 'full', canActivate: [authGuard] },
    { path: 'code', component: CodeAppComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent,
        children: [
            { path: '', component: DashboardContentComponent, pathMatch: 'full' },
            { path: 'gallery', component: GalleryComponent, pathMatch: 'full' },
            { path: 'profile', component: UserProfileComponent, pathMatch: 'full' },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ], 
        canActivate: [authGuard] 
    },
];
