import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SiteListComponent } from './site-list/site-list.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { SingUpComponent } from './sing-up/sing-up.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path:'singUp',
    component: SingUpComponent
  },
  {
    path: 'site-list',
    component: SiteListComponent,
  },
  {
    path: 'password-list',
    component: PasswordListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
