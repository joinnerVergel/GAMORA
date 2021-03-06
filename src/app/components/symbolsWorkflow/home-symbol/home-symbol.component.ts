import { Component, OnInit, Input } from '@angular/core';
import { SymbolsService } from 'src/app/services/symbols.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-home-symbol',
  templateUrl: './home-symbol.component.html',
  styleUrls: ['./home-symbol.component.css']
})
export class HomeSymbolComponent implements OnInit {

  @Input() data: any;
  nameSymbol: string = "home";
  setPosition:any={x:0, y:0};

  constructor(private symbolsService: SymbolsService) { }

  ngOnInit() {
   
  }

  ngAfterContentInit(){
    if (this.data.rebuild) {
      this.setPosition={x:this.data.symbolData.CoordenadaX,y:this.data.symbolData.CoordenadaY};
    }
  }  
  ngAfterViewInit() {
    if (!this.data.rebuild) {
      let pos = $('div[idrefsymbol="' + this.data.refSymbol + '"]').position();
      let objSymbol: any = { IdSimbolo: this.data.refSymbol, Nombre: "INICIO", NodoSucesor: null, IdTipoSimbolo: 4, CoordenadaX: pos.left, CoordenadaY: pos.top };
      this.symbolsService.addSymbol(objSymbol);
    }

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
    let pos = $('div[idrefsymbol="' + this.data.refSymbol + '"]').position();
    let objSymbol: any = { IdSimbolo: this.data.refSymbol, Nombre: "INICIO", IdTipoSimbolo: 4, CoordenadaX: pos.left, CoordenadaY: pos.top };
    this.symbolsService.updateSymbol(objSymbol);
    //console.log(pos);
  }


  pointOut() {
    if (!this.symbolsService.occupiedOut(this.data.refSymbol, null)) {
      //console.log("CLick en la salida..");
      this.symbolsService.optionOutElement = null;
      this.symbolsService.outElement = this.data.refSymbol;
    }
  }

}
