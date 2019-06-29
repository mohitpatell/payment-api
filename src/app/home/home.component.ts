import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public service:CommonService) { }
  loggedIn:boolean;
  logincheck:Subscription;

  payment:boolean;
  paymentcheck:Subscription;


  test:boolean;
  ngOnInit() {
    this.loggedIn=this.service.isLoggedIn;
    this.payment=this.service.payment;
    
    console.log("Logged Status",this.loggedIn);
    console.log("Payment Status",this.payment);

    this.logincheck=this.service.userAuthLitsener()
    .subscribe(response=>{
      console.log("Response",response);
      this.loggedIn=response.status
    })

    this.paymentcheck=this.service.userpaymentLitsener()
    .subscribe(response=>{
      console.log("Response",response);
      this.payment=response.status
    })

  }

  logout(){
    this.service.logout();
  }

}
