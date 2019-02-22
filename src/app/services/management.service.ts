import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogManagedService } from './log-managed.service';
import { LoginService } from './login.service';
import { mf_calendarListUrl, mf_WorkFlowListUrl, mf_groupsListUrl, mf_managementsAddUrl, mf_managementsListUrl, mf_managementsStateChangeUrl } from './url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(private http: HttpClient, private logService: LogManagedService,private loginService: LoginService) { }

  getCalendarList() {
    return this.http.get(mf_calendarListUrl, this.loginService.getHttpOptions());
  }

  getManagementGroupList(operation:number) {
    return this.http.get(mf_groupsListUrl+operation, this.loginService.getHttpOptions());
  }
  getWorkflowList(operation:number) {
    return this.http.get(mf_WorkFlowListUrl+operation, this.loginService.getHttpOptions());
  }

  getManagementList(operation:number) {
    return this.http.get(mf_managementsListUrl+operation, this.loginService.getHttpOptions());
  }

  addManagement (data: any):Observable<any> {
    return this.http.post<any>(mf_managementsAddUrl, data, this.loginService.getHttpOptions()).pipe(
      
    );
  }

  changeStateManagement(data:any):Observable<any> {
    return this.http.post<any>(mf_managementsStateChangeUrl, data, this.loginService.getHttpOptions()).pipe(
      
    );
  }
}
