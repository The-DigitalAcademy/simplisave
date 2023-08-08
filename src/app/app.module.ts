/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTooltipModule } from '@angular/material/tooltip';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LearnComponent } from './pages/learn/learn.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LearnBannerComponent } from './pages/learn/learn-banner/learn-banner.component';
import { LearnWhySAveComponent } from './pages/learn/learn-why-save/learn-why-save.component';
import { LearnVsNoSavingsComponent } from './pages/learn/learn-vs-no-savings/learn-vs-no-savings.component';
import { LearnVsInvestComponent } from './pages/learn/learn-vs-invest/learn-vs-invest.component';
import { LearnBestSuitedComponent } from './pages/learn/learn-best-suited/learn-best-suited.component';
import { LearnOfferComponent } from './pages/learn/learn-offer/learn-offer.component';
import { Step1Component } from './pages/auth/register/step1/step1.component';
import { Step2Component } from './pages/auth/register/step2/step2.component';
import { Step3Component } from './pages/auth/register/step3/step3.component';
import { Step4Component } from './pages/auth/register/step4/step4.component';
import { StepsComponent } from './pages/auth/register/steps/steps.component';
import { OffersComponent } from './pages/landing/offers/offers.component';
import { LandingGetstartedComponent } from './pages/landing/landing-getstarted/landing-getstarted.component';
import { LandingPartnersComponent } from './pages/landing/landing-partners/landing-partners.component';
import { LandingOpenAccountComponent } from './pages/landing/landing-open-account/landing-open-account.component';
import { LandingNeedHelpComponent } from './pages/landing/landing-need-help/landing-need-help.component';

import { TopPartComponent } from './pages/dashboard/top-part/top-part.component';
import { ChecklistComponent } from './pages/dashboard/checklist/checklist.component';
import { SecondNavBarComponent } from './components/second-nav-bar/second-nav-bar.component';
import { GraphComponent } from './pages/dashboard/graph/graph.component';
import { Step5Component } from './pages/auth/register/step5/step5.component';
import { Step6Component } from './pages/auth/register/step6/step6.component';
import { Step7Component } from './pages/auth/register/step7/step7.component';
import { Step8Component } from './pages/auth/register/step8/step8.component';
import { LearnStepsComponent } from './pages/learn/learn-steps/learn-steps.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ExpenseComponent } from './pages/dashboard/expense/expense.component';

import { AccountService } from './services/account.service'; 
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { ExpenseModalComponent } from './pages/dashboard/expense/expense-modal/expense-modal.component';
import { ManageAccountComponent } from './pages/manage-account/manage-account.component';
import { ManageExpenseComponent } from './pages/manage-account/manage-expense/manage-expense.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AdminComponent } from './components/admin/admin/admin.component';
import { MainAdminComponent } from './components/admin/main-admin/main-admin.component';
import { ManageModalComponent } from './pages/manage-account/manage-expense/manage-modal/manage-modal.component';
import { GoalModalComponent } from './pages/manage-account/manage-expense/goal-modal/goal-modal.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';





@NgModule({
    declarations: [AppComponent, LandingComponent, LearnComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent, AccountsComponent, DashboardComponent, NavbarComponent, SidebarComponent, FooterComponent, LearnBannerComponent, LearnWhySAveComponent, LearnVsNoSavingsComponent, LearnVsInvestComponent, LearnBestSuitedComponent, LearnOfferComponent, Step1Component, Step2Component, Step3Component, Step4Component, StepsComponent, OffersComponent, Step5Component, Step6Component, Step7Component, Step8Component, TopPartComponent,ChecklistComponent, GraphComponent,SecondNavBarComponent, LandingGetstartedComponent, LandingPartnersComponent, LandingOpenAccountComponent,

        LandingNeedHelpComponent, LearnStepsComponent, ExpenseComponent, ExpenseModalComponent,ManageAccountComponent,ManageExpenseComponent, AdminComponent, MainAdminComponent],

       
        LandingNeedHelpComponent, LearnStepsComponent, ExpenseComponent, ExpenseModalComponent,ManageAccountComponent,ManageExpenseComponent, AdminComponent, MainAdminComponent,ManageModalComponent,GoalModalComponent, AdminLoginComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatIconModule, MatStepperModule,MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule,MatTooltipModule,HttpClientModule, MatDialogModule, MatListModule, MatCheckboxModule, MatFormFieldModule, MatProgressBarModule],

    providers: [{
        provide: MatDialogRef, useValue: {}
    },],
    bootstrap: [AppComponent],
})
export class AppModule {}
