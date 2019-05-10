import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PortfoliosService } from 'src/app/services/portfolios.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-history-sended-events',
  templateUrl: './table-history-sended-events.component.html',
  styleUrls: ['./table-history-sended-events.component.css']
})
export class TableHistorySendedEventsComponent implements OnInit,OnDestroy {

  @Input() operation:number;
  categoriesList:any=[];
  timer: any;
  constructor(private portfoliosServices: PortfoliosService, private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.readCategories();
    this.timer =setInterval(() => {
      this.readCategories();
    }, 60000);
  }
  ngOnDestroy(){
    clearInterval(this.timer);
  }

  readCategories() {
    this.portfoliosServices.getDashboard("historicoGestionCategoriaEventos", this.operation.toString())
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            this.categoriesList=item['listaGenericaConsultaResult'];
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

}
