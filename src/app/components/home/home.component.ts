import { Component, OnInit, HostListener } from '@angular/core';
import { PortfoliosService } from 'src/app/services/portfolios.service';
import { DetailPortfolios } from 'src/app/models/request/detailPortfolios';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ComponentCanDeactivate } from 'src/app/services/pending-changes-guard.service';
import { Observable } from 'rxjs';
import * as decode from 'jwt-decode';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, ComponentCanDeactivate {
  detailFixedPortfolio: DetailPortfolios = { quantity: null, updateLast: null };
  detailMobilePortfolio: DetailPortfolios = { quantity: null, updateLast: null };
  dailyEventsRecord:any=null;

  MonitoringAGFixed:string="";
  MonitoringAGFixedDate:string;
  MonitoringAGMobile:string="";
  MonitoringAGMobileDate:string;
  MonitoringCDFixed:string ="";
  MonitoringCDFixedDate:string;
  MonitoringCDMobile:string="";
  MonitoringCDMobileDate:string;

  constructor(private portfoliosServices: PortfoliosService, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    } else {
      if (decode(this.loginService.getLocalUserLogged().token)['RolUsuario'] == '/LUXPfDT7FDLXPBKY6D9eQ==') {
        this.router.navigate(['/users-manager']);
      } else {
        this.requestFixedPortfoliosDetail();
        this.requestManagementDailyEvents();
        this.readMonitoringAGFixed();
        this.readMonitoringAGMobile();
        this.readMonitoringCDFixed();
        this.readMonitoringCDMobile();
      }
      setInterval(()=>{    
        this.requestManagementDailyEvents();
      }, 10000);
    }
  }


  requestFixedPortfoliosDetail() {
    this.portfoliosServices.getPortfolioDetail(1)
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaResult')) {
            const elementList = item['listaGenericaResult'];
            elementList.forEach(element => {
              this.detailFixedPortfolio = { quantity: element['Id'], updateLast: element['Valor'] };
            });
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        },
        ()=>{
          this.portfoliosServices.getPortfolioDetail(2)
          .subscribe(
            item => {
              if (item.hasOwnProperty('listaGenericaResult')) {
                const elementList = item['listaGenericaResult'];
                elementList.forEach(element => {
                  this.detailMobilePortfolio = { quantity: element['Id'], updateLast: element['Valor'] };
                });
              }
            }, error => {
              if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
                this.loginService.clearSessionLogin();
                this.router.navigate(['/login']);
              }
            });
        });
  }
  

  requestManagementDailyEvents() {
    this.portfoliosServices.getManagementDailyEvents()
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            this.dailyEventsRecord= item['listaGenericaConsultaResult'][0];
          }
          //console.log(this.dailyEventsRecord);
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  readMonitoringAGFixed(){
    this.portfoliosServices.getMonitoring("consola_AG_FIJA")
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            this.MonitoringAGFixedDate=item['listaGenericaConsultaResult'][0].Campo1;
            this.MonitoringAGFixed=item['listaGenericaConsultaResult'][0].Campo2;
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  readMonitoringAGMobile(){
    this.portfoliosServices.getMonitoring("consola_AG_Movil")
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            this.MonitoringAGMobileDate=item['listaGenericaConsultaResult'][0].Campo1;
            this.MonitoringAGMobile=item['listaGenericaConsultaResult'][0].Campo2;
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  readMonitoringCDFixed(){
    this.portfoliosServices.getMonitoring("consola_CD_Fija")
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            this.MonitoringCDFixedDate=item['listaGenericaConsultaResult'][0].Campo1;
            this.MonitoringCDFixed=item['listaGenericaConsultaResult'][0].Campo2;
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }
  readMonitoringCDMobile(){
    this.portfoliosServices.getMonitoring("consola_CD_Movil")
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            this.MonitoringCDMobileDate=item['listaGenericaConsultaResult'][0].Campo1;
            this.MonitoringCDMobile=item['listaGenericaConsultaResult'][0].Campo2;
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }


  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    this.loginService.keepSession();
    return true;
  }
}
