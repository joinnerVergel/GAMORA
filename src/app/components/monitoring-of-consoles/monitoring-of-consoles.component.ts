import { Component, OnInit, OnDestroy } from '@angular/core';
import { PortfoliosService } from 'src/app/services/portfolios.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-monitoring-of-consoles',
  templateUrl: './monitoring-of-consoles.component.html',
  styleUrls: ['./monitoring-of-consoles.component.css']
})
export class MonitoringOfConsolesComponent implements OnInit, OnDestroy {

  MonitoringAGFixed: string = "";
  MonitoringAGFixedDate: string;
  MonitoringAGMobile: string = "";
  MonitoringAGMobileDate: string;
  MonitoringCDFixed: string = "";
  MonitoringCDFixedDate: string;
  MonitoringCDMobile: string = "";
  MonitoringCDMobileDate: string;
  timer: any;
  constructor(private portfoliosServices: PortfoliosService, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.readMonitoringAGFixed();
    this.readMonitoringAGMobile();
    this.readMonitoringCDFixed();
    this.readMonitoringCDMobile();
    this.timer = setInterval(() => {
      this.readMonitoringAGFixed();
      this.readMonitoringAGMobile();
      this.readMonitoringCDFixed();
      this.readMonitoringCDMobile();
    }, 300000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  readMonitoringAGFixed() {
    this.MonitoringAGFixed='loading';
    this.portfoliosServices.getMonitoring("consola_AG_FIJA")
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            this.MonitoringAGFixedDate = item['listaGenericaConsultaResult'][0].Campo1;
            this.MonitoringAGFixed = item['listaGenericaConsultaResult'][0].Campo2;
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  readMonitoringAGMobile() {
    this.MonitoringAGMobile='loading';
    this.portfoliosServices.getMonitoring("consola_AG_Movil")
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            this.MonitoringAGMobileDate = item['listaGenericaConsultaResult'][0].Campo1;
            this.MonitoringAGMobile = item['listaGenericaConsultaResult'][0].Campo2;
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  readMonitoringCDFixed() {
    this.MonitoringCDFixed='loading';
    this.portfoliosServices.getMonitoring("consola_CD_Fija")
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            this.MonitoringCDFixedDate = item['listaGenericaConsultaResult'][0].Campo1;
            this.MonitoringCDFixed = item['listaGenericaConsultaResult'][0].Campo2;
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }
  readMonitoringCDMobile() {
    this.MonitoringCDMobile='loading';
    this.portfoliosServices.getMonitoring("consola_CD_Movil")
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            this.MonitoringCDMobileDate = item['listaGenericaConsultaResult'][0].Campo1;
            this.MonitoringCDMobile = item['listaGenericaConsultaResult'][0].Campo2;
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }


}
