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
import { ProfileComponent } from './pages/profile/profile.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FAQComponent } from './components/faq/faq.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TransactionsComponent } from './pages/Transactions/transactions/transactions.component';
import { EmptyBehaviorGuardGuard } from './empty-behavior-guard.guard'; // Import your guard
import { ResetComponent } from './pages/auth/forgot-password/reset/reset.component';

const routes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'forgot', component: ForgotPasswordComponent},
    { path: 'steps', component: StepsComponent},
    {path: 'accounts', component: AccountsComponent},
    {path : 'learn', component : LearnComponent},
    {path : 'dashboard', component : DashboardComponent},
    {path : '', component : LandingComponent},
    {path:'learnBanner',component:LearnBannerComponent},
    {path:'manage', component: ManageAccountComponent, canActivate: [EmptyBehaviorGuardGuard]},
    {path:'admin',component:MainAdminComponent},
    {path:'admin2',component:AdminComponent},
    {path:'loginAdmin',component:AdminLoginComponent},
    {path:'faq',component:FAQComponent},
    {path:'profile',component:ProfileComponent},
    {path:'privacy',component:PrivacyPolicyComponent},
    {path:'aboutus',component:AboutUsComponent},
    {path:'transactions',component:TransactionsComponent, canActivate: [EmptyBehaviorGuardGuard]},
    {path: 'reset', component:ResetComponent}


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
