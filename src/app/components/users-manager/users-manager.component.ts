import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faTrashAlt, faSave, faUndo, faEdit, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { EventsManagerService } from 'src/app/services/events-manager.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';
import { UserManager } from 'src/app/models/request/addUser';
import { Profiles } from 'src/app/models/profiles';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.css']
})
export class UsersManagerComponent implements OnInit {

  newUserForm: FormGroup;
  stateUserForm:FormGroup;
  submitted = false;
  newUserFormView: boolean = false;
  userSearchResult: UserManager = { Contrasena: null, Estado: false, IdUsuario: null, NombreUsuario: null, Notas: null, Usuario: null, UsuarioMail: null, UsuarioMovil: null, RolUsuario: null };
  profilesList: Array<Profiles> = Array<Profiles>();
  usersList: Array<UserManager> = Array<UserManager>();
  userEdit:string=null;
  profileChangeSelected:string="1";

  deleteIcon = faTrashAlt;
  saveIcon = faSave;
  backIcon = faUndo;
  editIcon = faPencilAlt;
  dtOptions: any = {};
  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private logService: LogManagedService, private eventsService: EventsManagerService,
    private router: Router, private loginService: LoginService, private usersService: UsersService) { }

  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    }
    this.newUserForm = this.formBuilder.group({
      netUser: ['', Validators.required],
      profilesSelect: ['', Validators.required]
    });

    this.readUsersProfilesList();
    this.readUsersList();
  }

  // convenience getter for easy access to form fields
  get f() { return this.newUserForm.controls; }

  Validation() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newUserForm.invalid || this.userSearchResult.NombreUsuario == null) {
      return false;
    }
    return true;
  }

  open(content) {
    let validate: boolean = this.Validation();
    if (validate) {
      this.modalService.open(content);
    }
  }

  action(x: boolean) {
    if (x) {
      this.addUser();
    } else {
      this.modalService.dismissAll();
    }
  }

  toggleFormNewUser() {
    this.newUserFormView = !this.newUserFormView;
    this.userSearchResult = { Contrasena: null, Estado: false, IdUsuario: null, NombreUsuario: null, Notas: null, Usuario: null, UsuarioMail: null, UsuarioMovil: null, RolUsuario: null };
    this.newUserForm.reset();
    this.submitted = false;
  }

  findNetUser() {
    if (this.f.netUser.value != "" && this.f.netUser.value != null) {
      this.userSearchResult = { Contrasena: null, Estado: false, IdUsuario: null, NombreUsuario: null, Notas: null, Usuario: null, UsuarioMail: null, UsuarioMovil: null, RolUsuario: null };
      this.usersService.findUser(this.f.netUser.value)
        .subscribe(
          item => {
            if (item.hasOwnProperty('BuscarUsuarioLDAPResult')) {
              const element = item['BuscarUsuarioLDAPResult'];
              if (element['Estado']) {
                this.userSearchResult.Estado = element['Estado'];
                this.userSearchResult.IdUsuario = element['IdUsuario'];
                this.userSearchResult.NombreUsuario =element['NombreUsuario'];
                this.userSearchResult.Notas = element['Notas'];
                this.userSearchResult.Usuario = element['Usuario'];
                this.userSearchResult.UsuarioMail = element['UsuarioMail'];
                this.userSearchResult.UsuarioMovil = element['UsuarioMovil'];
              } else {
                this.logService.addMessage(element['Notas'], "warning");
              }
              console.log(this.profilesList);
            }
            
            
            // console.log(this.userSearchResult);
          }, error => {
            if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
              this.loginService.clearSessionLogin();
              this.router.navigate(['/login']);
            }
          });
    }
  }
  readUsersProfilesList() {
    this.usersService.getUsersProfiles()
      .subscribe(
        item => {
          this.profilesList = Array<Profiles>();
          if (item.hasOwnProperty('listaGenericaResult')) {
            const elementList = item['listaGenericaResult'];
            elementList.forEach(element => {
              let elementProfile: Profiles = new Profiles();
              elementProfile.id = element['Id'];
              elementProfile.profile = element['Valor'];
              this.profilesList.push(elementProfile);
            });
            console.log(this.profilesList);
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  addUser() {
    let data: UserManager = this.userSearchResult;
    data.RolUsuario = this.f.profilesSelect.value;
    this.usersService.addUser(data)
      .subscribe(
        respuesta => {
          if (respuesta["State"]) {
            this.logService.addMessage(respuesta["Msg"], "success");
          } else {
            this.logService.addMessage(respuesta["Msg"], "warning");
          }
          this.modalService.dismissAll();
          this.toggleFormNewUser();
          this.readUsersList();
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });

  }


  readUsersList() {
    this.usersService.getUsersList()
      .subscribe(
        item => {
          this.usersList = new Array<UserManager>();
          if (item.hasOwnProperty('ListaUsuariosAplicacionResult')) {
            const elementList = item['ListaUsuariosAplicacionResult'];
            elementList.forEach(element => {
              let elementUser: UserManager = { Contrasena: null, Estado: false, IdUsuario: null, NombreUsuario: null, Notas: null, Usuario: null, UsuarioMail: null, UsuarioMovil: null, RolUsuario: null };
              // elementUser.item = x++;
              elementUser.Estado = element['Estado'];
              elementUser.IdUsuario = element['IdUsuario'];
              elementUser.NombreUsuario = element['NombreUsuario'];
              elementUser.Notas = element['Notas'];
              elementUser.Usuario = element['Usuario'];
              elementUser.UsuarioMail = element['UsuarioMail'];
              elementUser.UsuarioMovil = element['UsuarioMovil'];
              elementUser.RolUsuario = element['RolNombre'];
              this.usersList.push(elementUser);
            });
          }

          console.log(this.usersList);
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  readVisibilityActions(data:string){
    // console.log(this.loginService.getActionsRole(data));
    return this.loginService.getActionsRole(data);
  }

  dataChange(idUser:string){
    let ok: boolean=false;
    this.usersService.changeUserState(idUser)
      .subscribe(
        respuesta => {
          if (respuesta["State"]) {
            this.logService.addMessage(respuesta["Msg"], "success");
            ok=true;
          } else {
            this.logService.addMessage(respuesta["Msg"], "warning");
          }
          
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        },
        () =>{
          if(ok){
            this.readUsersList();
          }
        }
        );

  }

  viewEditUser(x : UserManager){
    this.profilesList.forEach(element => {
      if(element.profile==x.RolUsuario){
        this.profileChangeSelected=element.id.toString();
      }
    });
    this.userEdit=x.Usuario;
    // console.log("PERFIL:"+this.profileChangeSelected+" USUARIO:"+this.userEdit);
  }

}
