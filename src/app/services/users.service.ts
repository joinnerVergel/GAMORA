import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogManagedService } from './log-managed.service';
import { LoginService } from './login.service';
import { findUserUrl, usersProfilesUrl, usersAddUrl, usersListUrl, usersStateUrl, usersProfileUpdateUrl } from './url';
import { UserManager } from '../models/request/addUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private logService: LogManagedService, private loginService: LoginService) { }

  findUser(user:string) {
    return this.http.get(findUserUrl+user, this.loginService.getHttpOptions());
  }
  getUsersProfiles() {
    return this.http.get(usersProfilesUrl, this.loginService.getHttpOptions());
  }

  changeUserState(idUser:string) {
    return this.http.put(usersStateUrl+idUser, null,this.loginService.getHttpOptions());
  }


  addUser(data:UserManager): Observable<UserManager> {
    return this.http.post<UserManager>(usersAddUrl, data, this.loginService.getHttpOptions()).pipe(

    );
  }

  updateUserProfile(data:any){
    return this.http.put<any>(usersProfileUpdateUrl, data, this.loginService.getHttpOptions()).pipe(

      );
  }

  getUsersList() {
    return this.http.get(usersListUrl, this.loginService.getHttpOptions());
  }
}
