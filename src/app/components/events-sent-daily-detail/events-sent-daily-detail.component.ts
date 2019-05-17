import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { PortfoliosService } from 'src/app/services/portfolios.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-events-sent-daily-detail',
  templateUrl: './events-sent-daily-detail.component.html',
  styleUrls: ['./events-sent-daily-detail.component.css']
})
export class EventsSentDailyDetailComponent implements OnInit {

  @ViewChild('googlechart')
  googlechart: GoogleChartComponent;
  chart = {
    type: 'BarChart',
    data: [],
    columnNames: ['domain', 'Eventos Exitosos', 'SMS Fallidos', 'MAILS Fallidos'],
    options: {
      width: 400,
      animation: {
        duration: 500,
        easing: 'inAndOut',
      },
      legend: {
        position: 'top',
        textStyle: {
          color: '#fff', fontSize: 8
        },
        alignment: 'center'
      },
      vAxis: {
        textStyle: { color: "#fff", fontSize: "10", fontName: 'telefonicaRegular' },
      },
      series: {
        0: { color: '#0d9dae' },
        1: { color: 'lightgoldenrodyellow' },
        2: { color: 'lightsteelblue' },
      },
      hAxis: {
        title: 'Cantidad de eventos gestionados',
        titleTextStyle: {
          color: '#fff',
          fontName: 'telefonicaRegular'
        },
        ticks: [0, 100],
        textStyle: { color: "#fff", fontSize: "10px" },
      },
      bar: { groupWidth: "15" },
      backgroundColor: "transparent",
      isStacked: true
    },
    width: 550,
    height: 900
  };

  stylesList: any = ['color: #0d9dae; stroke-color: #fff; stroke-width: 1;',
    'color: #d93f72; stroke-color: #fff; stroke-width: 1;',
    'color: #5bc500; stroke-color: #fff; stroke-width: 1;',
    'color: #f9c86a; stroke-color: #fff; stroke-width: 1;',
    'color: #FCCC65; stroke-color: #fff; stroke-width: 1;',
    'color: #A0BE4A; stroke-color: #fff; stroke-width: 1;',
    'color: #E71D36; stroke-color: #fff; stroke-width: 1;',
    'color: #ad6bae; stroke-color: #fff; stroke-width: 1;',
    'color: #707d94; stroke-color: #fff; stroke-width: 1;',
    'color: #f3950d; stroke-color: #fff; stroke-width: 1;',
  ];

  dailyEventsRecord: any = null;
  timer: any;
  constructor(private portfoliosServices: PortfoliosService, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.requestManagementDailyEvents();
    this.timer = setInterval(() => {
      this.requestManagementDailyEvents();
    }, 60000);
  }

  ngOnDestroy() {
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
              ['Eventos Gestionados', +(this.dailyEventsRecord.Campo1 - this.dailyEventsRecord.Campo5 - this.dailyEventsRecord.Campo6), +this.dailyEventsRecord.Campo5, +this.dailyEventsRecord.Campo6],
            ];
            this.chart.options.hAxis.ticks = [0, +this.dailyEventsRecord.Campo1];
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

}
