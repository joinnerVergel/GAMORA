import { Component, OnInit, Input } from '@angular/core';
import { PortfoliosService } from 'src/app/services/portfolios.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-history-sended-eventsx-account',
  templateUrl: './table-history-sended-eventsx-account.component.html',
  styleUrls: ['./table-history-sended-eventsx-account.component.css']
})
export class TableHistorySendedEventsxAccountComponent implements OnInit {

  @Input() operation:number;
  managerList:any=[];
  timer: any;
  constructor(private portfoliosServices: PortfoliosService, private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.readManagerList();
    this.timer =setInterval(() => {
      this.readManagerList();
    }, 60000);
  }
  ngOnDestroy(){
    clearInterval(this.timer);
  }

  readManagerList() {
    this.portfoliosServices.getDashboard("historicoGestionCuentaEventos", this.operation.toString())
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            this.managerList=item['listaGenericaConsultaResult'];
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }


}
