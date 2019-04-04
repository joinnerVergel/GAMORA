import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Filtros } from 'src/app/models/request/filtro';



@Component({
  selector: 'app-dinamic-filter',
  templateUrl: './dinamic-filter.component.html',
  styleUrls: ['./dinamic-filter.component.css']
})
export class DinamicFilterComponent implements OnInit {

  @Input() brand:string;
  @Input() options:Array<string>;
  @Output() removeItem:EventEmitter<Filtros>=new EventEmitter<Filtros>();
  @Output() addItem:EventEmitter<Filtros>=new EventEmitter<Filtros>();

  itemsSelectedList:Array<Filtros>=[];
  

  constructor() { }

  ngOnInit() {
  }

  toggleItem(item:string){
    let itemFilter:Filtros;
    let itemFind:Array<Filtros>=this.itemsSelectedList.filter(i_=> i_.FiltroValor==item);
    
    if(itemFind.length>0){
      //console.log(" NO incluye");
      this.itemsSelectedList=this.itemsSelectedList.filter(i=> i.FiltroValor!==item);
      itemFilter={FiltroNombre:this.brand,FiltroValor:item,FiltroTipo:"Dinamico"};
      this.removeItem.emit(itemFilter);
    }else{
      //console.log("incluye");
      itemFilter={FiltroNombre:this.brand,FiltroValor:item,FiltroTipo:"Dinamico"};
      this.itemsSelectedList.push(itemFilter);
      this.addItem.emit(itemFilter);
    }
  }

  readClass(item:string){
    let itemFind:Array<Filtros>=this.itemsSelectedList.filter(i_=> i_.FiltroValor==item);
    if(itemFind.length>0){
      return "btnSelected";
    }
    return "";
  }
  
}
