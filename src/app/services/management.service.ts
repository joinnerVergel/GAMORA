import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogManagedService } from './log-managed.service';
import { LoginService } from './login.service';
import { calendarListUrl, ManagementGroupUrl, fixedWorkFlowListUrl, groupsListUrl, managementsAddUrl, managementsListUrl } from './url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(private http: HttpClient, private logService: LogManagedService,private loginService: LoginService) { }

  getCalendarList() {
    return this.http.get(calendarListUrl, this.loginService.getHttpOptions());
  }

  getManagementGroupList() {
    return this.http.get(groupsListUrl, this.loginService.getHttpOptions());
  }
  getWorkflowList() {
    return this.http.get(fixedWorkFlowListUrl, this.loginService.getHttpOptions());
  }

  getManagementList() {
    return this.http.get(managementsListUrl, this.loginService.getHttpOptions());
  }

  addManagement (data: any):Observable<any> {
    return this.http.post<any>(managementsAddUrl, data, this.loginService.getHttpOptions()).pipe(
      
    );
  }
}
