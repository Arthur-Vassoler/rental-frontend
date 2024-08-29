import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GuestComponent } from './pages/guest/guest.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redireciona a rota padrão para /dashboard
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }, // Define a rota /dashboard
  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'guest', component: GuestComponent, canActivate: [authGuard] },
  { path: '404', component: NotFoundComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '404' }
];
