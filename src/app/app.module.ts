import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FoooterComponent } from './foooter/foooter.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerfCodeComponent } from './verf-code/verf-code.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { SpinkitComponent } from './spinkit/spinkit.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { PricingComponent } from './pricing/pricing.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './afterLogin/services/services.component';
import { Navbar1Component } from './afterLogin/navbar1/navbar1.component';
import { ServicesListComponent } from './afterLogin/services-list/services-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailsComponent } from './afterLogin/details/details.component';
import { CategoryComponent } from './afterLogin/category/category.component';
import { PercentLineComponent } from './afterLogin/percent-line/percent-line.component';
import { ReviewsComponent } from './afterLogin/reviews/reviews.component';
import { RecomondationComponent } from './afterLogin/recomondation/recomondation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './afterLogin/profiles/profile/profile.component';
import { EditProfileComponent } from './afterLogin/profiles/edit-profile/edit-profile.component';
import { SecurityComponent } from './afterLogin/profiles/security/security.component';
import { NotificationComponent } from './afterLogin/profiles/notification/notification.component';
import { BillingComponent } from './afterLogin/profiles/billing/billing.component';
import { OverviewComponent } from './afterLogin/company/company_creation/overview/overview.component';
import { StartSellingComponent } from './afterLogin/company/start-selling/start-selling.component';
import { AfterloginComponent } from './afterLogin/afterlogin/afterlogin.component';
import { CompanyCreationNavbarComponent } from './afterLogin/company/company_creation/company-creation-navbar/company-creation-navbar.component';
import { CompanyInfoComponent } from './afterLogin/company/company_creation/company-info/company-info.component';
import { CompanyOverviewComponent } from './afterLogin/company/company-overview/company-overview.component';
import { CompanyUiComponent } from './afterLogin/company/company-ui/company-ui.component';
import { CompanyNavbarComponent } from './afterLogin/company/company-navbar/company-navbar.component';
import { CompanyOrdersComponent } from './afterLogin/company/company-orders/company-orders.component';
import { EarningsComponent } from './afterLogin/company/earnings/earnings.component';
import { AnalyticsComponent } from './afterLogin/company/analytics/analytics.component';
import { CreateServiceComponent } from './afterLogin/company/create-service/create-service.component';
import { EditServiceComponent } from './afterLogin/company/edit-service/edit-service.component';
import { InboxComponent } from './afterLogin/company/inbox/inbox.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { SendMessageComponent } from './afterLogin/send-message/send-message.component';
import { UnderReviewComponent } from './afterLogin/company/company_creation/under-review/under-review.component';
import { NotificationBarComponent } from './afterLogin/notification-bar/notification-bar.component';
import { Orders1Component } from './afterLogin/orders1/orders1.component';
import { AddreviewComponent } from './afterLogin/addreview/addreview.component';
import { PaymentComponent } from './afterLogin/payment/payment.component';
import {CloudinaryModule} from '@cloudinary/ng';
import { CompanyNameComponent } from './afterLogin/company-name/company-name.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { AdminAnalyticsComponent } from './admin/admin-analytics/admin-analytics.component';
import { AdminCompaniesComponent } from './admin/admin-companies/admin-companies.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminHelpComponent } from './admin/admin-help/admin-help.component';
import { AdminReportsComponent } from './admin/admin-reports/admin-reports.component';
import { AdminLogsComponent } from './admin/admin-logs/admin-logs.component';
import { AdminServicesComponent } from './admin/admin-services/admin-services.component';
import { DatePipe } from '@angular/common';






export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FoooterComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    VerfCodeComponent,
    NewpasswordComponent,
    SpinkitComponent,
    PricingComponent,
    ContactComponent,
    ServicesComponent,
    Navbar1Component,
    ServicesListComponent,
    DetailsComponent,
    CategoryComponent,
    PercentLineComponent,
    ReviewsComponent,
    RecomondationComponent,
    ProfileComponent,
    EditProfileComponent,
    SecurityComponent,
    NotificationComponent,
    BillingComponent,
    OverviewComponent,
    StartSellingComponent,
    AfterloginComponent,
    CompanyCreationNavbarComponent,
    CompanyInfoComponent,
    CompanyOverviewComponent,
    CompanyUiComponent,
    CompanyNavbarComponent,
    CompanyOrdersComponent,
    EarningsComponent,
    AnalyticsComponent,
    CreateServiceComponent,
    EditServiceComponent,
    InboxComponent,
    SendMessageComponent,
    UnderReviewComponent,
    NotificationBarComponent,
    Orders1Component,
    AddreviewComponent,
    PaymentComponent,
    CompanyNameComponent,
    AdminComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    SidebarComponent,
    AdminAnalyticsComponent,
    AdminCompaniesComponent,
    AdminUsersComponent,
    AdminHelpComponent,
    AdminReportsComponent,
    AdminLogsComponent,
    AdminServicesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NgxCaptchaModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    PickerModule,
    CloudinaryModule
  ],
  providers: [ 
    ServicesComponent ,
    CompanyUiComponent,
    SendMessageComponent,
    CompanyOverviewComponent,
    InboxComponent,
    NotificationBarComponent,
    AdminLoginComponent,
    DatePipe
],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA // add this line to the schemas array
  ]
})
export class AppModule { 
  
}
