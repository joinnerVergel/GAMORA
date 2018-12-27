import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ManagementService } from 'src/app/services/management.service';
import { Groups } from 'src/app/models/groups';
import { Filters } from 'src/app/models/filter';

@Component({
  selector: 'app-new-fixed-management',
  templateUrl: './new-fixed-management.component.html',
  styleUrls: ['./new-fixed-management.component.css']
})
export class NewFixedManagementComponent implements OnInit {

  newManagementForm: FormGroup;
  submitted = false;
  calendarList: Array<any> = [];
  validationCalendar: boolean = false;
  dataCalendar: Array<any> = [];
  groupsList: Array<Groups> = Array<Groups>();
  groupSelected: Groups = new Groups();
  workFlowSelected: any = {};
  workFlowList: Array<any> = Array<any>();

  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private logService: LogManagedService, private router: Router, private loginService: LoginService,
    private managementService: ManagementService) { }

  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    } else {
      this.requestCalendarList();
      this.readGroupsList();
      this.readWorkFlowList();
    }

    this.newManagementForm = this.formBuilder.group({
      managementName: ['', Validators.required],
      groupSelect: ['', Validators.required],
      workflowSelect: ['', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.newManagementForm.controls; }

  Validation() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newManagementForm.invalid) {
      return false;
    }
    return true;
  }
  open(content) {
    let validate: boolean = this.Validation();
    if (validate) {
      if (this.validationCalendar) {
        this.modalService.open(content);
      }


    }
  }

  action(x: boolean) {
    if (x) {
      this.managementAdd();
    } else {
      this.modalService.dismissAll();
    }
  }

  generalKeyPressEvent(key: string, limit: number, control: AbstractControl, validateStrangeCharacters: boolean) {

    if (key == "Enter") {
      return false;
    }
    if (control.value != null) {
      if (control.value.length > limit) {
        return false;
      }
    }
    if (validateStrangeCharacters) {
      let strangeCharacters: string = "|!#$%&/()=?¡¿'*+[]{}^-_:;,.´¨~`°¬<>\\\"@";
      if (strangeCharacters.indexOf(key) != -1) {
        console.log("Caracter Invalido " + key);
        return false;
      }
    }
    return true;
  }

  validationCalendarChange(x: boolean) {
    if (this.dataCalendar.length == 0) {
      this.validationCalendar = false;
    } else {
      this.validationCalendar = x;
    }
  }
  calendarChange(x: any) {
    if (x.checked) {
      this.dataCalendar = this.dataCalendar.filter(cal => cal.IdDiaGestion != x.calendar);
      let data:any={IdDiaGestion:x.calendar,HoraInicio:x.from,HoraFin:x.until}
      this.dataCalendar.push(data);
    } else {
      this.dataCalendar = this.dataCalendar.filter(cal => cal.IdDiaGestion != x.calendar);
    }
    if (this.dataCalendar.length == 0) {
      this.validationCalendar = false;
    }
    console.log(this.dataCalendar);
  }

  requestCalendarList() {
    this.managementService.getCalendarList()
      .subscribe(
        item => {
          if (item.hasOwnProperty('ListarFechasGestionResult')) {
            const elementList = item['ListarFechasGestionResult'];
            this.calendarList = [];
            elementList.forEach(element => {
              let x: any = { id: element['IdDiaGestion'], name: element['DiasGestion'] };
              this.calendarList.push(x);
            });
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  readGroupsList() {
    this.managementService.getManagementGroupList()
      .subscribe(
        item => {
          this.groupsList = Array<Groups>();
          let x = 1;
          if (item.hasOwnProperty('ListarGruposDisponiblesFijaResult')) {
            const elementList = item['ListarGruposDisponiblesFijaResult'];
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

              this.groupsList.push(elementGroup);
            });
            this.f.groupSelect.setValue(this.groupsList[0].name);
            this.changeGroup();

          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }



  changeGroup() {
    this.groupSelected = this.groupsList.filter(g => g.name == this.f.groupSelect.value)[0];
  }

  readWorkFlowList() {
    this.managementService.getWorkflowList()
      .subscribe(
        item => {
          this.workFlowList = Array<any>();
          let x = 1;
          if (item.hasOwnProperty('ListarFlujoResult')) {
            const elementList = item['ListarFlujoResult'];
            elementList.forEach(element => {
              let elementWorkFlow: any = {};
              elementWorkFlow.item = x++;
              elementWorkFlow.nameWorkFlow = element['NombreFlujo'];
              elementWorkFlow.createdBy = element['CreadoPor'];
              elementWorkFlow.dateCreated = this.formatDate(element['FecCreacion']);
              elementWorkFlow.dateUpdate = this.formatDate(element['FecActualizacion']);
              elementWorkFlow.idOperationType = element['IdTipoOperacion'];
              elementWorkFlow.heightPx = element['AltoPx'];
              elementWorkFlow.weightPx = element['AnchoPx'];
              elementWorkFlow.duration = element['Duracion'];
              elementWorkFlow.events = element['Eventos'];
              elementWorkFlow.idWorkFlow = element['IdFlujo'];
              elementWorkFlow.eventsQuantity = element['QEventos'];
              this.workFlowList.push(elementWorkFlow);
            });
            this.f.workflowSelect.setValue(this.workFlowList[0].idWorkFlow);
            this.changeWorkFlow();
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  changeWorkFlow() {
    this.workFlowSelected = this.workFlowList.filter(g => g.idWorkFlow == this.f.workflowSelect.value)[0];
  }

  managementAdd(){
    let data:any={NombreGestion:this.f.managementName.value,NombreGrupo:this.groupSelected.name,NombreFlujo:this.workFlowSelected.nameWorkFlow,IdTipoOperacion:1,GestionCalendario:this.dataCalendar};
    this.managementService.addManagement(data)
      .subscribe(
        respuesta => {
          if(respuesta["State"]){
            this.logService.addMessage(respuesta["Msg"],"success");
          }else{
            this.logService.addMessage(respuesta["Msg"],"warning");
          }
          this.modalService.dismissAll();
          this.router.navigate(['/manager/fixed']);
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401){             
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  formatDate(dateParam: string) {
    let x = dateParam.substring(dateParam.indexOf("(") + 1, dateParam.indexOf("-0"));
    let dateEpoch = parseInt(x);
    return new Date(dateEpoch);
  }

}
