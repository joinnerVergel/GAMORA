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
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-workflow-area',
  templateUrl: './workflow-area.component.html',
  styleUrls: ['./workflow-area.component.css']
})
export class WorkflowAreaComponent implements OnInit, AfterViewInit {
  symbolSelected: string = "";
  dropElement: boolean = false;
  
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
    this.dropElement = false;

  }

  dropElementFunction(event) {
    // console.log("dRAGOVER",this.dropElement);
    if (this.dropElement) {
      console.log("EVENTO:" + this.dropElement, event.offsetX, event.offsetY);
      this.symbolsService.dropElementX=event.offsetX;
      this.symbolsService.dropElementY=event.offsetY;
      this.symbolsService.ElementReposition=true;
      this.dropElement = false;
    }

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
    (<Ad>componentRef.instance).data = obj.data;
    if(dropData!='line'&& dropData!='home'&& dropData!='end'){
      this.dropElement = true;
    }
    if(dropData=='end'){
      this.symbolsService.ElementRepositionId=ref;
      this.symbolsService.dropElementX=0;
      this.symbolsService.dropElementY=60;
      this.symbolsService.ElementReposition=true;
    }
    
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

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === 46 || event.keyCode === 8) {
      if (this.symbolsService.symbolSelected != null) {
        if (this.symbolsService.isRemovable()) {
          console.log("Eliminando.. " + this.symbolsService.symbolSelected);
          if ($('div[idrefsymbol="' + this.symbolsService.symbolSelected + '"]').position() != undefined) {
            var viewContainerRef = this.adHost.viewContainerRef;
            viewContainerRef.clear();
            this.symbolsService.removeSymbol();
            this.workFlowRebuild();
            this.connectingLineRebuild();
            console.log("Simbolo eliminado");
          }
        }
      }
    }
  }


  workFlowRebuild() {
    let symbolsList: Array<any> = this.symbolsService.getSymbolsWorkFlow();
    let obj: adSymbol = null;
    let componentFactory = null;
    let ref: string = null;
    var viewContainerRef = this.adHost.viewContainerRef;
    symbolsList.forEach(element => {
      console.log(element.IdTipoSimbolo + "AGREGA SIMBOLO:" + element.Nombre);
      ref = element.IdSimbolo;
      switch (element.IdTipoSimbolo) {
        case 4: {
          obj = new adSymbol(HomeSymbolComponent, { container: this.contenedor.nativeElement, refSymbol: ref, rebuild: true, symbolData: element });
          break;
        }
        case 5: {
          obj = new adSymbol(EndSymbolComponent, { container: this.contenedor.nativeElement, refSymbol: ref, rebuild: true, symbolData: element });
          break;
        }
        case 2: {
          obj = new adSymbol(HoldSymbolComponent, { container: this.contenedor.nativeElement, refSymbol: ref, rebuild: true, symbolData: element });
          break;
        }
        case 3: {
          obj = new adSymbol(VerifypaymentSymbolComponent, { container: this.contenedor.nativeElement, refSymbol: ref, rebuild: true, symbolData: element });
          break;
        }
        default: {
          obj = new adSymbol(EventSymbolComponent, { container: this.contenedor.nativeElement, eventName: element.Nombre, eventId: element.IdSubcategoria, refSymbol: ref, rebuild: true, symbolData: element });
          break;
        }
      }
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(obj.component);
      var componentRef = viewContainerRef.createComponent(componentFactory);
      (<Ad>componentRef.instance).data = obj.data;
    });
  }

  connectingLineRebuild() {
    let symbolsList: Array<any> = this.symbolsService.getSymbolsWorkFlow();
    let obj: adSymbol = null;
    let componentFactory = null;
    var viewContainerRef = this.adHost.viewContainerRef;
    symbolsList.forEach(element => {
      let NS: string = element.NodoSucesor;
      if (NS != null) {
        if (NS.indexOf(",") == -1) {
          obj = new adSymbol(ConnectinglineSymbolComponent, { out: element.IdSimbolo, in: NS, option: null });
          componentFactory = this.componentFactoryResolver.resolveComponentFactory(obj.component);
          var componentRef = viewContainerRef.createComponent(componentFactory);
          (<Ad>componentRef.instance).data = obj.data;
        } else {
          let Pago: Array<string> = NS.split(",");
          console.log(Pago);
          let Entry_: string = "NO";
          Pago.forEach(opt => {
            if (opt != "null") {
              obj = new adSymbol(ConnectinglineSymbolComponent, { out: element.IdSimbolo, in: opt, option: Entry_ });
              componentFactory = this.componentFactoryResolver.resolveComponentFactory(obj.component);
              var componentRef = viewContainerRef.createComponent(componentFactory);
              (<Ad>componentRef.instance).data = obj.data;
            }
            Entry_ = "YES";
          });

        }

      }

    });
  }


}
