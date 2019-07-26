import { Component, OnInit, HostListener } from '@angular/core';
import { faPlay, faPause, faStop, faEye } from '@fortawesome/free-solid-svg-icons';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagementService } from 'src/app/services/management.service';
import { ComponentCanDeactivate } from 'src/app/services/pending-changes-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-scl-manager-list',
  templateUrl: './scl-manager-list.component.html',
  styleUrls: ['./scl-manager-list.component.css']
})
export class SclManagerListComponent implements OnInit, ComponentCanDeactivate {

  managementList: Array<any> = [];
  playIcon = faPlay;
  pauseIcon = faPause;
  stopIcon = faStop;
  managementStateChange: any = {};
  viewContainerHistory: boolean = false;
  editIcon = faEye;
  nameManager_V: string;
  nameGroup_V: string;
  obj_history:any;

  constructor(private logService: LogManagedService, private router: Router, private loginService: LoginService,
    private managementService: ManagementService, private modalService: NgbModal) { }

  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    }
    else {
      this.readManagementList();
    }
  }

  readVisibilityActions(data: string) {
    // console.log(this.loginService.getActionsRole(data));
    return this.loginService.getActionsRole(data);
  }

  readManagementList() {
    let x: number = 1;
    this.managementService.getManagementList(3)
      .subscribe(
        item => {
          this.managementList = new Array<any>();
          if (item.hasOwnProperty('ListarGestionesResult')) {
            const elementList = item['ListarGestionesResult'];
            elementList.forEach(element => {
              let elementManagement: any = {};
              elementManagement.item = x++;
              elementManagement.idManagement = element['IdGestion'];
              elementManagement.state = element['Controles'];
              elementManagement.createdBy = element['CreadoPor'];
              elementManagement.dateActivation = element['FecActivacion'];
              elementManagement.dateCreated = element['FecCreacion'];
              elementManagement.idWorkflow = element['idFlujo'];
              elementManagement.nameWorkflow = element['NombreFlujo'];
              elementManagement.nameManagement = element['NombreGestion'];
              elementManagement.idGroup = element['idGrupo'];
              elementManagement.nameGroup = element['NombreGrupo'];
              elementManagement.history = element['Historico'];
              this.managementList.push(elementManagement);
            });
          }

        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }
  action(x: boolean) {
    if (x) {
      this.dataChange();
    } else {
      this.readManagementList();
      this.modalService.dismissAll();
    }
  }
  open(content, m) {
    this.managementStateChange = m;
    this.modalService.open(content);
  }
  dataChange() {
    if (this.readVisibilityActions('EDITAR_GESTION')) {
      let x: any = this.managementStateChange;
      let ok: boolean = false;
      let data: any = { idGestion: x.idManagement, transaccion: x.state, IdTipoOperacion: 3 }
      this.managementService.changeStateManagement(data)
        .subscribe(
          respuesta => {
            if (respuesta["State"]) {
              this.logService.addMessage(respuesta["Msg"], "success");
              ok = true;
            } else {
              this.logService.addMessage(respuesta["Msg"], "warning");
            }

          }, error => {
            if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
              this.loginService.clearSessionLogin();
              this.router.navigate(['/login']);
            }
          },
          () => {
            if (ok) {
              this.readManagementList();
              this.modalService.dismissAll();

            }
          }
        );
    }
  }

  workflowView(contentWorkflow, name: string, manager: string, x_obj:any) {
    this.nameGroup_V = name;
    this.nameManager_V = manager;
    this.obj_history=x_obj;
    this.modalService.open(contentWorkflow,{ windowClass : "myCustomModalClass"});
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    this.loginService.keepSession();
    return true;
  }
}