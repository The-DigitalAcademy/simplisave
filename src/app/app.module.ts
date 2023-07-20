import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { OffersComponent } from './pages/landing/offers/offers.component';
import { LandingGetstartedComponent } from './pages/landing/landing-getstarted/landing-getstarted.component';
import { LandingPartnersComponent } from './pages/landing/landing-partners/landing-partners.component';
import { LandingOpenAccountComponent } from './pages/landing/landing-open-account/landing-open-account.component';
import { LandingNeedHelpComponent } from './pages/landing/landing-need-help/landing-need-help.component';
// import { LinksComponent } from './pages/landing/links/links.component';


@NgModule({
    declarations: 
    [   AppComponent, 
        LandingComponent, 
        LearnComponent, 
        LoginComponent, 
        RegisterComponent, 
        ForgotPasswordComponent, 
        AccountsComponent, 
        DashboardComponent, 
        NavbarComponent, 
        SidebarComponent, 
        FooterComponent, 
        LearnBannerComponent, 
        LearnWhySAveComponent, 
        LearnVsNoSavingsComponent, 
        LearnVsInvestComponent, 
        LearnBestSuitedComponent, 
        LearnOfferComponent, 
        OffersComponent, LandingGetstartedComponent, LandingPartnersComponent, LandingOpenAccountComponent,
        // LinksComponent,
        LandingNeedHelpComponent
],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
