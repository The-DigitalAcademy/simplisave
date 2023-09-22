/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTooltipModule } from '@angular/material/tooltip';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { LearnWhySAveComponent} from './pages/learn/learn-why-save/learn-why-save.component';
import { LearnVsNoSavingsComponent } from './pages/learn/learn-vs-no-savings/learn-vs-no-savings.component';
import { LearnVsInvestComponent } from './pages/learn/learn-vs-invest/learn-vs-invest.component';
import { LearnBestSuitedComponent } from './pages/learn/learn-best-suited/learn-best-suited.component';
import { LearnOfferComponent } from './pages/learn/learn-offer/learn-offer.component';
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
import { TransactionsComponent } from './pages/Transactions/transactions/transactions.component';
import { ProfileComponent} from './pages/profile/profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { FAQComponent } from './components/faq/faq.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BalanceSummaryComponent } from './pages/Transactions/transactions/balance-summary/balance-summary.component';
import { TransactionDetailsComponent } from './pages/Transactions/transactions/transaction-details/transaction-details.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AccountsBannerComponent } from './pages/accounts/accounts-banner/accounts-banner.component';
import { FaqBannerComponent } from './components/faq/faq-banner/faq-banner.component';
import { FaqContentComponent } from './components/faq/faq-content/faq-content.component';
import { AccountsSavingsAndInvestmentsComponent } from './pages/accounts/accounts-savings-and-investments/accounts-savings-and-investments.component';
import { TransferModalComponent } from './pages/dashboard/top-part/transfer-modal/transfer-modal.component';
import { ResetComponent } from './pages/auth/forgot-password/reset/reset.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import { AddStudentsComponent } from './components/admin/add-students/add-students.component';
import {MatSelectModule} from '@angular/material/select'
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { AdminNavBarComponent } from './components/admin/admin-nav-bar/admin-nav-bar.component';


import { SessionTimeoutInterceptor } from './services/session-timeout-interceptor.service';
import { AddComponent } from './pages/add/add.component';
import { OnBoardingComponent } from './components/on-boarding/on-boarding.component';





@NgModule({
    declarations: [AppComponent, LandingComponent, LearnComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent, AccountsComponent, DashboardComponent, NavbarComponent, SidebarComponent, FooterComponent, LearnBannerComponent, LearnWhySAveComponent, LearnVsNoSavingsComponent, LearnVsInvestComponent, LearnBestSuitedComponent, LearnOfferComponent, StepsComponent, OffersComponent, TopPartComponent,ChecklistComponent, GraphComponent,SecondNavBarComponent, LandingGetstartedComponent, LandingPartnersComponent, LandingOpenAccountComponent,LandingNeedHelpComponent, LearnStepsComponent, ExpenseComponent, ExpenseModalComponent,ManageAccountComponent,ManageExpenseComponent, AdminComponent, MainAdminComponent,ManageModalComponent,GoalModalComponent, AdminLoginComponent, TransactionsComponent, ProfileComponent, PrivacyPolicyComponent,FAQComponent, AboutUsComponent, BalanceSummaryComponent, TransactionDetailsComponent, AccountsBannerComponent, AccountsSavingsAndInvestmentsComponent, FaqBannerComponent, FaqContentComponent, TransferModalComponent, ResetComponent, LearnBannerComponent, AddStudentsComponent, AdminNavBarComponent, AddComponent, OnBoardingComponent, ],  
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatIconModule, MatStepperModule,MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule,MatTooltipModule,HttpClientModule, MatDialogModule, MatListModule, MatCheckboxModule, MatFormFieldModule, MatProgressBarModule, MatMenuModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule,MatToolbarModule,MatSelectModule,MatSortModule,MatPaginatorModule,MatTableModule],


    providers: [{
        provide: MatDialogRef, useValue: {}
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: SessionTimeoutInterceptor,
        multi: true,
      },],
    bootstrap: [AppComponent],
})
export class AppModule {}
