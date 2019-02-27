import { Injectable } from '@angular/core';
import { LogManagedService } from './log-managed.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/request/usuario';
import {loginUserUrl, logoutUserUrl, usersActionsUrl } from './url';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserLogged } from '../models/userLogged';
import { Logout } from '../models/request/logout';
import { DataEncryptionService } from './data-encryption.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  actionsRole:Array<string>=[];
  
  protected userSession: UserLogged=null;



  constructor(private http: HttpClient, private logService: LogManagedService) { }

  getHttpOptionsFormData() {
    // let x = JSON.parse(localStorage.getItem('tokenUser'));
    let x = this.userSession;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Authorization': 'Bearer ' + x.token
      })
    };
    return httpOptions;
  }



  getHttpOptions() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      })
    };
    // let x = JSON.parse(localStorage.getItem('tokenUser'));
    let x = this.userSession;
    if (x != null) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Authorization': 'Bearer ' + x.token
        })
      };

    }
    return httpOptions;

  }

  isLogged(){
    // let x = JSON.parse(localStorage.getItem('tokenUser'));
    if(this.userSession!=null){
      return true;
    }
    return false;
  }

  clearSessionLogin(){
    this.userSession=null;
    // localStorage.removeItem('tokenUser');
  }

  setUserLogged(x: UserLogged) {
    this.userSession=x;
    // localStorage.setItem('tokenUser', JSON.stringify(x));
  }


  getLocalUserLogged() {
    return this.userSession;
    // return JSON.parse(localStorage.getItem('tokenUser'));
  }

  getUserToken(data: Usuario) {
    return this.http.post<Usuario>(loginUserUrl, data, this.getHttpOptions()).pipe(
      
    );
  }

  signOutUser(data:Logout){
    return this.http.post<Logout>(logoutUserUrl, data, this.getHttpOptions()).pipe(
      );
  }

  getUserActions(data:any){
   return this.http.post<any>(usersActionsUrl, data, this.getHttpOptions()).pipe(
    );
  }

  setActionsRole(x:any){
    this.actionsRole=x;
  }

  getActionsRole(action:string){
    // console.log(this.actionsRole);
    // console.log("INDICE:"+this.actionsRole.indexOf(action));
    if(this.actionsRole.indexOf(action)==-1){
      return false;
    }else{
      return true;
    }
  }

  keepSession(){
    if(this.userSession!=null){
      localStorage.setItem('tokenUser', JSON.stringify(this.userSession));
    }
  }
  recoverSession():boolean{
    if(localStorage.getItem('tokenUser')!=null){
      this.userSession=JSON.parse(localStorage.getItem('tokenUser'));
      return true;
    }
    else{
      return false;
    }
  }

}
