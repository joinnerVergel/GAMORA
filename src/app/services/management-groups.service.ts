import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LogManagedService } from './log-managed.service';
import { throwError } from 'rxjs';
import { FiltroGrupo } from '../models/request/FiltroGrupo';
import { catchError } from 'rxjs/operators';
import { fixedItemsBrandsListUrl, clientsQuantityUrl, ManagementGroupUrl, groupsFixedIsEditUrl } from './url';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementGroupsService {
  constructor(private http: HttpClient, private logService: LogManagedService,private loginService: LoginService) { }

  getIsEditGroup() {
    return this.http.get(groupsFixedIsEditUrl, this.loginService.getHttpOptions());
  }
  getItemsBrandsList() {
    return this.http.get(fixedItemsBrandsListUrl, this.loginService.getHttpOptions());
  }

  getClientsQuantity(data: FiltroGrupo) {
    return this.http.post<FiltroGrupo>(clientsQuantityUrl, data, this.loginService.getHttpOptions()).pipe(
      
    );
  }

  setManagementGroup(data: FiltroGrupo) {
    return this.http.post<FiltroGrupo>(clientsQuantityUrl, data, this.loginService.getHttpOptions()).pipe(
      
    );
  }

  getManagementGroupList() {
    return this.http.get(ManagementGroupUrl, this.loginService.getHttpOptions());
  }

  deleteManagementGroup(data: FiltroGrupo) {
    return this.http.post<FiltroGrupo>(clientsQuantityUrl, data, this.loginService.getHttpOptions()).pipe(
      
    );
  }

  updateBasicPriorityGroup(data: any) {
    return this.http.post<any>(clientsQuantityUrl, data, this.loginService.getHttpOptions()).pipe(
      
    );
  }

  updateSpecialPriorityGroup(data: any) {
    return this.http.post<any>(clientsQuantityUrl, data, this.loginService.getHttpOptions()).pipe(
      
    );
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
