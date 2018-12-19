import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filtros } from 'src/app/models/request/filtro';
import { FixedFilterService } from 'src/app/services/fixed-filter.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-regional-filter',
  templateUrl: './regional-filter.component.html',
  styleUrls: ['./regional-filter.component.css']
})
export class RegionalFilterComponent implements OnInit {

  iconADD = faPlusSquare;
  filterFixedForm: FormGroup;
  itemFilter: Filtros = { FiltroNombre: "regional", FiltroValor: "", FiltroTipo: "Fijo" };
  validation: boolean = false;
  btnAddView: boolean = false;

  regionalsList: Array<string> = new Array<string>();
  regionalsSelected: Array<string> = new Array<string>();

  previousClass: string = "";

  @Output() removeItem: EventEmitter<Filtros> = new EventEmitter<Filtros>();
  @Output() addItem: EventEmitter<Filtros> = new EventEmitter<Filtros>();

  constructor(private formBuilder: FormBuilder, private filterFixedService: FixedFilterService, 
    private router: Router,  private loginService: LoginService) { }

  ngOnInit() {
    this.filterFixedForm = this.formBuilder.group({
      regionalsSelect: ['', Validators.required],
    });
    this.requestRegionalsList();
  }

  // convenience getter for easy access to form fields
  get f() { return this.filterFixedForm.controls; }

  toggleItem() {
    this.validationControl();
    if (this.filterFixedService.getActiveExclusionaryComponent() == '' || this.filterFixedService.getActiveExclusionaryComponent() == 'departments') {
      this.filterFixedService.setActiveExclusionaryComponent('regionals');
    } else {
      this.filterFixedService.setActiveExclusionaryComponent('');
    }
  }

  validationControl() {
    if (this.regionalsSelected.length == 0) {
      this.validation = false;
    } else {
      this.validation = true;
    }
  }

  addRegional() {
    if (this.regionalsSelected.indexOf(this.f.regionalsSelect.value) == -1) {
      this.regionalsSelected.push(this.f.regionalsSelect.value);
      this.itemFilter = { FiltroNombre: "regional", FiltroValor: this.f.regionalsSelect.value, FiltroTipo: "Fijo" };
      this.addItem.emit(this.itemFilter);
    }
    this.validationControl();
  }

  removeRegional(d: string) {
    if (this.regionalsSelected.indexOf(d) !== -1) {
      this.regionalsSelected.splice(this.regionalsSelected.indexOf(d), 1);
      this.itemFilter = { FiltroNombre: "regional", FiltroValor: d, FiltroTipo: "Fijo" };
      this.removeItem.emit(this.itemFilter);
    }
    this.validationControl();
  }

  change() {
    if (this.f.regionalsSelect.value == "") {
      this.btnAddView = false;
    } else {
      this.btnAddView = true;
    }
  }


  requestRegionalsList() {
    this.filterFixedService.getRegionalsList()
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaResult')) {
            const elementList = item['listaGenericaResult'];
            elementList.forEach(element => {
              this.regionalsList.push(element['Id']);
            });
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401){             this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }


  operationRegionalsList(operation: string) {
    if (operation == "remove") {
      this.regionalsSelected.forEach(element => {
        this.itemFilter = { FiltroNombre: "regional", FiltroValor: element, FiltroTipo: "Fijo" };
        // console.log(itemFilter);
        this.removeItem.emit(this.itemFilter);
      });
    }
    if (operation == "add") {
        this.regionalsSelected.forEach(element => {
          this.itemFilter={ FiltroNombre: "regional", FiltroValor: element, FiltroTipo: "Fijo" };
          // console.log(itemFilter);
          this.addItem.emit(this.itemFilter);
        });
    }

  }

  getClassComponent(x: number) {
    if (x == 0) {
      if (this.filterFixedService.getActiveExclusionaryComponent() == 'regionals') {
        if (this.previousClass != "active") {
          this.operationRegionalsList("add");
          console.log("Cambió Regional a activo");
        }
        this.previousClass = "active";
        return "active";
      } else {
        if (this.previousClass != "") {
          this.operationRegionalsList("remove");
          console.log("Cambió Regional a inactivo");
        }
        this.previousClass = "";
        return "";
      }
    }
    if (x == 1) {
      if (this.filterFixedService.getActiveExclusionaryComponent() == 'regionals') {
        return "";
      } else {
        return "inactive";
      }
    }
  }


}
