import { Routes } from '@angular/router'
import { AuthGuard } from '@core/services/auth.guard'
import { LayoutService } from '@core/services/layout.service'
import { MainLayout } from '@layouts/main-layout'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [AuthGuard, LayoutService],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./views/dashboard/dashboard').then((m) => m.Dashboard),
        data: { title: 'Dashboard' },
      },
      {
        path: 'cake-toppers',
        loadComponent: () => import('./views/cake-toppers/cake-toppers').then((m) => m.CakeToppers),
        data: { title: 'Cake Toppers' },
        children: [
          { path: '', redirectTo: 'orders', pathMatch: 'full' },
          {
            path: 'orders',
            loadComponent: () => import('./views/cake-toppers/orders/orders').then((m) => m.CakeToppersOrders),
            data: { title: 'Cake Toppers' },
          },
          {
            path: 'orders/day/:date',
            loadComponent: () => import('./views/cake-toppers/orders/day-view/day-view').then((m) => m.CakeToppersDay),
            data: { title: 'Cake Toppers' },
          },
        ],
      },
    ],
  },
  {
    path: '',
    canActivate: [LayoutService],
    children: [
      {
        path: 'auth/sign-in',
        loadComponent: () => import('./views/auth/sign-in/sign-in').then((m) => m.SignIn),
        data: { title: 'Sign In' },
      },
      {
        path: 'auth/sign-up',
        loadComponent: () => import('./views/auth/sign-up/sign-up').then((m) => m.SignUp),
        data: { title: 'Sign Up' },
      },
      {
        path: 'auth/reset-pass',
        loadComponent: () => import('./views/auth/reset-pass/reset-pass').then((m) => m.ResetPass),
        data: { title: 'Reset Password' },
      },
      {
        path: 'error/404',
        loadComponent: () => import('./views/error/error-404/error-404').then((m) => m.Error404),
        data: { title: '404 Not Found' },
      },
      {
        path: 'error/500',
        loadComponent: () => import('./views/error/error-500/error-500').then((m) => m.Error500),
        data: { title: '500 Internal Server' },
      },
      {
        path: 'error/maintenance',
        loadComponent: () => import('./views/error/maintenance/maintenance').then((m) => m.Maintenance),
        data: { title: 'Maintenance' },
      },
      {
        path: '**',
        loadComponent: () => import('./views/error/error-404/error-404').then((m) => m.Error404),
        data: { title: '404 Not Found' },
      },
    ],
  },
]
