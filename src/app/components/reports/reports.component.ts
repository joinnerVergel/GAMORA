import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentCanDeactivate } from 'src/app/services/pending-changes-guard.service';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { PortfoliosService } from 'src/app/services/portfolios.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements ComponentCanDeactivate, OnInit {

  listSubcategoriesFixed: any = [];//[['SMS SIMPLE', 55]],[['MAIL', 45]],[['MAIL', 45]],[['MAIL', 45]],[['MAIL', 45]]
  listSubcategoriesMobile: any = [];

  FixedCategories: any = [];
  MobileCategories: any = [];

  constructor(private router: Router, private loginService: LoginService, private portfoliosServices: PortfoliosService) { }

  ngOnInit() {
    this.readSubCategories(1);
    this.readSubCategories(2);
  }

  readVisibilityActions(data: string) {
    // console.log(this.loginService.getActionsRole(data));
    return this.loginService.getActionsRole(data);
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    this.loginService.keepSession();
    return true;
  }

  readSubCategories(operation: number) {
    this.portfoliosServices.getDashboard("dashboardSubcategorias", operation.toString())
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            if (operation == 1) {
              this.FixedCategories = [];
              item['listaGenericaConsultaResult'].forEach(element => {
                let c = { idCategory: +element.Campo4, category: element.Campo5, Subcategories: [] }
                let ctrl: boolean = true;
                for (let index = 0; index < this.FixedCategories.length; index++) {
                  if (this.FixedCategories[index].idCategory == c.idCategory) {
                    ctrl = false;
                    break;
                  }
                }
                if (ctrl) {
                  this.FixedCategories.push(c);
                }

              });
            }
            if (operation == 2) {
              this.MobileCategories = [];
              item['listaGenericaConsultaResult'].forEach(element => {
                let c = { idCategory: +element.Campo4, category: element.Campo5, Subcategories: [] }
                let ctrl: boolean = true;
                for (let index = 0; index < this.MobileCategories.length; index++) {
                  if (this.MobileCategories[index].idCategory == c.idCategory) {
                    ctrl = false;
                    break;
                  }
                }
                if (ctrl) {
                  this.MobileCategories.push(c);
                }

              });
            }
            item['listaGenericaConsultaResult'].forEach(element => {
              let i = [[element.Campo2, +element.Campo3]]
              if (operation == 1) {
                for (let index = 0; index < this.FixedCategories.length; index++) {
                  if (this.FixedCategories[index].idCategory == +element.Campo4) {
                    this.FixedCategories[index].Subcategories.push(i);
                  }
                }
              }
              if (operation == 2) {
                for (let index = 0; index < this.MobileCategories.length; index++) {
                  if (this.MobileCategories[index].idCategory == +element.Campo4) {
                    this.MobileCategories[index].Subcategories.push(i);
                  }
                }
              }
            });
          }
        },
        error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        }
      );
  }


}
