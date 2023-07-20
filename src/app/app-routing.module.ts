/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnComponent } from './pages/learn/learn.component';
import { AccountsComponent } from './pages/accounts/accounts.component'
import { RegisterComponent } from './pages/auth/register/register.component';
import { StepsComponent } from './pages/auth/register/steps/steps.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent},
    { path: 'forgot', component: ForgotPasswordComponent},
    { path: 'steps', component: StepsComponent },
    {path: 'accounts', component: AccountsComponent},
    {path : 'learn', component : LearnComponent},
    {path : 'dashboard', component : DashboardComponent},
    {path : '', component : LandingComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
