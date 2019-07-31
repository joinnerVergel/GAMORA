import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // alert(this.router.url);
  }

  getFixedClass(){
    if(this.router.url.includes("/workflow/fixed",0)){
      return "active";
    }
    return "";
  }

  getMobileClass(){
    if(this.router.url.includes("/workflow/mobile",0)){
      return "active";
    }
    return "";
  }

  getSclClass(){
    if(this.router.url.includes("/workflow/scl",0)){
      return "active";
    }
    return "";
  }
  getDavoxClass(){
    if(this.router.url.includes("/workflow/davox",0)){
      return "active";
    }
    return "";
  }

}
