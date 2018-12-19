import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogManagedService } from './log-managed.service';
import { portfolioDetailUrl } from './url';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PortfoliosService {

  constructor(private http: HttpClient, private logService: LogManagedService, private loginService: LoginService,private router: Router) { }

  getFixedPortfolioDetail() {
      return this.http.get(portfolioDetailUrl, this.loginService.getHttpOptions());
  }
}
