import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CommonService } from '../Services/common.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service:CommonService) { }
  password=""
  email=""

  ngOnInit() {
  }

  login(){
    const logindetail={
      email:this.email,
      password:this.password
    }
    this.service.login(logindetail)

  }

}
