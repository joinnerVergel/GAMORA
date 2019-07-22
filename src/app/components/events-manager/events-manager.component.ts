import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-events-manager',
  templateUrl: './events-manager.component.html',
  styleUrls: ['./events-manager.component.css']
})
export class EventsManagerComponent implements OnInit {

  constructor(private router: Router, public modalService: NgbModal) { }

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

  getSclClass(){
    if(this.router.url.includes("/events-manager/scl",0)){
      return "active";
    }
    return "";
  }

 

  ViewModal(content) {
    this.modalService.open(content,{ windowClass : "myCustomModalClass"});
  }


}
