import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { RegisterComponent } from './register/register.component';
import { ActivateaccountComponent } from './activateaccount/activateaccount.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserListComponent } from './user-list/user-list.component';
import { RegisterAdminshopComponent } from './register-adminshop/register-adminshop.component';
import { RegisterChefzoneComponent } from './register-chefzone/register-chefzone.component';
import { ZoneComponent } from './zone/zone.component';
import { ShopComponent } from './shop/shop.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ZoneListComponent } from './zone-list/zone-list.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ShopEditComponent } from './shop-edit/shop-edit.component';
import { ZoneEditComponent } from './zone-edit/zone-edit.component';
import { RegisterChefsecteurComponent } from './register-chefsecteur/register-chefsecteur.component';
import { RegisterChefregionComponent } from './register-chefregion/register-chefregion.component';
import { SecteurComponent } from './secteur/secteur.component';
import { SecteurListComponent } from './secteur-list/secteur-list.component';
import { SecteurDetailsComponent } from './secteur-details/secteur-details.component';
import { RegionListComponent } from './region-list/region-list.component';
import { RegionComponent } from './region/region.component';
import { ReportCreateComponent } from './report-create/report-create.component';
import { ReceivedReportsComponent } from './received-reports/received-reports.component';

import { RegionShopComponent } from './region-shop/region-shop.component';
import { DashboardRegionComponent } from './dashboard-region/dashboard-region.component';
import { DashboardChefzoneComponent } from './dashboard-chefzone/dashboard-chefzone.component';
import { ZoneRegionComponent } from './zone-region/zone-region.component';
import { DashboardAdminshopComponent } from './dashboard-adminshop/dashboard-adminshop.component';
import { DashboardChefsecteurComponent } from './dashboard-chefsecteur/dashboard-chefsecteur.component';
import { SectorZoneComponent } from './sector-zone/sector-zone.component';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { CreatereprtsAdminComponent } from './createreprts-admin/createreprts-admin.component';
import { FillReportComponent } from './fill-report/fill-report.component';
import { ZoneDetailsComponent } from './zone-details/zone-details.component';
import { RegionDetailsComponent } from './region-details/region-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ReportDetailsComponent } from './report-details/report-details.component';

const routes: Routes = [

  {
            
            path:'login',
            component:LoginComponent},
            { path: '', component: WelcomeComponent },
            {
            path:'test',
            component:TestComponent},
            
             {path:'register',
              component:RegisterComponent},
              {path:'activateaccount',
              component:ActivateaccountComponent},
              {path:'ForgotPassword',
              component:ForgotPasswordComponent},
              {
  path: 'ResetPassword',
  component: ResetPasswordComponent
},

{
  path: 'reset-password/:token',
  component: ResetPasswordComponent
},
{
  path: 'user-list',
  component: UserListComponent
},

{ path: 'users/:id', component: UserDetailsComponent },

{ path: 'shop/details/:id', component: ShopDetailsComponent },
  { path: 'shop/edit/:id', component: ShopEditComponent },

{
  path: 'register-adminshop',
  component: RegisterAdminshopComponent
},
{
  path: 'register-chefzone',
  component: RegisterChefzoneComponent
},
{
  path: 'zone',
  component: ZoneComponent
},

{ path: 'zones/:id', component: ZoneDetailsComponent },
{
  path: 'shop',
  component: ShopComponent
},
{
  path: 'zone-list',
  component: ZoneListComponent
},
{
  path: 'shop-list',
  component: ShopListComponent
},

{
  path: 'myShop',
  component: DashboardAdminshopComponent
},
{
  path: 'DashboardAdmin',
  component: DashboardAdminComponent
},

{ path: 'zones/edit/:id', component: ZoneEditComponent },

{
  path: 'register-chefsecteur',
  component: RegisterChefsecteurComponent
},
{
  path: 'register-chefregion',
  component: RegisterChefregionComponent
},
{
  path: 'secteur',
  component: SecteurComponent
},
{
  path: 'secteur-list',
  component: SecteurListComponent},


{
  path: 'secteurs/:id',
  component: SecteurDetailsComponent
}
,
{
  path: 'region-list',
  component: RegionListComponent},

  { path: 'regions/:id', component: RegionDetailsComponent },
  
  
{
  path: 'region',
  component: RegionComponent},
{
  path: 'create-report',
  component: ReportCreateComponent},

  {
  path: 'received-reports',
  component: ReceivedReportsComponent} ,



  { path: 'shops-in-region', component: RegionShopComponent },
  {
  path: 'dashboardRegion',
  component: DashboardRegionComponent}
,
  {
  path: 'dashboardChefZone',
  component: DashboardChefzoneComponent}
  ,
  {
  path: 'regionInZone',
  component: ZoneRegionComponent},

{
  path: 'dashboardChefSecteur',
  component: DashboardChefsecteurComponent}
  ,

{
  path: 'sector-zone',
  component: SectorZoneComponent},
  { path: 'reports-list', component: ReportsListComponent },
  { path: 'createreports-admin', component: CreatereprtsAdminComponent },
  { path: 'fill-report/:id', component: FillReportComponent },
  { path: 'report-details/:idReport', component: ReportDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
