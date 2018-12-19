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


  constructor(private symbolsService: SymbolsService) { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    let pos = $('div[idrefsymbol="' + this.data.refSymbol + '"]').position();
    let objSymbol: any = { IdSimbolo: this.data.refSymbol, Nombre: "FIN", IdTipoSimbolo: 5, CoordenadaX: pos.left, CoordenadaY: pos.top };
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
    let pos = $('div[idrefsymbol="' + this.data.refSymbol + '"]').position();
    let objSymbol: any = { IdSimbolo: this.data.refSymbol, Nombre: "FIN", IdTipoSimbolo: 5, CoordenadaX: pos.left, CoordenadaY: pos.top };
    this.symbolsService.updateSymbol(objSymbol);
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
