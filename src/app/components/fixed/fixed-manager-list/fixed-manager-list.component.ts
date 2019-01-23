import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/services/management.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fixed-manager-list',
  templateUrl: './fixed-manager-list.component.html',
  styleUrls: ['./fixed-manager-list.component.css']
})
export class FixedManagerListComponent implements OnInit {

  managementList: Array<any> = [];
  playIcon = faPlay;
  pauseIcon = faPause;
  stopIcon = faStop;
  managementStateChange: any = {};

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
    this.managementService.getManagementList()
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
              elementManagement.nameWorkflow = element['NombreFlujo'];
              elementManagement.nameManagement = element['NombreGestion'];
              elementManagement.nameGroup = element['NombreGrupo'];
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
}
