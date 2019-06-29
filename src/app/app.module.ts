import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StripePaymentComponent } from './stripe-payment/stripe-payment.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';

import {Headerinterceptor} from './interceptor/HeaderInterceptor'
import { NgxStripeModule } from 'ngx-stripe';
import { PaidComponent } from './paid/paid.component';
import { NotPaidComponent } from './not-paid/not-paid.component';
const routes: Routes=[
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'payment',
    component:StripePaymentComponent
  },
  {
    path:'Paid',
    component:PaidComponent
  },
  {
    path:'notPaid',
    component:NotPaidComponent
  },
  {
    path:'**',
    component:HomeComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StripePaymentComponent,
    HomeComponent,
    SignupComponent,
    PaidComponent,
    NotPaidComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule,
    FormsModule,

    NgxStripeModule.forRoot('pk_test_ul5zqjTYvWdy5MhHAPaSVVsC00Ist42jOg'),

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: Headerinterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
