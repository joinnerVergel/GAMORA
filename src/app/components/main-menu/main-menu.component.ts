import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faLayerGroup, faCrosshairs, faIndustry, faUser, faBars, faSignOutAlt, faUsers, faCodeBranch, faSitemap, faGamepad, faChartBar, faFileContract } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/login.service';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { Logout } from 'src/app/models/request/logout';
import { DataEncryptionService } from 'src/app/services/data-encryption.service';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  public isCollapsed = false;
  nameUser: string = "asas";

  homeIcon = faHome;
  groupsIcon = faLayerGroup;
  brandIcon = faCrosshairs;
  eventIcon = faIndustry;
  userIcon = faUser;
  usersIcon = faUsers;
  barIcon = faBars;
  reportsIcon=faChartBar;
  signoutIcon = faSignOutAlt;
  workflowIcon= faSitemap;
  managerIcon= faGamepad;
  agreementIcon= faFileContract;


  @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  titleItemClass = "";

  constructor(private router: Router, private logService: LogManagedService, private loginService: LoginService, private dataEncryption: DataEncryptionService) { }

  ngOnInit() {
    // this.chooseClass();
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    } else {
      this.getActions();
      this.getNameUser();
    }
  }

  chooseClass() {
    // console.log( this.router.isActive);
    // this.router.navigate(['/manage-brands']);
  }

  titleItemClassChange() {
    if (this.titleItemClass == "") {
      this.titleItemClass = "title-collapse";
      this.toggleMenu.emit(false);
    } else {
      this.titleItemClass = "";
      this.toggleMenu.emit(true);
    }
  }

  titleItemClassHover() {
    if (this.titleItemClass == "title-collapse") {
      this.titleItemClassChange();
    }
  }

  titleItemClassDown() {
    if (this.titleItemClass == "") {
      this.titleItemClassChange();
    }
  }
  getNameUser() {
    let x = this.loginService.getLocalUserLogged();
    this.nameUser = this.dataEncryption.decryptionWord(x['key_3']);
  }
  signOut() {
    let x = this.loginService.getLocalUserLogged();
    let user: Logout = { Usuario: x['key_1'] };
    this.loginService.signOutUser(user)
      .subscribe(
        respuesta => {
          if (respuesta["State"]) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
            this.logService.addMessage(respuesta["Msg"], "success");
          } else {
            this.logService.addMessage(respuesta["Msg"], "warning");
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  readVisibilityActions(data: string) {
    // console.log(this.loginService.getActionsRole(data));
    return this.loginService.getActionsRole(data);
  }


  getActions() {
    // let token = localStorage.getItem('tokenUser');
    let token = this.loginService.getLocalUserLogged().token;
    // decode the token to get its payload
    let tokenPayload = decode(token);
    let role = tokenPayload['RolUsuario'];
    let data = { Rol: role }
     console.log(data);
    let ok: boolean = false;
    let x: Array<string> = new Array<string>();
    var suscripcion = this.loginService.getUserActions(data)
      .subscribe(
        item => {
          if (item.hasOwnProperty('FuncionalidadRolResult')) {
            const elementList = item['FuncionalidadRolResult'];
            elementList.forEach(element => {
              x.push(element);
              // console.log(element);
            });
            ok = true;
            // console.log(x);
          }
          // console.log(this.fieldsRequiredList);
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        },
        () => {
          if (ok) {
            this.loginService.setActionsRole(x);
            console.log(this.loginService.actionsRole)
          }
        }
      );

  }
}
