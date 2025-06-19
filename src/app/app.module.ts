import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { RegisterComponent } from './register/register.component';
import { ActivateaccountComponent } from './activateaccount/activateaccount.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent,
    RegisterComponent,
    ActivateaccountComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
