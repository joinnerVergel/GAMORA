import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { mf_dicountsListUrl, mf_dicountsSaveUrl } from './url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RONAnConfigurationService {

  constructor(private http: HttpClient,private loginService: LoginService) { }

  getDiscountsList() {
    return this.http.get(mf_dicountsListUrl, this.loginService.getHttpOptions());
  }

  saveDiscounts(d:Array<any>){
    return this.http.post<any>(mf_dicountsSaveUrl, d, this.loginService.getHttpOptions()).pipe(
      
      );
  }
}
