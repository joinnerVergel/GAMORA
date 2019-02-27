import { Component, OnInit, HostListener } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ManageBrandsService } from 'src/app/services/manage-brands.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { ComponentCanDeactivate } from 'src/app/services/pending-changes-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mobile-brands-list',
  templateUrl: './mobile-brands-list.component.html',
  styleUrls: ['./mobile-brands-list.component.css']
})
export class MobileBrandsListComponent implements OnInit,ComponentCanDeactivate {

  brandsList: Array<any> = Array<any>();
  deleteIcon=faTrashAlt;

  brandDeletedSelected:any;

  constructor(private manageBrandsService: ManageBrandsService,private router: Router,private loginService: LoginService,
    config: NgbModalConfig, private modalService: NgbModal, private logService: LogManagedService) { }

  ngOnInit() {
    // if(!this.loginService.isLogged()){
    //   this.router.navigate(['/login']);
    // }
    this.readBrandsList();
  }

  readBrandsList() {
    this.manageBrandsService.getBrandsList(2)
      .subscribe(
        item => {
          this.brandsList = Array<any>();
          let x = 1;
          if (item.hasOwnProperty('MarcasResult')) {
            const elementList = item['MarcasResult'];
            elementList.forEach(element => {
              let elementBrand: any = {};
              elementBrand.item=x++;
  
              elementBrand.brand = element['Marca'];
              elementBrand.dateCreated = this.formatDate(element['FecCreacion']);
              elementBrand.dateUpdate = this.formatDate(element['FecActualiza']);
              elementBrand.state = element['Estado'];
              elementBrand.quantity = element['Cantidad'];
              this.brandsList.push(elementBrand);
            });
            // console.log(this.brandsList);
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401){             
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  formatDate( dateParam:string){
    let x = dateParam.substring(dateParam.indexOf("(")+1,dateParam.indexOf("-0"));
    let dateEpoch = parseInt(x); 
    return new Date(dateEpoch);
  };


  getStateClass(x: boolean){
    if(x){
      return "activeState";
    }
    return "";
  }

  getState(x: boolean){
    if(x){
      return "Activo";
    }
    return "Inactivo";
  }

  deleteBrand( g:any){
    var suscripcion = this.manageBrandsService.deleteBrand(g.brand,2)
      .subscribe(
        respuesta => {
          if(respuesta["State"]){
            this.logService.addMessage(respuesta["Msg"],"success");
          }else{
            this.logService.addMessage(respuesta["Msg"],"warning");
          }
          this.readBrandsList();
          this.router.navigate(['/manage-brands/mobile']);
        });
  };

  open(content) {
    this.modalService.open(content);
  }

 action(x: boolean) {
   if (x) {
     this.deleteBrand(this.brandDeletedSelected);
   }
   this.modalService.dismissAll();
 }

 deleteBrandChange(g:any){
   this.brandDeletedSelected=g;
 }

 readVisibilityActions(data:string){
  // console.log(this.loginService.getActionsRole(data));
  return this.loginService.getActionsRole(data);
}

@HostListener('window:beforeunload')
canDeactivate(): Observable<boolean> | boolean {
  this.loginService.keepSession();
  return true;
}

}
