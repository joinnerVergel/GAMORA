import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-time-line-events',
  templateUrl: './time-line-events.component.html',
  styleUrls: ['./time-line-events.component.css']
})
export class TimeLineEventsComponent implements OnInit {
  start: number = -8
  end: number = 100
  timeline: any = [];
  @Input() elementsTimeLine: any;
  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["elementsTimeLine"]["currentValue"]!=undefined && changes["elementsTimeLine"]["currentValue"]!=null){
      this.createTimeLine();
      this.loadElements();
    }
  }
  createTimeLine(){
    this.timeline=[];
    for (let j = this.start; j <= this.end; j++) {
      this.timeline.push({age:j,elements:[],class:""})
    }
  }

  loadElements() {
    this.elementsTimeLine.forEach(element => {
      this.addElement(element.debtAge,element.nameElement);
    });
  }

  addElement(age: string, nameElement: string) {
    if (age.includes("*")) {
      let a = age.split("*");
      this.timeline.forEach(el => {
        if (el.age >= +a[0] && el.age <= +a[1]) {
          el.elements.push(nameElement);
          if(el.elements.length==1){
            el.class="green"
          }
          if(el.elements.length==2){
            el.class="yellow"
          }
          if(el.elements.length>2){
            el.class="red"
          }
        }
      });
    } else {
      this.timeline.forEach(el => {
        if (el.age == +age) {
          el.elements.push(nameElement);
          if(el.elements.length==1){
            el.class="green"
          }
          if(el.elements.length==2){
            el.class="yellow"
          }
          if(el.elements.length>2){
            el.class="red"
          }
        }
      });
    }

  }

}
