import { Component, OnInit, HostListener } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { faPlay, faPause, faStop, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/services/management.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentCanDeactivate } from 'src/app/services/pending-changes-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fixed-manager-list',
  templateUrl: './fixed-manager-list.component.html',
  styleUrls: ['./fixed-manager-list.component.css']
})
export class FixedManagerListComponent implements OnInit,ComponentCanDeactivate {

  managementList: Array<any> = [];
  playIcon = faPlay;
  pauseIcon = faPause;
  stopIcon = faStop;
  managementStateChange: any = {};
  viewContainerHistory:boolean=false;
  editIcon=faEye;
  idFlujo_V:number;
  nameManager_V:string;
  nameGroup_V:string;

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
    this.managementService.getManagementList(1)
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
  open(content,m) {
    this.managementStateChange=m;
    this.modalService.open(content);
  }
  dataChange() {
    let x:any= this.managementStateChange;
    let ok: boolean = false;
    let data: any = { idGestion: x.idManagement, transaccion: x.state, IdTipoOperacion: 1 }
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
  
  workflowView(contentWorkflow,id:number,name:string,manager:string){
    this.idFlujo_V=id;
    this.nameGroup_V=name;
    this.nameManager_V=manager;
    this.modalService.open(contentWorkflow);
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    this.loginService.keepSession();
    return true;
  }
}
