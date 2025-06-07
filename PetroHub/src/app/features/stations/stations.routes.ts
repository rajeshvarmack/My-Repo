import { Routes } from '@angular/router';

export const stationRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./station-list/station-list').then(c => c.StationListComponent),
  },
  {
    path: 'setup',
    loadComponent: () => import('./station-setup/station-setup').then(c => c.StationSetupComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./station-edit/station-edit').then(c => c.StationEditComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./station-detail/station-detail').then(c => c.StationDetailComponent),
  },
];
