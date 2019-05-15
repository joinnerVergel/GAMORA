import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-effectiveness-gauge',
  templateUrl: './effectiveness-gauge.component.html',
  styleUrls: ['./effectiveness-gauge.component.css']
})
export class EffectivenessGaugeComponent implements OnInit {

  @Input() data_:any;
 
 @ViewChild('googlechart')
  googlechart: GoogleChartComponent;
  chart = {
    type: 'Gauge',
    data: [
      ['SMS SIMPLE', 55],
    ],
    options: {
      width: 400,
      height: 150,
      redFrom: 0,
      redTo: 25,
      greenFrom: 75,
      greenTo: 100,
      minorTicks: 5,
    }
  };

  
  constructor() { }

  ngOnInit() {
    this.chart.data=this.data_;
  }

 

}
