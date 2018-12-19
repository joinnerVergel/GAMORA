import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-developing',
  templateUrl: './developing.component.html',
  styleUrls: ['./developing.component.css']
})
export class DevelopingComponent implements OnInit {

  constructor(private router: Router,private loginService: LoginService) { }

  ngOnInit() {
    if(!this.loginService.isLogged()){
      this.router.navigate(['/login']);
    }
  }

}
