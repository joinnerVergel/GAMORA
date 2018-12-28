import { Component, OnInit, Input, HostListener } from '@angular/core';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SymbolsService } from 'src/app/services/symbols.service';
import * as $ from 'jquery';
import { LogManagedService } from 'src/app/services/log-managed.service';

@Component({
  selector: 'app-event-symbol',
  templateUrl: './event-symbol.component.html',
  styleUrls: ['./event-symbol.component.css']
})
export class EventSymbolComponent implements OnInit {

  @Input() data: any;
  nameSymbol: string = "hold";
  propertiesIcon = faCaretRight;
  viewProperties: boolean = false;
  eventSymbolForm: FormGroup;
  setPosition:any={x:0, y:0};


  constructor(private formBuilder: FormBuilder, private symbolsService: SymbolsService, private logService: LogManagedService) { }

  ngOnInit() {
    this.eventSymbolForm = this.formBuilder.group({
      attempts: [1, Validators.required],
      scheduleSelect: ['AM', Validators.required],
    });
  }

  ngAfterContentInit(){
    //Entra al condicional unicamente luego de la reconstruccion del flujo (cuando se elimina algun símbolo)
    //para ubicar el símbolo en la posicion donde se encontraba anteriormente y setear las propiedades que tenía.
    if (this.data.rebuild) {
      this.setPosition = { x: this.data.symbolData.CoordenadaX, y: this.data.symbolData.CoordenadaY };
      this.f.attempts.setValue(this.data.symbolData.Repeticiones);
      this.f.scheduleSelect.setValue(this.data.symbolData.Horario);
    }
  }  
  ngAfterViewInit() {
    //Entra al condicional cuando se agrega el simbolo desde el panel
    //de herramientas y lo agrega al listado en el sessionStorage.
    if (!this.data.rebuild) {
      let pos = $('div[idrefsymbol="' + this.data.refSymbol + '"]').position();
      let objSymbol: any = {
        IdSimbolo: this.data.refSymbol, Nombre: this.data.eventName, NodoSucesor: null, IdTipoSimbolo: 1, CoordenadaX: pos.left, CoordenadaY: pos.top,
        Horario: this.f.scheduleSelect.value, Repeticiones: this.f.attempts.value, IdSubcategoria: this.data.eventId
      };
      this.symbolsService.addSymbol(objSymbol);
      this.symbolsService.ElementRepositionId = this.data.refSymbol;
    }
  }

  ngAfterViewChecked() {
    // Solo se entra al condicional cuando se arrastra un simbolo desde el cuadro de herramientas
    //Permite reposicionar el simbolo justo en el lugar al que fue arrastrado.
    if (this.symbolsService.ElementRepositionId == this.data.refSymbol &&
      this.symbolsService.ElementReposition && this.symbolsService.dropElementX != null &&
      this.symbolsService.dropElementY != null) {
      this.setPosition = { x: this.symbolsService.dropElementX, y: this.symbolsService.dropElementY };
      let objSymbol: any = {
        IdSimbolo: this.data.refSymbol, Nombre: this.data.eventName, NodoSucesor: null, IdTipoSimbolo: 1, CoordenadaX: this.symbolsService.dropElementX, CoordenadaY: this.symbolsService.dropElementY,
        Horario: this.f.scheduleSelect.value, Repeticiones: this.f.attempts.value, IdSubcategoria: this.data.eventId
      };
      this.symbolsService.updateSymbol(objSymbol);
      this.symbolsService.dropElementX = null;
      this.symbolsService.dropElementY = null;
      this.symbolsService.ElementRepositionId = null;
      this.symbolsService.ElementReposition=false;
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.eventSymbolForm.controls; }

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
    let objSymbol: any = {
      IdSimbolo: this.data.refSymbol, Nombre: this.data.eventName, NodoSucesor: null, IdTipoSimbolo: 1, CoordenadaX: pos.left, CoordenadaY: pos.top,
      Horario: this.f.scheduleSelect.value, Repeticiones: this.f.attempts.value, IdSubcategoria: null
    };
    this.symbolsService.updateSymbol(objSymbol);
  }

  getSchedule() {
    let r = this.f.scheduleSelect.value;
    if (r == 'INDIFERENTE') {
      r = '&#60;&#62';
    }
    return r;
  }

  pointOut() {
    if (!this.symbolsService.occupiedOut(this.data.refSymbol, null)) {
      console.log("CLick en la salida..");
      this.symbolsService.optionOutElement = null;
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
