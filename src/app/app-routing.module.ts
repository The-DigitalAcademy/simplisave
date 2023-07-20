/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnComponent } from './pages/learn/learn.component';
import { AccountsComponent } from './pages/accounts/accounts.component'
import { RegisterComponent } from './pages/auth/register/register.component';
import { Step1Component } from './pages/auth/register/step1/step1.component';
import { Step2Component } from './pages/auth/register/step2/step2.component';
import { Step3Component } from './pages/auth/register/step3/step3.component';
import { Step4Component } from './pages/auth/register/step4/step4.component';
import { StepsComponent } from './pages/auth/register/steps/steps.component';

const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'steps', component: StepsComponent },
    {path: 'accounts', component: AccountsComponent},
    {path : 'learn', component : LearnComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
