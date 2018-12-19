import { Component, OnInit, Input } from '@angular/core';
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
  nameSymbol:string="hold";
  propertiesIcon=faCaretRight;
  viewProperties:boolean=false;
  eventSymbolForm: FormGroup;
 
  constructor(private formBuilder: FormBuilder,private symbolsService: SymbolsService, private logService: LogManagedService) { }

  ngOnInit() {
    this.eventSymbolForm = this.formBuilder.group({
      attempts: [1, Validators.required],
      scheduleSelect:['AM', Validators.required],
    });
  }
  ngAfterViewInit(){
    let pos=$('div[idrefsymbol="'+this.data.refSymbol+'"]').position();
    let objSymbol:any={IdSimbolo:this.data.refSymbol,Nombre:this.data.eventName,NodoSucesor:null,IdTipoSimbolo:1,CoordenadaX:pos.left,CoordenadaY:pos.top,
      Horario:this.f.scheduleSelect.value,Repeticiones:this.f.attempts.value,IdSubcategoria:this.data.eventId};
    this.symbolsService.addSymbol(objSymbol);
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
    let pos=$('div[idrefsymbol="'+this.data.refSymbol+'"]').position();
    let objSymbol:any={IdSimbolo:this.data.refSymbol,Nombre:this.data.eventName,NodoSucesor:null,IdTipoSimbolo:1,CoordenadaX:pos.left,CoordenadaY:pos.top,
      Horario:this.f.scheduleSelect.value,Repeticiones:this.f.attempts.value,IdSubcategoria:null};
    this.symbolsService.updateSymbol(objSymbol);
  }

  getSchedule(){
    let r=this.f.scheduleSelect.value;
    if(r=='INDIFERENTE'){
      r= '&#60;&#62';
    }
    return  r;
  }

  pointOut(){
    if(!this.symbolsService.occupiedOut(this.data.refSymbol,null)){
      console.log("CLick en la salida..");
      this.symbolsService.optionOutElement=null;
      this.symbolsService.outElement=this.data.refSymbol;
    }
  }
  pointIn() {
    if (this.symbolsService.outElement != null) {
      if (this.symbolsService.outElement!=this.data.refSymbol) {
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
