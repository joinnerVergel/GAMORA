import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filtros } from 'src/app/models/request/filtro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter-debt-value',
  templateUrl: './filter-debt-value.component.html',
  styleUrls: ['./filter-debt-value.component.css']
})
export class FilterDebtValueComponent implements OnInit {

  @Output() removeItemSingle: EventEmitter<Filtros> = new EventEmitter<Filtros>();
  @Output() removeItem: EventEmitter<Filtros> = new EventEmitter<Filtros>();
  @Output() addItem: EventEmitter<Filtros> = new EventEmitter<Filtros>();

  filterSelected: boolean = false;
  classSelected: string = "inactive";
  classFilterSelected: string = "";

  optionsDebtValue = [{ text: "Menor que", value: "m" }, { text: "Mayor que", value: ">" },
  { text: "Menor o igual que", value: "m=" }, { text: "Mayor o igual que", value: ">=" }, { text: "Igual a", value: "=" }];

  filterFixedForm: FormGroup;

  itemFilter: Filtros = { FiltroNombre: "saldo", FiltroValor: "", FiltroTipo: "Fijo" };

  validation: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filterFixedForm = this.formBuilder.group({
      condition: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.filterFixedForm.controls; }


  toggleItem() {
    this.validationControl();
    let valor: string = this.f.condition.value + "-" + this.f.value.value;
    this.itemFilter = { FiltroNombre: "saldo", FiltroValor: valor, FiltroTipo: "Fijo" };
    if (this.classFilterSelected == "active") {
      this.classSelected = "inactive";
      this.classFilterSelected = "";
      this.removeItem.emit(this.itemFilter);
    } else {
      this.classSelected = "";
      this.classFilterSelected = "active";
      if (this.validation) {
        this.addItem.emit(this.itemFilter);
      }
    }
  }

  change() {
    this.validationControl();
    if (this.validation) {
      this.removeItemSingle.emit(this.itemFilter);
    }else{
      this.removeItem.emit(this.itemFilter);
    }
    let valor: string = this.f.condition.value + "-" + this.f.value.value;
    this.itemFilter = { FiltroNombre: "saldo", FiltroValor: valor, FiltroTipo: "Fijo" };
    if (this.validation) {
      this.addItem.emit(this.itemFilter);
    }
  }

  validationControl() {
    let dataValue="*"+this.f.value.value+"*";
    if (this.f.condition.value != "" && (this.f.value.value != "" && this.f.value.value != null || dataValue == "*0*")) {
      this.validation = true;
    } else {
      this.validation = false;
    }
  }
}
