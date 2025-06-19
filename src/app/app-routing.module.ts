import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { RegisterComponent } from './register/register.component';
import { ActivateaccountComponent } from './activateaccount/activateaccount.component';

const routes: Routes = [

  {
            path:'login',
            component:LoginComponent},
            {
            path:'test',
            component:TestComponent},
            
             {path:'register',
              component:RegisterComponent},
              {path:'activateaccount',
              component:ActivateaccountComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
