import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filtros } from 'src/app/models/request/filtro';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import { FixedFilterService } from 'src/app/services/fixed-filter.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-tenure-filter',
  templateUrl: './tenure-filter.component.html',
  styleUrls: ['./tenure-filter.component.css']
})
export class TenureFilterComponent implements OnInit {

  iconADD=faPlusSquare;
  filterFixedForm: FormGroup;
  classSelected: string = "inactive";
  classFilterSelected: string = "";
  itemFilter: Filtros = { FiltroNombre: "tenencia", FiltroValor: "", FiltroTipo: "Fijo" };
  validation: boolean = false;
  btnAddView:boolean=false;

  tenuresList:Array<string>=new Array<string>();
  tenuresSelected:Array<string>=new Array<string>();

  @Input() operationType: number;
  @Output() removeItem: EventEmitter<Filtros> = new EventEmitter<Filtros>();
  @Output() addItem: EventEmitter<Filtros> = new EventEmitter<Filtros>();

 constructor(private formBuilder: FormBuilder, private filterFixedService:FixedFilterService,
   private router: Router,  private loginService: LoginService) { }

  ngOnInit() {
    this.filterFixedForm = this.formBuilder.group({
      tenuresSelect: ['', Validators.required],
    });
    this.requestTenuresList();
  }

  // convenience getter for easy access to form fields
  get f() { return this.filterFixedForm.controls; }

  toggleItem() {
    this.validationControl();
    if (this.classFilterSelected == "active") {
      this.classSelected = "inactive";
      this.classFilterSelected = "";
      this.tenuresSelected.forEach(element => {
        this.itemFilter={ FiltroNombre: "tenencia", FiltroValor: element, FiltroTipo: "Fijo" };
        // console.log(itemFilter);
        this.removeItem.emit(this.itemFilter);
      });
    } else {
      this.classSelected = "";
      this.classFilterSelected = "active";
      this.tenuresSelected.forEach(element => {
        this.itemFilter={ FiltroNombre: "tenencia", FiltroValor: element, FiltroTipo: "Fijo" };
        // console.log(itemFilter);
        this.addItem.emit(this.itemFilter);
      });
    }
  }

  validationControl() {
    if (this.tenuresSelected.length==0) {
      this.validation = false;
    } else {
      this.validation = true;
    }
  }

  addTenure(){
    if(this.tenuresSelected.indexOf(this.f.tenuresSelect.value)==-1){
      this.tenuresSelected.push(this.f.tenuresSelect.value);
      this.itemFilter={ FiltroNombre: "tenencia", FiltroValor: this.f.tenuresSelect.value, FiltroTipo: "Fijo" };
      this.addItem.emit(this.itemFilter);
    }
    this.validationControl();
  }

  removeTenure(d:string){
    if (this.tenuresSelected.indexOf(d) !== -1) {
        this.tenuresSelected.splice(this.tenuresSelected.indexOf(d), 1);
        this.itemFilter={ FiltroNombre: "tenencia", FiltroValor: d, FiltroTipo: "Fijo" };
        this.removeItem.emit(this.itemFilter);
    }  
    this.validationControl();
  }

  change(){
    if(this.f.tenuresSelect.value==""){
      this.btnAddView=false;
    }else{
      this.btnAddView=true;
    }
  }


  requestTenuresList(){
    this.filterFixedService.getTenurestList(this.operationType)
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaResult')) {
            const elementList = item['listaGenericaResult'];
            elementList.forEach(element => {
              this.tenuresList.push(element['Id']);
            });
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401){             
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

}
