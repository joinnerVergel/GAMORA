import { Component, OnInit } from '@angular/core';
import { PortfoliosService } from 'src/app/services/portfolios.service';
import { DetailPortfolios } from 'src/app/models/request/detailPortfolios';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  detailFixedPortfolio: DetailPortfolios={ quantity: null, updateLast: null };

  constructor(private portfoliosServices: PortfoliosService, private router: Router,  private loginService: LoginService) { }

  ngOnInit() {
    if(!this.loginService.isLogged()){
      this.router.navigate(['/login']);
    }else{
    this.requestFixedPortfoliosDetail();
    }
  }


  requestFixedPortfoliosDetail() {
    this.portfoliosServices.getFixedPortfolioDetail()
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaResult')) {
            const elementList = item['listaGenericaResult'];
            elementList.forEach(element => {
              this.detailFixedPortfolio = { quantity: element['Id'], updateLast: element['Valor'] };
            });
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401){             
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }
}
