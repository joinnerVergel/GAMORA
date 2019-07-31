import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-manage-brands',
  templateUrl: './manage-brands.component.html',
  styleUrls: ['./manage-brands.component.css']
})
export class ManageBrandsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // alert(this.router.url);
  }

  getFixedClass(){
    if(this.router.url.includes("/manage-brands/fixed",0)){
      return "active";
    }
    return "";
  }

  getMobileClass(){
    if(this.router.url.includes("/manage-brands/mobile",0)){
      return "active";
    }
    return "";
  }

  getSclClass(){
    if(this.router.url.includes("/manage-brands/scl",0)){
      return "active";
    }
    return "";
  }
  getDavoxClass(){
    if(this.router.url.includes("/manage-brands/davox",0)){
      return "active";
    }
    return "";
  }

}
