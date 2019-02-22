import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogManagedService } from './log-managed.service';
import { departmentsListUrl, mf_segmentsListUrl, mf_tenuresListUrl, regionalsListUrl } from './url';
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

  getSegmentsList(operation:number) {
    return this.http.get(mf_segmentsListUrl+operation,this.loginService.getHttpOptions());
  }
  getTenurestList(operation:number) {
    return this.http.get(mf_tenuresListUrl+operation,this.loginService.getHttpOptions());
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
