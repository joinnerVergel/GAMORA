import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogManagedService } from './log-managed.service';
import { portfolioDetailUrl, managementDailyEventsUrl, monitoringConsoleUrl } from './url';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PortfoliosService {

  constructor(private http: HttpClient, private logService: LogManagedService, private loginService: LoginService, private router: Router) { }

  getPortfolioDetail(operation:number) {
    return this.http.get(portfolioDetailUrl+operation, this.loginService.getHttpOptions());
  }
  getManagementDailyEvents() {
    return this.http.get(managementDailyEventsUrl, this.loginService.getHttpOptions());
  }
  getMonitoring(x:string) {
    return this.http.get(monitoringConsoleUrl+x+"/", this.loginService.getHttpOptions());
  }
  getDashboard(x:string,filtro:string) {
    return this.http.get(monitoringConsoleUrl+x+"/"+filtro, this.loginService.getHttpOptions());
  }
}
