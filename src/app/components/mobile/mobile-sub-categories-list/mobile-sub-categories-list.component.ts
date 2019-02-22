import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { faEdit, faKaaba } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { EventsManagerService } from 'src/app/services/events-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-mobile-sub-categories-list',
  templateUrl: './mobile-sub-categories-list.component.html',
  styleUrls: ['./mobile-sub-categories-list.component.css']
})
export class MobileSubCategoriesListComponent implements OnInit ,OnDestroy {

  newSubCategoryForm: FormGroup;
  submitted = false;
  newSubCategoryFormView: boolean = false;
  subCategoriesList: Array<any> = Array<any>();

  editIcon = faEdit;
  categoryIcon=faKaaba;

  categoryId: number;
  private sub: any;
  categorySelected: any = {};

  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private logService: LogManagedService, private eventsService: EventsManagerService,
    private router: Router, private route: ActivatedRoute,private loginService: LoginService) { }

  ngOnInit() {
    if(!this.loginService.isLogged()){
      this.router.navigate(['/login']);
    }
    this.newSubCategoryForm = this.formBuilder.group({
      subCategoryName: ['', Validators.required],
    });
    this.getIdCategory();
    // this.readSubCategoriesList();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f() { return this.newSubCategoryForm.controls; }

  Validation() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newSubCategoryForm.invalid) {
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
      this.addSubCategory();
    } else {
      this.modalService.dismissAll();
    }
  }

  toggleFormNewSubCategory() {
    this.newSubCategoryFormView = !this.newSubCategoryFormView;
    this.newSubCategoryForm.reset();
    this.submitted=false;
  }

  addSubCategory() {
    let data: any = { SubCategoriaNombre: this.f.subCategoryName.value, CreadoPor: "SYSTEM", IdCategoria: this.categoryId };
    var suscripcion = this.eventsService.addSubCategory(data)
      .subscribe(
        respuesta => {
          if (respuesta["State"]) {
            this.logService.addMessage(respuesta["Msg"], "success");
          } else {
            this.logService.addMessage(respuesta["Msg"], "warning");
          }
          this.modalService.dismissAll();
          this.toggleFormNewSubCategory();
          this.readSubCategoriesList();
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401){             
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });

  }

  readSubCategoriesList() {
    this.eventsService.getSubCategoriesList(this.categoryId)
      .subscribe(
        item => {
          this.subCategoriesList = Array<any>();
          let x = 1;
          if (item.hasOwnProperty('listaSubCategoriasResult')) {
            const elementList = item['listaSubCategoriasResult'];
            elementList.forEach(element => {
              let elementSubCategory: any = {};
              elementSubCategory.item = x++;
              elementSubCategory.nameSubCategory = element['SubCategoriaNombre'];
              elementSubCategory.createdBy = element['CreadoPor'];
              elementSubCategory.dateCreated = this.formatDate(element['FecCreacion']);
              elementSubCategory.dateUpdate = this.formatDate(element['FecActualizacion']);
              elementSubCategory.idCategory = element['IdCategoria'];
              elementSubCategory.idSubCategory = element['IdSubCategoria'];
              this.subCategoriesList.push(elementSubCategory);
            });
            // console.log(this.subCategoriesList);
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401){             
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

  getIdCategory() {
    this.sub = this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
    });
    this.readCategorySelected();
    this.readSubCategoriesList();
  }

  readCategorySelected() {
    this.eventsService.getCategoryById(this.categoryId)
      .subscribe(
        item => {
          this.categorySelected = {};
          if (item.hasOwnProperty('CategoriaPorIdResult')) {
            const element = item['CategoriaPorIdResult'];
            this.categorySelected.nameCategory = element['CategoriaNombre'];
            this.categorySelected.createdBy = element['CreadoPor'];
            this.categorySelected.dateCreated = this.formatDate(element['FecCreacion']);
            this.categorySelected.dateUpdate = this.formatDate(element['FecActualizacion']);
            this.categorySelected.idCategory = element['IdCategoria'];
            this.categorySelected.idOperationType = element['IdTipoOperacion'];
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401){             
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

   editSubcategory(IdSubcategory:number){
    this.router.navigate(['/events-manager/mobile/category/'+this.categorySelected.idCategory+'/sub-category/'+IdSubcategory])
  }

  keyPressValidation(limit: number, control: FormControl, validateStrangeCharacters: boolean) {

    
    if (control.value.length > limit) {
      control.setValue(control.value.substring(0, limit));
    }

    if (validateStrangeCharacters) {
      let strangeCharacters: string = "|!#$%&/()=?¡¿'*+[]{}^-_:;,.´¨~`°¬<>\\\"@";
      let lastCharacter: string = control.value;
      if (strangeCharacters.indexOf(lastCharacter[lastCharacter.length - 1]) != -1) {
        console.log("Caracter Invalido "+lastCharacter[lastCharacter.length-1]);
        control.setValue(control.value.substring(0, lastCharacter.length - 1));
      }
    }

  }
  readVisibilityActions(data:string){
    // console.log(this.loginService.getActionsRole(data));
    return this.loginService.getActionsRole(data);
  }

}
