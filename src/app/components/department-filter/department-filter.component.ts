import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filtros } from 'src/app/models/request/filtro';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import { FixedFilterService } from 'src/app/services/fixed-filter.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-department-filter',
  templateUrl: './department-filter.component.html',
  styleUrls: ['./department-filter.component.css']
})
export class DepartmentFilterComponent implements OnInit {

  iconADD=faPlusSquare;
  filterFixedForm: FormGroup;
  itemFilter: Filtros = { FiltroNombre: "depto", FiltroValor: "", FiltroTipo: "Fijo" };
  validation: boolean = false;
  btnAddView:boolean=false;

  departmentsList:Array<string>=new Array<string>();
  departmentsSelected:Array<string>=new Array<string>();

  previousClass:string="";

  @Output() removeItem: EventEmitter<Filtros> = new EventEmitter<Filtros>();
  @Output() addItem: EventEmitter<Filtros> = new EventEmitter<Filtros>();


 constructor(private formBuilder: FormBuilder, private filterFixedService:FixedFilterService, 
  private router: Router,  private loginService: LoginService) { }

  ngOnInit() {
    this.filterFixedForm = this.formBuilder.group({
      departmentsSelect: ['', Validators.required],
    });
    this.requestDepartmentsList();
  }

  // convenience getter for easy access to form fields
  get f() { return this.filterFixedForm.controls; }

  toggleItem() {
    this.validationControl();
    if(this.filterFixedService.getActiveExclusionaryComponent()=='' || this.filterFixedService.getActiveExclusionaryComponent()=='regionals'){
      this.filterFixedService.setActiveExclusionaryComponent('departments');
    }else{
        this.filterFixedService.setActiveExclusionaryComponent('');
    }
  }

  validationControl() {
    if (this.departmentsSelected.length==0) {
      this.validation = false;
    } else {
      this.validation = true;
    }
  }

  addDepartment(){
    if(this.departmentsSelected.indexOf(this.f.departmentsSelect.value)==-1){
      this.departmentsSelected.push(this.f.departmentsSelect.value);
      this.itemFilter={ FiltroNombre: "depto", FiltroValor: this.f.departmentsSelect.value, FiltroTipo: "Fijo" };
      this.addItem.emit(this.itemFilter);
    }
    this.validationControl();
  }

  removeDepartment(d:string){
    if (this.departmentsSelected.indexOf(d) !== -1) {
        this.departmentsSelected.splice(this.departmentsSelected.indexOf(d), 1);
        this.itemFilter={ FiltroNombre: "depto", FiltroValor: d, FiltroTipo: "Fijo" };
        this.removeItem.emit(this.itemFilter);
    }  
    this.validationControl();
  }

  change(){
    if(this.f.departmentsSelect.value==""){
      this.btnAddView=false;
    }else{
      this.btnAddView=true;
    }
  }


  requestDepartmentsList(){
    this.filterFixedService.getDepartmentList()
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaResult')) {
            const elementList = item['listaGenericaResult'];
            elementList.forEach(element => {
              this.departmentsList.push(element['Id']);
            });
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401){
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  operationDepartmentsList(operation:string){
    if(operation=="remove"){
      this.departmentsSelected.forEach(element => {
          this.itemFilter={ FiltroNombre: "depto", FiltroValor: element, FiltroTipo: "Fijo" };
          // console.log(itemFilter);
          this.removeItem.emit(this.itemFilter);
        });
    }
    if(operation=="add"){
      this.departmentsSelected.forEach(element => {
        this.itemFilter={ FiltroNombre: "depto", FiltroValor: element, FiltroTipo: "Fijo" };
        // console.log(itemFilter);
        this.addItem.emit(this.itemFilter);
      });
    }
    
  }
  

  getClassComponent(x:number){
    if(x==0){
      if(this.filterFixedService.getActiveExclusionaryComponent()=='departments'){
        if(this.previousClass!="active"){
          this.operationDepartmentsList("add");
          console.log("Cambió Departamentos a activo");
        }
        this.previousClass="active";
        return "active";
      }else{
        if(this.previousClass!=""){
          this.operationDepartmentsList("remove");
          console.log("Cambió Departamentos a inactivo");
        }
        this.previousClass="";
        return "";
      }
    }
    if(x==1){
      if(this.filterFixedService.getActiveExclusionaryComponent()=='departments'){
        return "";
      }else{
        return "inactive";
      }
    }
  }


}
