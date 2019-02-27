import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import * as decode from 'jwt-decode';
import { LogManagedService } from './log-managed.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardServiceService implements CanActivate {

  constructor(private logService: LogManagedService, private router: Router, private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    // let token = localStorage.getItem('tokenUser');
    // console.log("SSSSSSSSSSSSSS");
    // console.log(this.loginService.getLocalUserLogged());
    if (this.loginService.getLocalUserLogged() == null) {
      console.log(this.loginService.recoverSession()==true?"Sesion recuperada":"Sesion vencida");
    }
    localStorage.clear();
    if (this.loginService.getLocalUserLogged() != null) {
      
    
      let token = this.loginService.getLocalUserLogged().token;
      let tokenPayload = decode(token);
      let role = tokenPayload['RolUsuario'];
      // console.log(role);

      let expectedRoleArray = route.data;
      expectedRoleArray = expectedRoleArray.expectedRole;

      if (expectedRoleArray.indexOf(role) != -1) {
        // console.log("Acceso Autorizado");
        return true;
      }
    }
    this.logService.addMessage("Acceso denegado. No tiene permisos para acceder a esta ruta.", "danger");
    console.log("Acceso Denegado");
    this.router.navigate(['/']);
    return false;
  }

}
