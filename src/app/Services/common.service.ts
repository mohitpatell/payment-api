import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
    providedIn:"root"
})

export class CommonService {
    public isLoggedIn:boolean=false;
    private token=null;
    public authLitsener=new Subject <{status:boolean}>();
    public payment:boolean=false;
    public paymentLitsener=new Subject <{status:boolean}>();

    constructor(public http:HttpClient, public route:Router){}
    getToken(){
        return this.token;
    }

    public userAuthLitsener(){
        return this.authLitsener.asObservable()
    }

    login(temp){
        const logindetail={
            email:temp.email,
            password:temp.password
          }
        this.http.post<{message:string,token:any,payment_status:any}>('https://stormy-hamlet-50254.herokuapp.com/login',logindetail)
        .subscribe((response)=>{
          console.log(response);
          this.token=response.token
          if(this.token){
              localStorage.setItem('hacktoken',this.token);
              this.isLoggedIn=true,
              this.authLitsener.next({
                  status:this.isLoggedIn
              })
              this.route.navigate(['/']);
              if(response.payment_status){
                    this.payment=true
                    localStorage.setItem('payment_status','true')
                    this.paymentLitsener.next({
                        status:this.payment
                    })
              }
          }
          
        });
    }

    checkLocalStorage(){
        this.token=localStorage.getItem('hacktoken');
        if(this.token){
            this.isLoggedIn=true,
              this.authLitsener.next({
                  status:this.isLoggedIn
              })
              if(localStorage.getItem('payment_status')==='true'){
                this.payment=true
                localStorage.setItem('payment_status','true')
                this.paymentLitsener.next({
                    status:this.payment
                })
              }
        }
        else{
            return;
        }
    }

    stripePayment(temp){

        const obj = {
            token: temp.token,
            email: temp.email,
            amount:  temp.amount
          }
          console.log(obj)
        
        this.http.post<{message:string,status:any}>("https://stormy-hamlet-50254.herokuapp.com/pay",obj ).subscribe( response => {
            console.log("---- Transaction Data -----");
            console.log(response);
            if(response.status){
                this.payment=true
                localStorage.setItem('payment_status','true')
                this.paymentLitsener.next({
                    status:this.payment
                })
                this.route.navigate(['/']);
            }
          });
    }
    public userpaymentLitsener(){
        return this.paymentLitsener.asObservable()
    }

    logout(){
        this.payment=false;
        this.paymentLitsener.next({
            status:this.payment
        })
        this.isLoggedIn=false,
        this.authLitsener.next({
            status:this.isLoggedIn
        })
        localStorage.clear();
    }


}