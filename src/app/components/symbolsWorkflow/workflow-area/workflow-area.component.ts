import { Component, OnInit, Renderer2, ViewChild, ElementRef, ComponentFactoryResolver, ChangeDetectorRef, AfterViewInit, HostListener, Input, SimpleChanges } from '@angular/core';
import { DropEvent } from 'angular-draggable-droppable';
import { adSymbol } from 'src/app/models/dynamicClass/adSymbol';
import { HoldSymbolComponent } from '../hold-symbol/hold-symbol.component';
import { Ad } from 'src/app/models/dynamicClass/adInterface';
import { AdDirective } from 'src/app/models/dynamicClass/ad.directive';
import { VerifypaymentSymbolComponent } from '../verifypayment-symbol/verifypayment-symbol.component';
import { EventSymbolComponent } from '../event-symbol/event-symbol.component';
import { Guid } from "guid-typescript";
import * as $ from 'jquery';
import { SymbolsService } from 'src/app/services/symbols.service';
import { EndSymbolComponent } from '../end-symbol/end-symbol.component';
import { HomeSymbolComponent } from '../home-symbol/home-symbol.component';
import { ConnectinglineSymbolComponent } from '../connectingline-symbol/connectingline-symbol.component';

@Component({
  selector: 'app-workflow-area',
  templateUrl: './workflow-area.component.html',
  styleUrls: ['./workflow-area.component.css']
})
export class WorkflowAreaComponent implements OnInit, AfterViewInit {
  symbolSelected: string = "";

  @Input() newLine: boolean;
  @ViewChild(AdDirective) adHost: AdDirective;
  @ViewChild("dragBounds") contenedor: ElementRef;
  

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cdr: ChangeDetectorRef, private symbolsService: SymbolsService) { }

  ngAfterViewInit() {
    this.cdr.detectChanges();

  }

  ngOnInit() {
    // this.contenedor.nativeElement.addEventListener('mouseup', this.onMouseup,{passive: false, capture: false});
    this.onDrop({ dropData: "home" });
    this.onDrop({ dropData: "end" });
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("]]]]]]]]]]]]]]]]]]]]]]]]]");
    // console.log(changes);
    for (let propName in changes) {
      let change = changes[propName];
      let firstChange = JSON.stringify(change.firstChange);
      // console.log("Primer Cambio:" + firstChange);
      if (firstChange == "false") {
        let curVal = JSON.stringify(change.currentValue);
        let prevVal = JSON.stringify(change.previousValue);
        console.log(curVal + prevVal);
        if (curVal == "true" && prevVal == "false") {//indica que debe agregarse una linea de conexion
          this.onDrop({ dropData: "line" });
        }

      }
    }


  }

  onDrop({ dropData }: DropEvent<string>): void {
    console.log("AGREGO CONTROL: " + dropData);
    let obj: adSymbol = null;
    let componentFactory = null;
    let idSymbol: Guid;
    idSymbol = Guid.create();
    let ref: string = idSymbol['value'];
    var regularExpression = new RegExp("-", "g");
    ref = ref.replace(regularExpression, "");
    ref = ref.substring(0, ref.length - 2);
    console.log(ref);
    switch (dropData) {
      case "line": {
        this.symbolsService.addSuccessorNode();
        obj = new adSymbol(ConnectinglineSymbolComponent, { out: this.symbolsService.outElement, in: this.symbolsService.inElement, option: this.symbolsService.optionOutElement, refSymbol: ref });
        this.symbolsService.inElement = null;
        this.symbolsService.outElement = null;
        this.symbolsService.optionOutElement = null;
        this.symbolsService.ElementConection = false;
        break;
      }
      case "home": {
        obj = new adSymbol(HomeSymbolComponent, { container: this.contenedor.nativeElement, refSymbol: ref });
        break;
      }
      case "end": {
        obj = new adSymbol(EndSymbolComponent, { container: this.contenedor.nativeElement, refSymbol: ref });
        break;
      }
      case "hold": {
        obj = new adSymbol(HoldSymbolComponent, { container: this.contenedor.nativeElement, refSymbol: ref });
        break;
      }
      case "decision": {
        obj = new adSymbol(VerifypaymentSymbolComponent, { container: this.contenedor.nativeElement, refSymbol: ref });
        break;
      }
      default: {
        let dd = JSON.parse(dropData);
        obj = new adSymbol(EventSymbolComponent, { container: this.contenedor.nativeElement, eventName: dd['Subcategory'], eventId: dd['IdSubcategory'], refSymbol: ref });
        break;
      }
    }
    componentFactory = this.componentFactoryResolver.resolveComponentFactory(obj.component);
    var viewContainerRef = this.adHost.viewContainerRef;
    var componentRef = viewContainerRef.createComponent(componentFactory);
    (<Ad>componentRef.instance)._ref=componentRef;
    (<Ad>componentRef.instance).data = obj.data;
  }

  updateWorkFlow() {
    let x = $('.divWorkFlow').width();
    let y = $('.divWorkFlow').height();
    let wf: any = { AnchoPx: x, AltoPx: y }
    this.symbolsService.updateWorkFlow(wf, 1);
  }

  onMouseup(event) {
    console.log(event);
  }

  // @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
  //   console.log(event);
  //   if (event.keyCode === 46 || event.keyCode === 8) { 
  //     if(this.symbolsService.symbolSelected!=null){
  //       console.log("Eliminando.. "+ this.symbolsService.symbolSelected);
  //       if($('div[idrefsymbol="' + this.symbolsService.symbolSelected + '"]').position()!=undefined){
  //         $('div[idrefsymbol="' + this.symbolsService.symbolSelected + '"]').remove();
  //         console.log("Simbolo eliminado");
  //       }
  //       // if($('div[idchildnode="' + this.symbolsService.symbolSelected + '"]').position()!=undefined){
  //       //   $('div[idchildnode="' + this.symbolsService.symbolSelected + '"]').remove();
  //       //   console.log("conector a padre eliminado");
  //       // }

  //       // if($('div[idfathernode="' + this.symbolsService.symbolSelected + '"]').position()!=undefined){
  //       //   $('div[idfathernode="' + this.symbolsService.symbolSelected + '"]').remove();
  //       //   console.log("conector a hijo eliminado");
  //       // }
  //       this.symbolsService.removeSymbol();
  //       console.log("Eliminado-.................... ");
  //     }
  //    }
  // }

}
