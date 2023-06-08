import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterloginComponent } from './afterLogin/afterlogin/afterlogin.component';
import { CompanyOverviewComponent } from './afterLogin/company/company-overview/company-overview.component';
import { CompanyUiComponent } from './afterLogin/company/company-ui/company-ui.component';
import { CompanyInfoComponent } from './afterLogin/company/company_creation/company-info/company-info.component';
import { OverviewComponent } from './afterLogin/company/company_creation/overview/overview.component';
import { StartSellingComponent } from './afterLogin/company/start-selling/start-selling.component';
import { DetailsComponent } from './afterLogin/details/details.component';
import { BillingComponent } from './afterLogin/profiles/billing/billing.component';
import { EditProfileComponent } from './afterLogin/profiles/edit-profile/edit-profile.component';
import { NotificationComponent } from './afterLogin/profiles/notification/notification.component';

import { ProfileComponent } from './afterLogin/profiles/profile/profile.component';
import { SecurityComponent } from './afterLogin/profiles/security/security.component';
import { ServicesListComponent } from './afterLogin/services-list/services-list.component';
import { ServicesComponent } from './afterLogin/services/services.component';
import { ContactComponent } from './contact/contact.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { PricingComponent } from './pricing/pricing.component';
import { SignupComponent } from './signup/signup.component';
import { VerfCodeComponent } from './verf-code/verf-code.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CompanyOrdersComponent } from './afterLogin/company/company-orders/company-orders.component';
import { EarningsComponent } from './afterLogin/company/earnings/earnings.component';
import { AnalyticsComponent } from './afterLogin/company/analytics/analytics.component';
import { CreateServiceComponent } from './afterLogin/company/create-service/create-service.component';
import { EditServiceComponent } from './afterLogin/company/edit-service/edit-service.component';
import { InboxComponent } from './afterLogin/company/inbox/inbox.component';
import { UnderReviewComponent } from './afterLogin/company/company_creation/under-review/under-review.component';
import { Orders1Component } from './afterLogin/orders1/orders1.component';
import { AddreviewComponent } from './afterLogin/addreview/addreview.component';
import { PaymentComponent } from './afterLogin/payment/payment.component';
import { CompanyNameComponent } from './afterLogin/company-name/company-name.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminAnalyticsComponent } from './admin/admin-analytics/admin-analytics.component';
import { AdminCompaniesComponent } from './admin/admin-companies/admin-companies.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminHelpComponent } from './admin/admin-help/admin-help.component';
import { AdminReportsComponent } from './admin/admin-reports/admin-reports.component';
import { AdminLogsComponent } from './admin/admin-logs/admin-logs.component';
import { AdminServicesComponent } from './admin/admin-services/admin-services.component';

const routes: Routes = [
  {path:"",component:HomeComponent,outlet:"primary",children:[
    {path:"",component:WelcomeComponent},
  {path:"login",component:LoginComponent},
  {path:"join",component:SignupComponent},
  {path:"reset",component:ForgetPasswordComponent},
  {path:"verificationcode",component:VerfCodeComponent},
  {path:"newpassword",component:NewpasswordComponent},
  {path:"pricing",component:PricingComponent},
  {path:'contact',component:ContactComponent},
  ]},
  
  {path:'s',component:AfterloginComponent,children:[
    {path:'start_selling',component:StartSellingComponent,children:[
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {path:'overview',component:OverviewComponent},
      {path:'company_info',component:CompanyInfoComponent}
    ]},
    {path:"seller",component:CompanyOverviewComponent,children:[
      {path: '', component:CompanyUiComponent},
      {path: 'orders', component:CompanyOrdersComponent},
      {path: 'earnings', component:EarningsComponent},
      {path: 'analytics', component:AnalyticsComponent},
      {path: 'addservice', component:CreateServiceComponent},
      {path: 'editservice/:serviceId', component:EditServiceComponent},
      {path: 'inbox', component:InboxComponent},
      {path: 'under_review', component:UnderReviewComponent},
    ]},
    {path:"",component:ServicesComponent,outlet:"primary",children:[
      {path:'',component:ServicesListComponent},
      {path:'profile',component:ProfileComponent,children:[
        { path: '', redirectTo: 'editprofile', pathMatch: 'full' },
        {path:'editprofile',component:EditProfileComponent},
        {path:'security',component:SecurityComponent},
        {path:'notification',component:NotificationComponent},
        {path:'billing',component:BillingComponent},
      ]},
      {path:'inbox',component:InboxComponent},
      {path:'orders',component:Orders1Component},
      {path:'company/:companyId',component:CompanyNameComponent},
      {path:'payment/:paymentid',component:PaymentComponent},
      {path:'review/:id',component:AddreviewComponent},
      {path:':ServiceId',component:DetailsComponent},
    ]},
  ]}, 
  {path:"admin",component:AdminComponent,children:[
    {path:"login",component:AdminLoginComponent},
    {path:"DashBoard",component:AdminDashboardComponent,children:[
      {path:'', redirectTo: 'users', pathMatch: 'full' },
      {path:'analytics',component:AdminAnalyticsComponent},
      {path:'companies',component:AdminCompaniesComponent},
      {path:'users',component:AdminUsersComponent},
      {path:'services',component:AdminServicesComponent},
      {path:'help',component:AdminHelpComponent},
      {path:'reports',component:AdminReportsComponent},
      {path:'logs',component:AdminLogsComponent},
    ]},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
