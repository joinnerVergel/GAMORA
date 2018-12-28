import { Directive, Input, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPropertiesconectingline]'
})
export class PropertiesconectinglineDirective implements OnInit {

  @Input() idFather: string;
  @Input() idChild: string;
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, "idFatherNode", this.idFather);
    this.renderer.setAttribute(this.el.nativeElement, "idChildNode", this.idChild);
  }
}