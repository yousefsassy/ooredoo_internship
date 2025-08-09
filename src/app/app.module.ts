import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { RegisterComponent } from './register/register.component';
import { ActivateaccountComponent } from './activateaccount/activateaccount.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserListComponent } from './user-list/user-list.component';

import { CommonModule } from '@angular/common';
import { RegisterChefzoneComponent } from './register-chefzone/register-chefzone.component';
import { RegisterAdminshopComponent } from './register-adminshop/register-adminshop.component';
import { ShopComponent } from './shop/shop.component';
import { ZoneComponent } from './zone/zone.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ZoneListComponent } from './zone-list/zone-list.component';
import { ShopListComponent } from './shop-list/shop-list.component';

import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ShopEditComponent } from './shop-edit/shop-edit.component';
import { NgChartsModule } from 'ng2-charts';
import { ZoneEditComponent } from './zone-edit/zone-edit.component';
import { RegionComponent } from './region/region.component';
import { SecteurComponent } from './secteur/secteur.component';
import { RegisterChefsecteurComponent } from './register-chefsecteur/register-chefsecteur.component';
import { RegisterChefregionComponent } from './register-chefregion/register-chefregion.component';
import { SecteurListComponent } from './secteur-list/secteur-list.component';
import { SecteurDetailsComponent } from './secteur-details/secteur-details.component';
import { RegionListComponent } from './region-list/region-list.component';
import { ReportCreateComponent } from './report-create/report-create.component';
import { ReceivedReportsComponent } from './received-reports/received-reports.component';
import { ZoneRegionComponent } from './zone-region/zone-region.component';
import { RegionShopComponent } from './region-shop/region-shop.component';

import { DashboardRegionComponent } from './dashboard-region/dashboard-region.component';
import { DashboardChefzoneComponent } from './dashboard-chefzone/dashboard-chefzone.component';
import { DashboardAdminshopComponent } from './dashboard-adminshop/dashboard-adminshop.component';
import { DashboardChefsecteurComponent } from './dashboard-chefsecteur/dashboard-chefsecteur.component';
import { SectorZoneComponent } from './sector-zone/sector-zone.component';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { CreatereprtsAdminComponent } from './createreprts-admin/createreprts-admin.component';
import { FillReportComponent } from './fill-report/fill-report.component';
import { ZoneDetailsComponent } from './zone-details/zone-details.component';
import { RegionDetailsComponent } from './region-details/region-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReportDetailsComponent } from './report-details/report-details.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent,
    RegisterComponent,
    ActivateaccountComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HeaderComponent,
    FooterComponent,
    UserListComponent,
    RegisterChefzoneComponent,
    RegisterAdminshopComponent,
    ShopComponent,
    ZoneComponent,
    WelcomeComponent,
    ZoneListComponent,
    ShopListComponent,
    
   
    DashboardAdminComponent,
    ShopDetailsComponent,
    ShopEditComponent,
    ZoneEditComponent,
    RegionComponent,
    SecteurComponent,
    RegisterChefsecteurComponent,
    RegisterChefregionComponent,
    SecteurListComponent,
    SecteurDetailsComponent,
    RegionListComponent,
    ReportCreateComponent,
    ReceivedReportsComponent,
    ZoneRegionComponent,
    RegionShopComponent,
    DashboardRegionComponent,
    DashboardChefzoneComponent,
    DashboardAdminshopComponent,
    DashboardChefsecteurComponent,
    SectorZoneComponent,
    ReportsListComponent,
    CreatereprtsAdminComponent,
    FillReportComponent,
    ZoneDetailsComponent,
    RegionDetailsComponent,
    UserDetailsComponent,
    ReportDetailsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DragDropModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
