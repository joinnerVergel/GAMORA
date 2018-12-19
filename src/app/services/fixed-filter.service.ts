import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogManagedService } from './log-managed.service';
import { departmentsListUrl, segmentsListUrl, tenuresListUrl, regionalsListUrl } from './url';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class FixedFilterService {

  activeExclusionaryComponent:string='';

  constructor(private http: HttpClient, private logService :LogManagedService,private loginService: LoginService) { }

  getDepartmentList() {
    return this.http.get(departmentsListUrl,this.loginService.getHttpOptions());
  }

  getSegmentsList() {
    return this.http.get(segmentsListUrl,this.loginService.getHttpOptions());
  }
  getTenurestList() {
    return this.http.get(tenuresListUrl,this.loginService.getHttpOptions());
  }
  getRegionalsList() {
    return this.http.get(regionalsListUrl,this.loginService.getHttpOptions());
  }

  setActiveExclusionaryComponent(x : string){
    this.activeExclusionaryComponent=x;
  }
  getActiveExclusionaryComponent(){
    return this.activeExclusionaryComponent;
  }
}
