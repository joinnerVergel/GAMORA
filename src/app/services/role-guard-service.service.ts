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
    let routeRedirect:any[]=['/'];

    // Esta validacion es util cuando se recarga la pagina para que recupere la sesion 
    // desde el localStorage en caso de que exista
    if (this.loginService.getLocalUserLogged() == null) {
      if(this.loginService.recoverSession()){
        console.log(this.loginService.getLocalUserLogged().token);
        console.log("Sesion Recuperada");
      }else{
        // si no se pudo recuperar la sesion se redirecionara al login
        routeRedirect=['/login'];
        console.log("No existe sesion activa");
      }
    }
    // limpia el local Storage
    localStorage.clear();

    //Esta validacion se realiza para identificar si el rol del usuario le permite el acceso 
    // a la pagina que esta intentando cargar
    if (this.loginService.getLocalUserLogged() != null) {
      let token = this.loginService.getLocalUserLogged().token;
      let tokenPayload = decode(token);
      let role = tokenPayload['RolUsuario'];
      let expectedRoleArray = route.data;
      expectedRoleArray = expectedRoleArray.expectedRole;

      if (expectedRoleArray.indexOf(role) != -1) {
        return true;
      }
    }

    this.logService.addMessage("Acceso denegado. No tiene permisos para acceder a esta ruta.", "danger");
    console.log("Acceso Denegado");
    this.router.navigate(routeRedirect);
    return false;
  }

}
