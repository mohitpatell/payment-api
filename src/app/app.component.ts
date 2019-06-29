import { Component, OnInit } from '@angular/core';
import { CommonService } from './Services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public service:CommonService) { }
  ngOnInit(){
    this.service.checkLocalStorage();
  }
}
