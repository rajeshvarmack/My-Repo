import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth').then(c => c.AuthComponent),
  },
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout').then(c => c.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then(c => c.DashboardComponent),
      },
      {
        path: 'stations',
        loadChildren: () => import('./features/stations/stations.routes').then(r => r.stationRoutes),
      },
      {
        path: 'admin',
        loadChildren: () => import('./features/admin/admin.routes').then(r => r.adminRoutes),
        canActivate: [adminGuard],
      },
      {
        path: 'reports',
        loadComponent: () => import('./shared/components/not-found/not-found').then(c => c.NotFoundComponent), // Placeholder
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found').then(c => c.NotFoundComponent),
  },
];
