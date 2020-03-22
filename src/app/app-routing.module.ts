import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScriptListComponent } from './scripts/script-list/script-list.component';
import { ScriptCreateComponent } from './scripts/script-create/script-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserListComponent } from './users/user-list/user-list.component';


const routes: Routes = [
  { path: '', component: ScriptListComponent },
  { path: 'create', component: ScriptCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:scriptId', component: ScriptCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin/user/create',component: UserCreateComponent },
  { path: 'admin/users/', component: UserListComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
