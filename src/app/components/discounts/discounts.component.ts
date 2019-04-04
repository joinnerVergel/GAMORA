import { Component, OnInit, HostListener } from '@angular/core';
import { ComponentCanDeactivate } from 'src/app/services/pending-changes-guard.service';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { RONAnConfigurationService } from 'src/app/services/ronan-configuration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit, ComponentCanDeactivate {

  discountsList: Array<any> = Array<any>();
  deleteIcon = faTrashAlt;
  discountSelected: any = {};
  newDiscountForm: FormGroup;
  submitted = false;
  newDiscountFormView: boolean = false;

  constructor(private router: Router, private loginService: LoginService,
    config: NgbModalConfig, private modalService: NgbModal, private logService: LogManagedService,
    private agreementService: RONAnConfigurationService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    } else {
      this.readDiscountsList();
    }
    this.newDiscountForm = this.formBuilder.group({
      firstAge: [0, Validators.required],
      lastAge: [0,Validators.min(0)],
      payDay: [0, [Validators.required,Validators.min(0)]],
      discount: [0, [Validators.required,Validators.min(0)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.newDiscountForm.controls; }

  Validation() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newDiscountForm.invalid) {
      return false;
    }
    return true;
  }

  toggleFormNewDiscount() {
    this.newDiscountFormView = !this.newDiscountFormView;
    this.newDiscountForm.reset();
    this.submitted=false;
  }
  readDiscountsList() {
    this.agreementService.getDiscountsList()
      .subscribe(
        item => {
          this.discountsList = [];
          let x = 1;
          if (item.hasOwnProperty('ObtenerDescuentosResult')) {
            const elementList = item['ObtenerDescuentosResult'];
            elementList.forEach(element => {
              let elementDiscount: any = {};
              elementDiscount.item = x++;
              elementDiscount.firstDebtAge = element['MoraInicial'];
              elementDiscount.lastDebtAge = element['MoraFinal'];
              elementDiscount.payDays = element['DiasPago'];
              elementDiscount.discountValue = element['DescuentoRelativo'];
              this.discountsList.push(elementDiscount);
            });
            //console.log(this.discountsList);
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }



  saveDiscounts() {
    let Discounts:Array<any>=[];
    this.discountsList.forEach(element => {
      let d:any={DescuentoRelativo: element.discountValue, DiasPago: element.payDays, MoraFinal: (element.lastDebtAge==null?"INDF":element.lastDebtAge), MoraInicial: element.firstDebtAge}
      Discounts.push(d);
    });
    var suscripcion = this.agreementService.saveDiscounts(Discounts)
      .subscribe(
        respuesta => {
          if (respuesta["State"]) {
            this.logService.addMessage(respuesta["Msg"], "success");
            this.toggleFormNewDiscount();
          } else {
            this.logService.addMessage(respuesta["Msg"], "warning");
          }
          this.readDiscountsList();
        });
  }

  deleteDiscount(d: any) {
    this.discountsList = this.discountsList.filter(x => x.item != d.item);
    this.saveDiscounts();
  }
  addDiscount() {
    let d:any={item:this.discountsList.length+1,discountValue: this.f.discount.value,payDays: this.f.payDay.value,lastDebtAge: this.f.lastAge.value,firstDebtAge: this.f.firstAge.value};
    this.discountsList.push(d);
    this.saveDiscounts();
  }

  open(content, action: string) {
    if (action == "add") {
      let validate: boolean = this.Validation();
      if (validate) {
        this.modalService.open(content);
      }
    }else{
      this.modalService.open(content)
    }
  }

  action(x: boolean, action: string) {
    if (x) {
      if (action == "add") {
        this.addDiscount();
      }
      if (action == "delete") {
        this.deleteDiscount(this.discountSelected);
      }
    }
    this.modalService.dismissAll();
  }

  changeFirstAge(){
    this.f.lastAge.clearValidators();
    this.f.lastAge.setValidators([Validators.min(this.f.firstAge.value+1)]);
    this.f.lastAge.setValue(this.f.lastAge.value);
    //console.log("cambio");
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
