import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { Surface, Path, Group } from '@progress/kendo-drawing';

import { SymbolsService } from 'src/app/services/symbols.service';



@Component({
  selector: 'app-connectingline-symbol',
  templateUrl: './connectingline-symbol.component.html',
  styleUrls: ['./connectingline-symbol.component.css']
})
export class ConnectinglineSymbolComponent implements OnInit, AfterViewInit, OnDestroy {
  path = new Path({
    stroke: {
      color: `#9999b6`,
      width: 1
    }
  });
  arrow = new Path({
    stroke: {
      color: "#9999b6",
      width: 2
    }
  });

  @ViewChild('surface')
  private surfaceElement: ElementRef;
  private surface: Surface;
  @Input() data: any;

  posOut: any = null;
  posIn: any = null;
  previousPosOut: any = null;
  previousPosIn: any = null;



  constructor(private symbolsService: SymbolsService) { }

  ngOnInit() {
    this.posOut = this.symbolsService.getPositionSymbol(this.data.out);
    this.posIn = this.symbolsService.getPositionSymbol(this.data.in);

  }
  ngAfterViewInit(): void {
    const element = this.surfaceElement.nativeElement;
    this.surface = Surface.create(element);
    console.log("PINTA LINEA INCIAL");
    this.drawScene();
  }

  ngOnDestroy() {
    this.surface.destroy();
  }

  getClass() {
    this.previousPosOut = this.posOut;
    this.previousPosIn = this.posIn;
    this.posOut = this.symbolsService.getPositionSymbol(this.data.out);
    this.posIn = this.symbolsService.getPositionSymbol(this.data.in);
    if (this.previousPosIn.x != this.posIn.x || this.previousPosIn.y != this.posIn.y
      || this.previousPosOut.x != this.posOut.x || this.previousPosOut.y != this.posOut.y) {
      console.log("PINTA LINEA CAMBIO");
      this.drawScene();
    }
    return "";
  }

  drawScene() {
    let addPositionOut: any = this.symbolsService.getAddPositionSymbol(this.data.out, "out", this.data.option);
    let addPositionIn: any = this.symbolsService.getAddPositionSymbol(this.data.in, "in", null);
    this.path.moveTo(this.posOut.x + addPositionOut.x, this.posOut.y + addPositionOut.y).lineTo(this.posIn.x + addPositionIn.x, this.posIn.y + addPositionIn.y).close();
    this.arrow.moveTo(this.posIn.x + addPositionIn.x-3, this.posIn.y + addPositionIn.y-6).lineTo(this.posIn.x + addPositionIn.x+6-3, this.posIn.y + addPositionIn.y-6).lineTo(this.posIn.x + addPositionIn.x, this.posIn.y + addPositionIn.y).close();
    let group = new Group();
    group.append(this.path,this.arrow);

    // Render the group on the surface
    this.surface.clear();
    this.surface.draw(group);
  }

  show(){
    let r =this.symbolsService.showconnectingLine(this.data.in,this.data.out);
    // console.log(r);
    return r;
  }

}

