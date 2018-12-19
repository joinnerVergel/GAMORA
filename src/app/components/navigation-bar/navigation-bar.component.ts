import { Component, OnInit } from '@angular/core';
import { LogManagedService } from 'src/app/services/log-managed.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  divMenuClassLayout="col-md-3";
  divBodyClassLayout="col-md-9";
  constructor(private logService: LogManagedService) { }

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


