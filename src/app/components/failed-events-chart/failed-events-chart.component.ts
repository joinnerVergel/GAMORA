import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-failed-events-chart',
  templateUrl: './failed-events-chart.component.html',
  styleUrls: ['./failed-events-chart.component.css']
})
export class FailedEventsChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{stacked: true}], yAxes: [{stacked: true}] },
    plugins: {
      datalabels: {
        anchor: 'center',
        align: 'center',
        color:'#fff',font:{size:12},
      }
    }
  };
  public barChartLabels: Label[] = ['Eventos'];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [];

  
  @Input() dailyEventsRecord:any=null;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes["dailyEventsRecord"]["currentValue"]!=undefined && changes["dailyEventsRecord"]["currentValue"]!=null){
      this.barChartData = [
        { data: [this.dailyEventsRecord.Campo1-this.dailyEventsRecord.Campo5-this.dailyEventsRecord.Campo6], label: 'EVENTOS EXITOSOS' },
        { data: [this.dailyEventsRecord.Campo5], label: 'SMS Fallidos' },
        { data: [this.dailyEventsRecord.Campo6], label: 'EMAIL Fallidos' }
      ];
    }
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
