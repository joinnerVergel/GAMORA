import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getFixedClass(){
    if(this.router.url.includes("/manager/fixed",0)){
      return "active";
    }
    return "";
  }

  getMobileClass(){
    if(this.router.url.includes("/manager/mobile",0)){
      return "active";
    }
    return "";
  }
}
