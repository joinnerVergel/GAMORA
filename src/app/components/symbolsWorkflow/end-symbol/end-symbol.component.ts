import { Component, OnInit, Input } from '@angular/core';
import { SymbolsService } from 'src/app/services/symbols.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-end-symbol',
  templateUrl: './end-symbol.component.html',
  styleUrls: ['./end-symbol.component.css']
})
export class EndSymbolComponent implements OnInit {

  @Input() data: any;
  nameSymbol: string = "end";
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
      let objSymbol: any = { IdSimbolo: this.data.refSymbol, Nombre: "FIN", IdTipoSimbolo: 5, CoordenadaX: pos.left, CoordenadaY: pos.top };
      this.symbolsService.addSymbol(objSymbol);
    }
  }
  ngAfterViewChecked() {
    // Solo se entra al condicional cuando se arrastra un agrega el simbolo
    //Permite reposicionar el simbolo para que aparezca debajo del simbolo de inicio.
    if (this.symbolsService.ElementRepositionId == this.data.refSymbol &&
      this.symbolsService.ElementReposition && this.symbolsService.dropElementX != null &&
      this.symbolsService.dropElementY != null) {
      this.setPosition = { x: this.symbolsService.dropElementX, y: this.symbolsService.dropElementY };
      let objSymbol: any = { IdSimbolo: this.data.refSymbol, Nombre: "FIN", IdTipoSimbolo: 5, CoordenadaX: this.symbolsService.dropElementX, CoordenadaY: this.symbolsService.dropElementY };
      this.symbolsService.updateSymbol(objSymbol);
      this.symbolsService.dropElementX = null;
      this.symbolsService.dropElementY = null;
      this.symbolsService.ElementRepositionId = null;
      this.symbolsService.ElementReposition = false;
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
    let objSymbol: any = { IdSimbolo: this.data.refSymbol, Nombre: "FIN", IdTipoSimbolo: 5, CoordenadaX: pos.left, CoordenadaY: pos.top };
    this.symbolsService.updateSymbol(objSymbol);
    console.log(pos);
  }

  pointIn() {
    if (this.symbolsService.outElement != null) {
      if (this.symbolsService.outElement != this.data.refSymbol) {
        console.log(this.symbolsService.inElement + "click en entrada" + this.symbolsService.outElement);
        this.symbolsService.inElement = this.data.refSymbol;
        this.symbolsService.ElementConection = true;
      }
    }
  }

}
