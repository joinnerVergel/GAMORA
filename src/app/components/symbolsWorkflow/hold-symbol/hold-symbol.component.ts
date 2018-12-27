import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { faClock, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { SymbolsService } from 'src/app/services/symbols.service';
import { LogManagedService } from 'src/app/services/log-managed.service';

@Component({
  selector: 'app-hold-symbol',
  templateUrl: './hold-symbol.component.html',
  styleUrls: ['./hold-symbol.component.css']
})
export class HoldSymbolComponent implements OnInit, AfterViewInit {

  @Input() data: any;
  nameSymbol: string = "hold";
  clockIcon = faClock;
  propertiesIcon = faCaretRight;
  viewProperties: boolean = false;
  holdForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private symbolsService: SymbolsService, private logService: LogManagedService) { }

  ngOnInit() {
    this.holdForm = this.formBuilder.group({
      value: [1, Validators.required],
    });

  }
  ngAfterViewInit() {
    let pos = $('div[idrefsymbol="' + this.data.refSymbol + '"]').position();
    let objSymbol: any = { IdSimbolo: this.data.refSymbol, Nombre: "HOLD", NodoSucesor: null, TiempoEspera: this.f.value.value, IdTipoSimbolo: 2, CoordenadaX: pos.left, CoordenadaY: pos.top };
    this.symbolsService.addSymbol(objSymbol);
  }

  // convenience getter for easy access to form fields
  get f() { return this.holdForm.controls; }

  symbolSelectedChanged() {
    if (this.symbolsService.symbolSelected == this.data.refSymbol) {
      this.symbolsService.symbolSelected = null;
    } else {
      this.symbolsService.symbolSelected = this.data.refSymbol;
    }
  }
  getClassContainer() {
    if (this.symbolsService.symbolSelected == this.data.refSymbol) {
      return "selected";
    } else {
      return "";
    }
  }

  isDraggableSymbol() {
    if (this.symbolsService.symbolSelected == this.data.refSymbol) {
      return true;
    } else {
      return false;
    }
  }

  onMoveEnd() {
    let pos = $('div[idrefsymbol="' + this.data.refSymbol + '"]').position();
    let objSymbol: any = { IdSimbolo: this.data.refSymbol, Nombre: "HOLD", NodoSucesor: null, TiempoEspera: this.f.value.value, IdTipoSimbolo: 2, CoordenadaX: pos.left, CoordenadaY: pos.top };
    this.symbolsService.updateSymbol(objSymbol);
  }

  pointOut() {
    if (!this.symbolsService.occupiedOut(this.data.refSymbol, null)) {
      console.log("CLick en la salida..");
      this.symbolsService.optionOutElement=null;
      this.symbolsService.outElement = this.data.refSymbol;
    }
  }
  pointIn() {
    if (this.symbolsService.outElement != null) {
      if (this.symbolsService.outElement != this.data.refSymbol) {
        if (!this.symbolsService.occupiedIn(this.data.refSymbol)) {
          if (!this.symbolsService.crossReference(this.data.refSymbol)) {
            console.log(this.symbolsService.inElement + "click en entrada" + this.symbolsService.outElement);
            this.symbolsService.inElement = this.data.refSymbol;
            this.symbolsService.ElementConection = true;
          } else {
            this.logService.addMessage("No se admiten referencias cruzadas entre los controles", "warning")
          }

        } else {
          this.logService.addMessage("La entrada de este control esta ocupada...", "warning")
        }
      }
    }
  }

}
