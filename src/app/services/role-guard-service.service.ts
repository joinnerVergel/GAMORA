import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import * as decode from 'jwt-decode';
import { LogManagedService } from './log-managed.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardServiceService implements CanActivate {

  constructor(private logService: LogManagedService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    let token = localStorage.getItem('tokenUser');
    let tokenPayload = decode(token);
    let role = tokenPayload['RolUsuario'];
    // console.log(role);
    
    let expectedRoleArray = route.data;
     expectedRoleArray = expectedRoleArray.expectedRole;
    
    if(expectedRoleArray.indexOf(role)!=-1){
      // console.log("Acceso Autorizado");
      return true;
    }
    this.logService.addMessage("Acceso denegado. No tiene permisos para acceder a esta ruta.", "danger");
    console.log("Acceso Denegado");
    this.router.navigate(['/']);
    return false;
  }

}
