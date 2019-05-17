import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { PortfoliosService } from 'src/app/services/portfolios.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-events-sent-daily',
  templateUrl: './events-sent-daily.component.html',
  styleUrls: ['./events-sent-daily.component.css']
})
export class EventsSentDailyComponent implements OnInit,OnDestroy {
  @ViewChild('googlechart')
  googlechart: GoogleChartComponent;
  chart = {
    type: 'PieChart',
    data: [],
    columnNames: ['Estado', 'Porcentaje'],
    options: {
      is3D: true,
      slices: {
        0: { color: '#0d9dae' },
        1: { color: '#d93f72' }
      },
      legend: {
        position: 'left',
        textStyle: {
          color: '#fff', fontSize: 12
        },
        alignment:'center'
      },
      backgroundColor: "transparent",
    },

    width: 400,
    height: 300,
  }

  dailyEventsRecord: any = null;
  timer:any;
  constructor(private portfoliosServices: PortfoliosService, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.requestManagementDailyEvents();
    this.timer=setInterval(() => {
      this.requestManagementDailyEvents();
    }, 60000);
  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }

  requestManagementDailyEvents() {
    this.portfoliosServices.getManagementDailyEvents()
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            this.dailyEventsRecord = item['listaGenericaConsultaResult'][0];
            console.log(this.dailyEventsRecord)
            this.chart.data = [
              ['Gestionados', +this.dailyEventsRecord.Campo1],
              ['Pendientes', +this.dailyEventsRecord.Campo3]
            ]
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

}
