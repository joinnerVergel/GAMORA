import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentCanDeactivate } from 'src/app/services/pending-changes-guard.service';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements ComponentCanDeactivate  {

  constructor(private router: Router,private loginService: LoginService) { }


  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    this.loginService.keepSession();
    return true;
  }


}
