import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ResponsesComponent} from './components/responses/responses.component';
import {AuthGuard} from './guards/auth.guard';
import {UnauthorizeComponent} from './components/unauthorize/unauthorize.component';
import {RegisterUserGuard} from './guards/register-user.guard';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register-user',
    component: LoginComponent,
    canActivate: [RegisterUserGuard]
  },
  {
    path: 'forgot-password',
    component: LoginComponent
  },
  {
    path: 'reset-password/:id',
    component: LoginComponent
  },
  {
    path: 'responses',
    component: ResponsesComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizeComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
