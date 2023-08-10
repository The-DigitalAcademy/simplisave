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
import { LearnBannerComponent } from './pages/learn/learn-banner/learn-banner.component';
import { ExpenseComponent } from './pages/dashboard/expense/expense.component';
import { ManageAccountComponent } from './pages/manage-account/manage-account.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { MainAdminComponent } from './components/admin/main-admin/main-admin.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';

const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent},
    { path: 'forgot', component: ForgotPasswordComponent},
    { path: 'steps', component: StepsComponent },
    {path: 'accounts', component: AccountsComponent},
    {path : 'learn', component : LearnComponent},
    {path : 'dashboard', component : DashboardComponent},
    {path: 'expense', component : ExpenseComponent},
    {path : '', component : LandingComponent},
    {path:"learnBanner",component:LearnBannerComponent},
    {path:'manage', component: ManageAccountComponent},
    {path:'admin',component:MainAdminComponent},
    {path:'admin2',component:AdminComponent},
    {path:'loginAdmin',component:AdminLoginComponent},


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
