import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { SymbolsService } from 'src/app/services/symbols.service';
import * as $ from 'jquery';
import { LogManagedService } from 'src/app/services/log-managed.service';

@Component({
  selector: 'app-verifypayment-symbol',
  templateUrl: './verifypayment-symbol.component.html',
  styleUrls: ['./verifypayment-symbol.component.css']
})
export class VerifypaymentSymbolComponent implements OnInit, AfterViewInit {
  
  @Input() data: any;
  nameSymbol:string="decision";
  payIcon=faDollarSign;
  viewProperties:boolean=false;
  constructor(private symbolsService: SymbolsService, private logService: LogManagedService) { }

  ngOnInit() {
  }


  ngAfterViewInit(){
    let pos=$('div[idrefsymbol="'+this.data.refSymbol+'"]').position();
    let objSymbol:any={IdSimbolo:this.data.refSymbol,Nombre:"PAGO",NodoSucesor:null,IdTipoSimbolo:3,CoordenadaX:pos.left,CoordenadaY:pos.top};
    this.symbolsService.addSymbol(objSymbol);
  }
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
    let objSymbol:any={IdSimbolo:this.data.refSymbol,Nombre:"PAGO",NodoSucesor:null,IdTipoSimbolo:3,CoordenadaX:pos.left,CoordenadaY:pos.top};
    this.symbolsService.updateSymbol(objSymbol);
  }

  pointOut(option:string){
    if(!this.symbolsService.occupiedOut(this.data.refSymbol,option)){
      console.log("CLick en la salida..");
      this.symbolsService.optionOutElement=option;
      this.symbolsService.outElement=this.data.refSymbol;
    }
  }
  pointIn() {
    if (this.symbolsService.outElement != null) {
      if (this.symbolsService.outElement!=this.data.refSymbol) {
        if (!this.symbolsService.occupiedIn(this.data.refSymbol)) {
          if (!this.symbolsService.crossReference(this.data.refSymbol)) {
            // console.log(this.symbolsService.inElement + "click en entrada" + this.symbolsService.outElement);
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
