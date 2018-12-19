import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appRefSymbol]'
})
export class NewpropertiesDirective implements OnInit {

  @Input() idRefSymbol: string;
  constructor(private el: ElementRef,private renderer: Renderer2) {
  }

  ngOnInit() {
    //  console.log(this.idRefSymbol);
     this.renderer.addClass(this.el.nativeElement,this.idRefSymbol);
     this.renderer.setAttribute(this.el.nativeElement,"idRefSymbol",this.idRefSymbol);
  }
}
