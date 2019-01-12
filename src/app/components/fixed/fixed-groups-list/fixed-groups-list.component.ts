import { Component, OnInit } from '@angular/core';
import { Groups } from 'src/app/models/groups';
import { ManagementGroupsService } from 'src/app/services/management-groups.service';
import { Router } from '@angular/router';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faTrashAlt, faPencilAlt, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import { Filters } from 'src/app/models/filter';
import { FiltroGrupo } from 'src/app/models/request/FiltroGrupo';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-fixed-groups-list',
  templateUrl: './fixed-groups-list.component.html',
  styleUrls: ['./fixed-groups-list.component.css']
})
export class FixedGroupsListComponent implements OnInit {
  deleteIcon = faTrashAlt;
  editIcon = faPencilAlt;
  saveIcon = faSave;
  backIcon = faUndo;

  groupsList: Array<Groups> = Array<Groups>();

  groupDeletedSelected: Groups;
  priorityGroupEdit: string = null;
  basicPriorityGroupSelected: number = null;
  maxPriority:number=0;

  constructor(private manageGroupsService: ManagementGroupsService,
    private logService: LogManagedService, private router: Router,
    config: NgbModalConfig, private modalService: NgbModal, private loginService: LoginService) { }

  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    }
    this.readGroupsList();
  }

  readGroupsList() {
    this.manageGroupsService.getManagementGroupList()
      .subscribe(
        item => {
          this.groupsList = Array<Groups>();
          let x = 1;
          if (item.hasOwnProperty('ListarGruposFijaResult')) {
            const elementList = item['ListarGruposFijaResult'];
            elementList.forEach(element => {
              let elementGroup: Groups = new Groups();
              elementGroup.item = x++;
              elementGroup.name = element['NombreGrupo'];
              elementGroup.debtAge = element['EdadMoraGrupo'];
              elementGroup.dateCreated = this.formatDate(element['FecCreacion']);
              elementGroup.createdBy = element['CreadoPor'];
              elementGroup.accountsQuantity = element['CantidadCuentas'];
              elementGroup.parameters = element['Parametros'];
              elementGroup.fixedFiltersList = new Array<Filters>();
              elementGroup.dinamicFiltersList = new Array<Filters>();
              element['ListaFiltros'].forEach(filter_ => {
                let f: Filters = new Filters();
                f.nameFilter = filter_['FiltroNombre'];
                f.valueFilter = filter_['FiltroValor'];
                f.typeFilter = filter_['FiltroTipo'];
                if (filter_['FiltroTipo'] == "Fijo") {
                  elementGroup.fixedFiltersList.push(f);
                } else {
                  elementGroup.dinamicFiltersList.push(f);
                }
              });

              elementGroup.basicPriority = element['PrioridadBasica'];
              elementGroup.specialPriority = element['PrioridadEspecial'];

              this.groupsList.push(elementGroup);
            });
            this.maxPriority=this.groupsList.length;
            // console.log(this.groupsList);
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  formatDate(dateParam: string) {
    let x = dateParam.substring(dateParam.indexOf("(") + 1, dateParam.indexOf("-0"));
    let dateEpoch = parseInt(x);
    return new Date(dateEpoch);
  };

  deleteGroup(g: Groups) {
    let FiltroGrupo: FiltroGrupo = { NombreGrupo: g.name, EdadMora: null,PrioridadBasica:null, ListaFiltros: [], tipoTransaccion: 3 };
    var suscripcion = this.manageGroupsService.deleteManagementGroup(FiltroGrupo)
      .subscribe(
        respuesta => {
          if (respuesta["State"]) {
            this.logService.addMessage(respuesta["Msg"], "success");
          } else {
            this.logService.addMessage(respuesta["Msg"], "warning");
          }
          this.readGroupsList();
          this.router.navigate(['/management-groups/fixed']);
        });
  };

  open(content) {
    this.modalService.open(content);
  }

  action(x: boolean) {
    if (x) {
      this.deleteGroup(this.groupDeletedSelected);
    }
    this.modalService.dismissAll();
  }

  deleteGroupChange(g: Groups) {
    this.groupDeletedSelected = g;
  }

  formatParameters(x: string) {
    let y: Array<string> = x.split("></filtro> <filtro")
    console.log(y);
    // let items:string="";
    // y.forEach(element => {
    //   items=items+"<div>"+element+"</div>";
    // });
    return y;
  }

  readVisibilityActions(data: string) {
    // console.log(this.loginService.getActionsRole(data));
    return this.loginService.getActionsRole(data);
  }

  viewEditPriority(x: Groups) {
    this.basicPriorityGroupSelected = x.basicPriority;
    this.priorityGroupEdit = x.name;
  }

  getClassSpecialPriority(x: number) {
    if (x == 0) {
      return "inactive";
    }
    return "active";
  }

  updatePriorityGroup(x: Groups) {
    let data: FiltroGrupo = { NombreGrupo: x.name, EdadMora: null,PrioridadBasica:this.basicPriorityGroupSelected, ListaFiltros: [], tipoTransaccion: 4 };
    var suscripcion = this.manageGroupsService.updateBasicPriorityGroup(data)
      .subscribe(
        respuesta => {
          if (respuesta["State"]) {
            this.logService.addMessage(respuesta["Msg"], "success");
          } else {
            this.logService.addMessage(respuesta["Msg"], "warning");
          }
          this.priorityGroupEdit = null;
          this.readGroupsList();
        });
  }
  toogleSpecialPriority(x: Groups) {
    let data: FiltroGrupo = { NombreGrupo: x.name, EdadMora: null,PrioridadBasica:null, ListaFiltros: [], tipoTransaccion: 5 };
    var suscripcion = this.manageGroupsService.updateSpecialPriorityGroup(data)
      .subscribe(
        respuesta => {
          if (respuesta["State"]) {
            this.logService.addMessage(respuesta["Msg"], "success");
          } else {
            this.logService.addMessage(respuesta["Msg"], "warning");
          }
          this.priorityGroupEdit = null;
          this.readGroupsList();
        });
  }

}
