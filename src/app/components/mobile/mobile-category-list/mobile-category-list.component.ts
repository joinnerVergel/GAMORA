import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { EventsManagerService } from 'src/app/services/events-manager.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ComponentCanDeactivate } from 'src/app/services/pending-changes-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mobile-category-list',
  templateUrl: './mobile-category-list.component.html',
  styleUrls: ['./mobile-category-list.component.css']
})
export class MobileCategoryListComponent implements OnInit, ComponentCanDeactivate {

  newCategoryForm: FormGroup;
  submitted = false;
  newCategoryFormView: boolean = false;
  categoriesList: Array<any> = Array<any>();

  editIcon = faEdit;
  dtOptions: any = {};
  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private logService: LogManagedService, private eventsService: EventsManagerService,
    private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    }
    this.newCategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
    });
    this.readCategoriesList();
  }

  // convenience getter for easy access to form fields
  get f() { return this.newCategoryForm.controls; }

  Validation() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newCategoryForm.invalid) {
      return false;
    }
    return true;
  }

  open(content) {
    let validate: boolean = this.Validation();
    if (validate) {
      this.modalService.open(content);
    }
  }

  action(x: boolean) {
    if (x) {
      this.addCategory();
    } else {
      this.modalService.dismissAll();
    }
  }

  toggleFormNewCategory() {
    this.newCategoryFormView = !this.newCategoryFormView;
    this.newCategoryForm.reset();
    this.submitted = false;
  }

  addCategory() {
    if (this.readVisibilityActions('CREAR_CATEGORIA')) {
      let data: any = { CategoriaNombre: this.f.categoryName.value, CreadoPor: "SYSTEM", IdTipoOperacion: 2 };
      var suscripcion = this.eventsService.addCategory(data)
        .subscribe(
          respuesta => {
            if (respuesta["State"]) {
              this.logService.addMessage(respuesta["Msg"], "success");
            } else {
              this.logService.addMessage(respuesta["Msg"], "warning");
            }
            this.modalService.dismissAll();
            this.toggleFormNewCategory();
            this.readCategoriesList();
          }, error => {
            if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
              this.loginService.clearSessionLogin();
              this.router.navigate(['/login']);
            }
          });
    }
  }

  readCategoriesList() {
    this.eventsService.getCategoriesList(2)
      .subscribe(
        item => {
          this.categoriesList = Array<any>();
          let x = 1;
          if (item.hasOwnProperty('listaCategoriasResult')) {
            const elementList = item['listaCategoriasResult'];
            elementList.forEach(element => {
              let elementCategory: any = {};
              elementCategory.item = x++;
              elementCategory.nameCategory = element['CategoriaNombre'];
              elementCategory.createdBy = element['CreadoPor'];
              elementCategory.dateCreated = this.formatDate(element['FecCreacion']);
              elementCategory.dateUpdate = this.formatDate(element['FecActualizacion']);
              elementCategory.idCategory = element['IdCategoria'];
              elementCategory.idOperationType = element['IdTipoOperacion'];
              this.categoriesList.push(elementCategory);
            });
            // console.log(this.categoriesList);
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  formatDate(dateParam: string) {
    let x = dateParam.substring(dateParam.indexOf("(") + 1, dateParam.indexOf("-0"));
    let dateEpoch = parseInt(x);
    return new Date(dateEpoch);
  };

  editSubcategories(categoryId: number) {
    if (this.readVisibilityActions('CONSULTAR_SUBCATEGORIA')) {
      this.router.navigate(['/events-manager/mobile/category/' + categoryId])
    }
  }

  keyPressValidation(limit: number, control: FormControl, validateStrangeCharacters: boolean) {


    if (control.value.length > limit) {
      control.setValue(control.value.substring(0, limit));
    }

    if (validateStrangeCharacters) {
      let strangeCharacters: string = "|!#$%&/()=?¡¿'*+[]{}^-_:;,.´¨~`°¬<>\\\"@";
      let lastCharacter: string = control.value;
      if (strangeCharacters.indexOf(lastCharacter[lastCharacter.length - 1]) != -1) {
        console.log("Caracter Invalido " + lastCharacter[lastCharacter.length - 1]);
        control.setValue(control.value.substring(0, lastCharacter.length - 1));
      }
    }

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
}
