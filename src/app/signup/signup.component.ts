import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public http:HttpClient, public route:Router) { }
  name=""
  email=""
  contact_no=""
  password=""

  ngOnInit() {
  }

  addDetails(){
    console.log(this.name,this.email,this.contact_no);
    const userdetail={
      name:this.name,
      email:this.email,
      contact_no:this.contact_no,
      password:this.password
    }
    this.http.post<{message:string,response:any}>('https://stormy-hamlet-50254.herokuapp.com/signup',userdetail)
    .subscribe((response)=>{
      console.log(response);
      this.route.navigate(['/']); 
    });
  }

}
