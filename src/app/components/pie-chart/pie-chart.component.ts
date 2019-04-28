import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
        color:'#fff',textAlign:"center",
      }
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] =[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['#5bc500','rgba(13,157,174,1)'],
    },
  ];

  @Input() dailyEventsRecord:any=null;

  constructor() { }

  ngOnInit() {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["dailyEventsRecord"]["currentValue"]!=undefined && changes["dailyEventsRecord"]["currentValue"]!=null){
      this.pieChartLabels=[['GESTIONADOS',this.dailyEventsRecord.Campo2+'%'], ['PENDIENTES',this.dailyEventsRecord.Campo4+'%']];
      this.pieChartData=[this.dailyEventsRecord.Campo1,this.dailyEventsRecord.Campo3];
    }
  }


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  // changeLabels() {
  //   const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
  //     'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
  //     'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
  //     'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
  //     'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
  //   const randomWord = () => words[Math.trunc(Math.random() * words.length)];
  //   this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
  // }

  // addSlice() {
  //   this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
  //   this.pieChartData.push(400);
  //   this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
  // }

  // removeSlice() {
  //   this.pieChartLabels.pop();
  //   this.pieChartData.pop();
  //   this.pieChartColors[0].backgroundColor.pop();
  // }

  // changeLegendPosition() {
  //   this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  // }

}
