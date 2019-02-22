import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filtros } from 'src/app/models/request/filtro';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import { FixedFilterService } from 'src/app/services/fixed-filter.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-segment-filter',
  templateUrl: './segment-filter.component.html',
  styleUrls: ['./segment-filter.component.css']
})
export class SegmentFilterComponent implements OnInit {

  iconADD=faPlusSquare;
  filterFixedForm: FormGroup;
  classSelected: string = "inactive";
  classFilterSelected: string = "";
  itemFilter: Filtros = { FiltroNombre: "segmento", FiltroValor: "", FiltroTipo: "Fijo" };
  validation: boolean = false;
  btnAddView:boolean=false;

  segmentsList:Array<string>=new Array<string>();
  segmentsSelected:Array<string>=new Array<string>();

  @Input() operationType: number;
  @Output() removeItem: EventEmitter<Filtros> = new EventEmitter<Filtros>();
  @Output() addItem: EventEmitter<Filtros> = new EventEmitter<Filtros>();

 constructor(private formBuilder: FormBuilder, private filterFixedService:FixedFilterService,
   private router: Router,  private loginService: LoginService) { }

  ngOnInit() {
    this.filterFixedForm = this.formBuilder.group({
      segmentsSelect: ['', Validators.required],
    });
    this.requestSegmentsList();
  }

  // convenience getter for easy access to form fields
  get f() { return this.filterFixedForm.controls; }

  toggleItem() {
    this.validationControl();
    if (this.classFilterSelected == "active") {
      this.classSelected = "inactive";
      this.classFilterSelected = "";
      this.segmentsSelected.forEach(element => {
        this.itemFilter={ FiltroNombre: "segmento", FiltroValor: element, FiltroTipo: "Fijo" };
        // console.log(itemFilter);
        this.removeItem.emit(this.itemFilter);
      });
    } else {
      this.classSelected = "";
      this.classFilterSelected = "active";
      this.segmentsSelected.forEach(element => {
        this.itemFilter={ FiltroNombre: "segmento", FiltroValor: element, FiltroTipo: "Fijo" };
        // console.log(itemFilter);
        this.addItem.emit(this.itemFilter);
      });
    }
  }

  validationControl() {
    if (this.segmentsSelected.length==0) {
      this.validation = false;
    } else {
      this.validation = true;
    }
  }

  addSegment(){
    if(this.segmentsSelected.indexOf(this.f.segmentsSelect.value)==-1){
      this.segmentsSelected.push(this.f.segmentsSelect.value);
      this.itemFilter={ FiltroNombre: "segmento", FiltroValor: this.f.segmentsSelect.value, FiltroTipo: "Fijo" };
      this.addItem.emit(this.itemFilter);
    }
    this.validationControl();
  }

  removeSegment(d:string){
    if (this.segmentsSelected.indexOf(d) !== -1) {
        this.segmentsSelected.splice(this.segmentsSelected.indexOf(d), 1);
        this.itemFilter={ FiltroNombre: "segmento", FiltroValor: d, FiltroTipo: "Fijo" };
        this.removeItem.emit(this.itemFilter);
    }  
    this.validationControl();
  }

  change(){
    if(this.f.segmentsSelect.value==""){
      this.btnAddView=false;
    }else{
      this.btnAddView=true;
    }
  }


  requestSegmentsList(){
    this.filterFixedService.getSegmentsList(this.operationType)
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaResult')) {
            const elementList = item['listaGenericaResult'];
            elementList.forEach(element => {
              this.segmentsList.push(element['Id']);
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
