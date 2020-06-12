import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ResponsesComponent} from './components/responses/responses.component';
import {AuthGuard} from './guards/auth.guard';

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
    component: LoginComponent
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
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    //canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
