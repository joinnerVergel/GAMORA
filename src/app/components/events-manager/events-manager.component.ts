import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-manager',
  templateUrl: './events-manager.component.html',
  styleUrls: ['./events-manager.component.css']
})
export class EventsManagerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // alert(this.router.url);
  }

  getFixedClass(){
    if(this.router.url.includes("/events-manager/fixed",0)){
      return "active";
    }
    return "";
  }

  getMobileClass(){
    if(this.router.url.includes("/events-manager/mobile",0)){
      return "active";
    }
    return "";
  }

}
