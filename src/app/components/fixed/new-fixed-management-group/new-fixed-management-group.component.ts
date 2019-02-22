import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { ManagementGroupsService } from 'src/app/services/management-groups.service';
import { Brands } from 'src/app/models/brands';
import { Filtros } from 'src/app/models/request/filtro';
import { FiltroGrupo } from 'src/app/models/request/FiltroGrupo';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-new-fixed-management-group',
  templateUrl: './new-fixed-management-group.component.html',
  styleUrls: ['./new-fixed-management-group.component.css']
})
export class NewFixedManagementGroupComponent implements OnInit {

  newManagementGroupForm: FormGroup;
  submitted = false;
  filterIcon = faFilter;

  brandsList: Array<Brands> = new Array<Brands>();

  fitersList: Array<Filtros> = [];

  quantityClients:number=0;
  age: string = null;
  ageCondition: string = null;
  ageValidation: boolean = false;


  

  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private formBuilder: FormBuilder, private mGroupsService: ManagementGroupsService,
    private logService: LogManagedService,private router: Router,private loginService: LoginService) { 
      // this.requestQry();
    }

  ngOnInit() {
    if(!this.loginService.isLogged()){
      this.router.navigate(['/login']);
    }
    this.newManagementGroupForm = this.formBuilder.group({
      groupName: ['', Validators.required],
     // Age: ['', Validators.required],
    });
    this.requestQry();
    this.readItemsBrandsList();
  }


  // convenience getter for easy access to form fields
  get f() { return this.newManagementGroupForm.controls; }

  Validation() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newManagementGroupForm.invalid || !this.ageValidation) {
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
      this.requestIns();
    } else {
      this.modalService.dismissAll();
    }
  }

  setAge(textAge: string) {
    this.age = textAge;
    console.log("EDAD DE MORA:" + this.age);
  }
  setAgeCondition(textAgeCondition: string) {
    this.ageCondition = textAgeCondition;
    console.log("CONDICION DE EDAD:" + this.ageCondition);
  }

  ageValidationChange(x: boolean) {
    this.ageValidation = x;
    console.log("VALIDACION EDAD:"+this.ageValidation);
  }


  readItemsBrandsList() {
    this.mGroupsService.getItemsBrandsList(1)
      .subscribe(
        item => {
          this.brandsList = Array<Brands>();
          let x = item;
          if (item.hasOwnProperty('MarcasOpcionesResult')) {
            const elementList = item['MarcasOpcionesResult'];
            elementList.forEach(element => {
              let elementBrand: Brands = new Brands();
              elementBrand.brand = element['Marca'];
              elementBrand.dateCreated = element['FecCreacion'];
              elementBrand.dateUpdate = element['FecActualiza'];
              elementBrand.state = element['Estado'];
              elementBrand.quantity = element['Cantidad'];
              elementBrand.options = element['MarcaOpcionesLista'];
              this.brandsList.push(elementBrand);
            });
            // console.log(this.brandsList);
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401){             
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  addItemList(filter: Filtros) {
    this.fitersList.push(filter);
    this.requestQry();
    console.log("AGREGO FILTRO: "+ filter.FiltroNombre);
    console.log(this.fitersList);
  }
  removeItemList(filter: Filtros) {
    this.fitersList = this.fitersList.filter(item => (item.FiltroNombre != filter.FiltroNombre ||item.FiltroTipo != filter.FiltroTipo ||item.FiltroValor!=filter.FiltroValor));
    this.requestQry();
    console.log("REMOVIO FILTRO: "+ filter.FiltroNombre);
    console.log(this.fitersList);
  }

  removeFilterFixed(filter: Filtros){
    this.fitersList = this.fitersList.filter(item => (item.FiltroNombre != filter.FiltroNombre || item.FiltroTipo != filter.FiltroTipo));
    this.requestQry();
    console.log("REMOVIO FILTRO: "+ filter.FiltroNombre);
    console.log(this.fitersList);
  }

  removeFilterSingle(filter: Filtros){
    this.fitersList = this.fitersList.filter(item => (item.FiltroNombre != filter.FiltroNombre || item.FiltroTipo != filter.FiltroTipo));
    console.log("REMOVIO FILTRO: "+ filter.FiltroNombre);
    console.log(this.fitersList);
  }


  requestQry(){
    
    let firstAge:string=this.age+"";
    let lastAge:string=null;
    
    if (firstAge=="" || firstAge=="null"){
      firstAge=null;
    }

    if(firstAge!= null && firstAge.indexOf("*")!=-1){
      let age_:string[]=firstAge.split("*");
      firstAge=age_[0];
      lastAge=age_[1];
    }
    let FiltroGrupo: FiltroGrupo={idTipoOperacion:1,NombreGrupo:"",EdadMoraInicial:firstAge,EdadMoraFinal:lastAge,PrioridadBasica:null,ListaFiltros:this.fitersList,tipoTransaccion:101};
    var suscripcion = this.mGroupsService.getClientsQuantity(FiltroGrupo)
      .subscribe(
        respuesta => {
          if(respuesta["State"]){
            this.quantityClients=respuesta["Msg"];
          }else{
            this.logService.addMessage(respuesta["Msg"],"warning");
          }
        }, error => {
          console.log(error);
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401){             
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  requestIns(){
    let firstAge:string=this.age+"";
    let lastAge:string=null;
    if (firstAge==""){
      firstAge=null;
    }
    console.log(firstAge);
    
    if(firstAge!= null && firstAge.indexOf("*")!=-1){
      let age_:string[]=firstAge.split("*");
      firstAge=age_[0];
      lastAge=age_[1];
    }
    let FiltroGrupo: FiltroGrupo={idTipoOperacion:1,NombreGrupo:this.f.groupName.value,EdadMoraInicial:firstAge,EdadMoraFinal:lastAge,PrioridadBasica:null,ListaFiltros:this.fitersList,tipoTransaccion:1002};
    var suscripcion = this.mGroupsService.setManagementGroup(FiltroGrupo)
      .subscribe(
        respuesta => {
          this.modalService.dismissAll();
          if(respuesta["State"]){
            this.logService.addMessage(respuesta["Msg"],"success");
          }else{
            this.logService.addMessage(respuesta["Msg"],"warning");
          }
          this.router.navigate(['/management-groups/fixed']);
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401){            
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

}
