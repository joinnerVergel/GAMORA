import { Component, OnInit } from '@angular/core';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  divMenuClassLayout="col-md-3";
  divBodyClassLayout="col-md-9";
  constructor(private logService: LogManagedService,private loginService: LoginService,private router: Router) { }

  ngOnInit() {
    
  }

  divClassLayoutChange(x: boolean){
    if(x){
      this.divMenuClassLayout="col-md-3"
      this.divBodyClassLayout="col-md-9";
    }else{
      this.divMenuClassLayout="col-md-1"
      this.divBodyClassLayout="col-md-11";
    }
  }
}


