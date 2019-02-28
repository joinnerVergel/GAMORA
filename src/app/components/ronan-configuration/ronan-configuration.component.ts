import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ronan-configuration',
  templateUrl: './ronan-configuration.component.html',
  styleUrls: ['./ronan-configuration.component.css']
})
export class RonanConfigurationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getDiscountsClass(){
    if(this.router.url.includes("/RONAnConfiguration/discounts",0)){
      return "active";
    }
    return "";
  }

}
