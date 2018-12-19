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

  

  constructor(private http: HttpClient, private logService: LogManagedService) { }

  getHttpOptionsFormData() {
    let x = JSON.parse(localStorage.getItem('tokenUser'));
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Authorization': 'Bearer ' + x['token']
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
    let x = JSON.parse(localStorage.getItem('tokenUser'));
    if (x != null) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Authorization': 'Bearer ' + x['token']
        })
      };

    }
    return httpOptions;

  }

  isLogged(){
    let x = JSON.parse(localStorage.getItem('tokenUser'));
    if(x!=null){
      return true;
    }
    return false;
  }

  clearSessionLogin(){
    localStorage.removeItem('tokenUser');
  }

  setUserLogged(x: UserLogged) {
    localStorage.setItem('tokenUser', JSON.stringify(x));
  }

  getLocalUserLogged() {
    return JSON.parse(localStorage.getItem('tokenUser'));
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

  setActionsRole(x: Array<string>){
    this.actionsRole=x;
  }
  getActionsRole(action:string){
    // console.log(this.actionsRole);
    // console.log("INDICE:"+this.actionsRole.indexOf(action));
    if(this.actionsRole.indexOf(action)==-1){
      return false;
    }
    return true;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // console.error('An error occurred:', error.error.message);
      this.logService.addMessage("Ha ocurrido un error al intentar comunicarse con el servidor", "danger");
    } else {
      this.logService.addMessage("La comunicacion con el servidor ha devuelto un error", "danger");
    }
    // return an observable with a user-facing error message
    return throwError(
      'Lo sentimos... algo ha salido mal; por favor intente mas tarde.');
  };
}
