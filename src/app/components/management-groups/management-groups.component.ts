import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-management-groups',
  templateUrl: './management-groups.component.html',
  styleUrls: ['./management-groups.component.css']
})
export class ManagementGroupsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getFixedClass(){
    if(this.router.url.includes("/management-groups/fixed",0)){
      return "active";
    }
    return "";
  }

  getMobileClass(){
    if(this.router.url.includes("/management-groups/mobile",0)){
      return "active";
    }
    return "";
  }

}
