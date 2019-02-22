import { Component, OnInit, Input } from '@angular/core';
import { faCaretRight, faClock, faToolbox, faWrench, faProjectDiagram, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { SymbolsService } from 'src/app/services/symbols.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-toolbox-workflow',
  templateUrl: './toolbox-workflow.component.html',
  styleUrls: ['./toolbox-workflow.component.css']
})
export class ToolboxWorkflowComponent implements OnInit {
  viewToolbox:boolean=false;
  arrowRightIcon=faCaretRight;
  clockIcon=faClock;
  toolsIcon=faProjectDiagram;
  payIcon=faDollarSign;
  symbolsList:Array<any>=[];
  @Input() operation: number;
  constructor(private symbolsService: SymbolsService,private router: Router,  private loginService: LoginService) { }

  ngOnInit() {
    this.getSymbolsEvents();
  }
 

  getSymbolsEvents(){
    this.symbolsService.getFixedSymbolsList(this.operation)
    .subscribe(
      item => {
        if (item.hasOwnProperty('CategoriaFlujoResult')) {
          const elementList = item['CategoriaFlujoResult'];
          this.symbolsList=[];
          elementList.forEach(element => {
            let elementCategorySymbol: any = {};
            elementCategorySymbol.IdCategory = element['IdCategoria'];
            elementCategorySymbol.Category = element['CategoriaNombre'];
            const subcategoriesList = element['SubCategorias'];
            // console.log(subcategoriesList);
            let SubCategoriesSymbolsList:Array<any>=[];
            subcategoriesList.forEach(subcategoria_ => {
              let elementSubcategorySymbol: any = {};
              elementSubcategorySymbol.IdSubcategory=subcategoria_['IdSubCategoria'];
              elementSubcategorySymbol.Subcategory=subcategoria_['SubCategoriaNombre'];
              SubCategoriesSymbolsList.push(elementSubcategorySymbol);
            });
            elementCategorySymbol.Subcategory = SubCategoriesSymbolsList;
            this.symbolsList.push(elementCategorySymbol);
          });
        }
        // console.log(this.symbolsList);
      }, error => {
        if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
          this.loginService.clearSessionLogin();
          this.router.navigate(['/login']);
        }
      });
  }

  getDropData( x :any){
    return JSON.stringify(x);
  }

}


