import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { CommonService } from '../Services/common.service';
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.css']
})
export class StripePaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
 
  elementsOptions: ElementsOptions = {
    locale: 'es'
  };
 
  stripeTest: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService, private http:HttpClient,
    public service:CommonService) {}
 
  ngOnInit() {
    this.stripeTest = new FormGroup({
      email: new FormControl(null,{validators:[Validators.required]}),
      name: new FormControl(null,{validators:[Validators.required]}),
      amount: new FormControl(null,{validators:[Validators.required]}),
    })
  }
 
  buy() {
    const name = this.stripeTest.get('name').value;
    const email = this.stripeTest.get('email').value;
    const amount = this.stripeTest.get('amount').value;
    const ownerInfo = {
      owner: {
        name: name,
        email: email
      },
    };
    this.stripeService
      .createSource(this.card.getCard(),ownerInfo)
      .subscribe(result => {
        console.log(result);
        if (result) {
          console.log(result.source.id);
          // const obj = {
          //   token: result.token.id,
          //   email: this.stripeTest.get('email').value,
          //   user: this.stripeTest.get('name').value,
          //   amount: 100,
          //   product: "Dummy Product",
          //   description: "This Payment is for test",
          //   order_id:7879482371,
          //   id:111
          // }
                    const obj = {
            token: result.source.id,
            email: this.stripeTest.get('email').value,
            amount:  this.stripeTest.get('amount').value
          }

//console.log(obj);
this.service.stripePayment(obj);
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

}
