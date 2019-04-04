import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { faEdit, faTrashAlt, faClone, faArrowLeft, faKaaba, faCubes, faCube } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { EventsManagerService } from 'src/app/services/events-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ComponentCanDeactivate } from 'src/app/services/pending-changes-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mobile-sub-category-elements-list',
  templateUrl: './mobile-sub-category-elements-list.component.html',
  styleUrls: ['./mobile-sub-category-elements-list.component.css']
})
export class MobileSubCategoryElementsListComponent implements OnInit,ComponentCanDeactivate {

  newSubCategoryElementForm: FormGroup;
  submitted = false;
  ageError = false;
  newSubCategoryElementFormView: boolean = false;
  subCategoryElementsList: Array<any> = Array<any>();

  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  copyIcon = faClone;
  backIcon = faArrowLeft;
  categoryIcon = faKaaba;
  subcategoryIcon = faCubes;
  subcategoryElementIcon = faCube;
  quantityLimit: number = 140;
  contactValue: number = null;
  categoryId: number;
  subCategoryId: number;
  private sub: any;
  categorySelected: any = {};
  subCategorySelected: any = {};

  script: string = null;
  link: string = null;
  contact: string = null;
  tagLink: string = null;
  subject: string = null;
  templateEmail: number = null
  age: string = null;
  ageCondition: string = null;
  subjectValidation: boolean = false;
  templateEmailOptionValidation: boolean = false;
  scriptValidation: boolean = false;
  linkValidation: boolean = false;
  contactOptionValidation: boolean = false;
  ageValidation: boolean = false;
  tagsArray: Array<string> = new Array<string>();
  fieldsRequiredList: Array<string> = new Array<string>();
  subcategoryElementSelected:number;




  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private logService: LogManagedService, private eventsService: EventsManagerService,
    private router: Router, private route: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    }
    this.newSubCategoryElementForm = this.formBuilder.group({
      subCategoryElementName: ['', Validators.required],
    });
    this.getFathersElement();
    this.readTagsList();
    this.readSubCategoryElementsList();
    // this.readFieldsRequired();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f() { return this.newSubCategoryElementForm.controls; }

  Validation() {
    this.submitted = true;
    if (!this.newSubCategoryElementForm.invalid) {
      //console.log(this.ageValidation, this.scriptValidation, this.linkValidation, this.contactOptionValidation, this.subjectValidation);
      if (this.ageValidation &&
        this.scriptValidation &&
        ((!this.linkValidation && this.categoryId == 10) || this.linkValidation) &&
        this.contactOptionValidation &&
        ((!this.subjectValidation && this.categoryId == 8) || this.subjectValidation)) {
        return true;
      }
    }

    return false;
  }



  open(content, x: number) {
    if (x != -1) {
      this.subcategoryElementSelected=x;
      this.modalService.open(content);
    } else {
      let validate: boolean = this.Validation();
      if (validate) {
        this.modalService.open(content);
      }
    }

  }

  action(x: boolean) {
    if (x) {
      this.addSubCategoryElement();
    } else {
      this.modalService.dismissAll();
    }
  }

  actionDelete(x: boolean) {
    if (x) {
      this.deleteElement(this.subcategoryElementSelected);
    } else {
      this.modalService.dismissAll();
    }
  }

  toggleFormNewSubCategoryElement() {
    this.newSubCategoryElementFormView = !this.newSubCategoryElementFormView;
    this.newSubCategoryElementForm.reset();
    this.submitted = false;
  }

  addSubCategoryElement() {
    let data: any = { ElementoNombre: this.f.subCategoryElementName.value, CreadoPor: "SYSTEM", IdSubCategoria: this.subCategoryId, CondicionEdad: this.ageCondition, EdadMora: this.age, Asunto: this.subject, idContacto: this.contact, LinkElemento: this.link, TagLink: this.tagLink, ScriptElemento: this.script, IdPlantilla: this.templateEmail || -1 };
    //console.log(data);
    var suscripcion = this.eventsService.addSubCategoryElement(data)
      .subscribe(
        respuesta => {
          if (respuesta["State"]) {
            this.logService.addMessage(respuesta["Msg"], "success");
          } else {
            this.logService.addMessage(respuesta["Msg"], "warning");
          }
          this.modalService.dismissAll();
          this.toggleFormNewSubCategoryElement();
          this.readSubCategoryElementsList();

        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });

  }

  readSubCategoryElementsList() {
    this.eventsService.getSubCategoryElementsList(this.subCategoryId)
      .subscribe(
        item => {
          this.subCategoryElementsList = Array<any>();
          let x = 1;
          // console.log(item);
          if (item.hasOwnProperty('listaElementosResult')) {
            const elementList = item['listaElementosResult'];
            elementList.forEach(element => {
              let elementSubCategoryElement: any = {};
              elementSubCategoryElement.item = x++;
              elementSubCategoryElement.nameElement = element['ElementoNombre'];
              elementSubCategoryElement.debtAge = element['EdadMora'];
              elementSubCategoryElement.scriptSms = this.getFrontFormatScript(element['ScriptElemento']);
              elementSubCategoryElement.createdBy = element['CreadoPor'];
              elementSubCategoryElement.dateCreated = this.formatDate(element['FecCreacion']);
              elementSubCategoryElement.dateUpdate = this.formatDate(element['FecActualizacion']);
              elementSubCategoryElement.idElement = element['IdElemento'];
              elementSubCategoryElement.idSubCategory = element['IdSubCategoria'];
              elementSubCategoryElement.state = element['Estado'];
              elementSubCategoryElement.sended = element['Enviado'];
              elementSubCategoryElement.ageCondition = element['CondicionEdad'];
              elementSubCategoryElement.subjectElement = element['Asunto'];
              elementSubCategoryElement.tagLink = element['TagLink'];
              // console.log("elementSubCategoryElement");
              // console.log(elementSubCategoryElement);
              this.subCategoryElementsList.push(elementSubCategoryElement);
            });
            // console.log(this.subCategoryElementsList);
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

  getFathersElement() {
    this.sub = this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
      if (this.categoryId == 8) {
        this.contactValue = 1;
      }
      if (this.categoryId == 10) {
        this.contactValue = 2;
        this.quantityLimit = null;
      }
      this.subCategoryId = +params['ref'];
    });
    this.readCategorySelected();
    this.readSubCategorySelected();
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
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        },
        () => {
          this.readFieldsRequired();
        });

  }

  readSubCategorySelected() {
    this.eventsService.getSubCategoryById(this.subCategoryId)
      .subscribe(
        item => {
          this.subCategorySelected = {};
          if (item.hasOwnProperty('SubCategoriaPorIdResult')) {
            const element = item['SubCategoriaPorIdResult'];
            this.subCategorySelected.nameSubCategory = element['SubCategoriaNombre'];
            this.subCategorySelected.createdBy = element['CreadoPor'];
            this.subCategorySelected.dateCreated = this.formatDate(element['FecCreacion']);
            this.subCategorySelected.dateUpdate = this.formatDate(element['FecActualizacion']);
            this.subCategorySelected.idCategory = element['IdCategoria'];
            this.subCategorySelected.idSubCategory = element['IdSubCategoria'];
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  backPage() {
    this.router.navigate(['/events-manager/mobile/category/' + this.categorySelected.idCategory])
  }

  generalKeyPressEvent(key: string, limit: number, control: FormControl, validateStrangeCharacters: boolean) {

    if (key == "Enter") {
      return false;
    }
    if (control.value != null) {
      if (control.value.length > limit) {
        return false;
      }
    }
    if (validateStrangeCharacters) {
      let strangeCharacters: string = "|!#$%&/()=?¡¿'*+[]{}^-_:;,.´¨~`°¬<>\\\"@";
      if (strangeCharacters.indexOf(key) != -1) {
        console.log("Caracter Invalido " + key);
        return false;
      }
    }
    return true;
  }

  setScript(textScript: string) {
    this.script = textScript;
    // console.log("SCRIPT:" + this.script);
  }

  setLink(textLink: string) {
    this.link = textLink;
    // console.log("LINK:" + this.link);
  }
  setTagLink(textTagLink: string) {
    this.tagLink = textTagLink;
    // console.log("TAGLINK:" + this.tagLink);
  }

  setContactOption(textContactOption: string) {
    this.contact = textContactOption;
    // console.log("CONTACTO:" + this.contact);
  }

  setTemplateOption(textTemplateOption: number) {
    this.templateEmail = textTemplateOption;
    //console.log("PLANTILLA:" + this.templateEmail);
  }
  setSubject(textSubject: string) {
    this.subject = textSubject;
    // console.log("ASUNTO:" + this.subject);
  }

  setAge(textAge: string) {
    this.age = textAge;
    // console.log("EDAD DE MORA:" + this.age);
  }
  setAgeCondition(textAgeCondition: string) {
    this.ageCondition = textAgeCondition;
    // console.log("CONDICION DE EDAD:" + this.ageCondition);
  }

  subjectValidationChange(x: boolean) {
    this.subjectValidation = x;
    // console.log("VALIDACION ASUNTO:"+this.subjectValidation);
  }

  scriptValidationChange(x: boolean) {
    this.scriptValidation = x;
    // console.log("VALIDACION SCRIPT:"+this.scriptValidation);
  }

  linkValidationChange(x: boolean) {
    this.linkValidation = x;
    // console.log("VALIDACION LINK:"+this.linkValidation);
  }

  contactOptionValidationChange(x: boolean) {
    this.contactOptionValidation = x;
    // console.log("VALIDACION CONTACTO:"+this.contactOptionValidation);
  }

  templateEmailOptionValidationChange(x: boolean) {
    this.templateEmailOptionValidation = x;
    // console.log("VALIDACION PLANTILLA:"+this.templateEmailOptionValidation);
  }

  ageValidationChange(x: boolean) {
    this.ageValidation = x;
    // console.log("VALIDACION EDAD:"+this.ageValidation);
  }

  readTagsList() {
    this.eventsService.getTagsListScript("mobile")
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaResult')) {
            const elementList = item['listaGenericaResult'];
            this.tagsArray = new Array<string>();
            elementList.forEach(element => {
              this.tagsArray.push(element['Valor']);
            });
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }
  getFrontFormatScript(scriptText: string) {
    // console.log(scriptText);
    let valueReturn: string = scriptText;
    this.tagsArray.forEach(element => {
      let x: string = "\*\*" + element + "\*\*";
      if (scriptText.indexOf(x) != -1) {
        let countComplete: boolean = false;
        while (!countComplete) {
          if (valueReturn.indexOf(x) != -1) {
            valueReturn = valueReturn.replace(x, '@' + element);
          } else {
            countComplete = true;
          }
        }
      }
    });
    return valueReturn;
  }

  getLinkCharactersQuantity() {
    return this.eventsService.linkQuantity;
  }

  getScriptCharactersQuantity() {
    return this.eventsService.scriptQuantity;
  }


  readFieldsRequired() {

    this.eventsService.getElementFieldsRequired(this.categorySelected.idCategory)
      .subscribe(
        item => {
          if (item.hasOwnProperty('CamposElementosResult')) {
            const elementList = item['CamposElementosResult'];
            this.fieldsRequiredList = new Array<string>();
            elementList.forEach(element => {
              this.fieldsRequiredList.push(element);
            });
          }
           //console.log(this.fieldsRequiredList);
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  isRequired(field: string) {
    if (this.fieldsRequiredList.includes(field, 0)) {
      // console.log("OBLIGATORIO:"+field);
      return true;
    }
    return false;
  }

  readVisibilityActions(data: string) {
    // console.log(this.loginService.getActionsRole(data));
    return this.loginService.getActionsRole(data);
  }

  dataChange(idSubcategoryElement: number) {
    let ok: boolean = false;
    this.eventsService.changeElementState(idSubcategoryElement)
      .subscribe(
        respuesta => {
          if (respuesta["State"]) {
            this.logService.addMessage(respuesta["Msg"], "success");
            ok = true;
          } else {
            this.logService.addMessage(respuesta["Msg"], "warning");
          }

        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        },
        () => {
          if (ok) {
            this.readSubCategoryElementsList();
          }
        }
      );

  }

  deleteElement(idSubcategoryElement: number) {
    let ok: boolean = false;
    this.eventsService.deleteElement(idSubcategoryElement)
      .subscribe(
        respuesta => {
          this.modalService.dismissAll();
          if (respuesta["State"]) {
            this.logService.addMessage(respuesta["Msg"], "success");
            ok = true;
          } else {
            this.logService.addMessage(respuesta["Msg"], "warning");
          }

        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        },
        () => {
          if (ok) {
            this.readSubCategoryElementsList();
          }
        }
      );

  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    this.loginService.keepSession();
    return true;
  }
}
