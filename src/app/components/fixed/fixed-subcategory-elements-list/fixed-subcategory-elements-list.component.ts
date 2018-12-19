import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { faEdit, faLongArrowAltLeft, faArrowLeft, faKaaba, faCube, faCubes, faTrash, faTrashAlt, faClone } from '@fortawesome/free-solid-svg-icons';
import { Elementsubcategory } from 'src/app/models/elementsSubcategory';
import { Categories } from 'src/app/models/Categories';
import { Subcategories } from 'src/app/models/Subcategories';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { EventsManagerService } from 'src/app/services/events-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionElementoSubCategoriaNuevo } from 'src/app/models/request/addSubCategoryElementModel';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-fixed-subcategory-elements-list',
  templateUrl: './fixed-subcategory-elements-list.component.html',
  styleUrls: ['./fixed-subcategory-elements-list.component.css']
})
export class FixedSubcategoryElementsListComponent implements OnInit {

  newSubCategoryElementForm: FormGroup;
  submitted = false;
  ageError = false;
  newSubCategoryElementFormView: boolean = false;
  subCategoryElementsList: Array<Elementsubcategory> = Array<Elementsubcategory>();

  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  copyIcon = faClone;
  backIcon = faArrowLeft;
  categoryIcon = faKaaba;
  subcategoryIcon = faCubes;
  subcategoryElementIcon = faCube;

  categoryId: number;
  subCategoryId: number;
  private sub: any;
  categorySelected: Categories = new Categories();
  subCategorySelected: Subcategories = new Subcategories();

  script: string = null;
  link: string = null;
  contact: string = null;
  tagLink: string = null;
  subject: string = null;
  age: string = null;
  ageCondition: string = null;
  subjectValidation: boolean = false;
  scriptValidation: boolean = false;
  linkValidation: boolean = false;
  contactOptionValidation: boolean = false;
  ageValidation: boolean = false;
  tagsArray: Array<string> = new Array<string>();
  fieldsRequiredList: Array<string> = new Array<string>();




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
      if (this.ageValidation && this.scriptValidation && this.linkValidation && this.contactOptionValidation && this.subjectValidation) {
        return true;
      }
    }
    return false;
  }



  open(content) {
    let validate: boolean = this.Validation();
    if (validate) {
      this.modalService.open(content);
    }
  }

  action(x: boolean) {
    if (x) {
      this.addSubCategoryElement();
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
    let data: PeticionElementoSubCategoriaNuevo = { ElementoNombre: this.f.subCategoryElementName.value, CreadoPor: "SYSTEM", IdSubCategoria: this.subCategoryId, CondicionEdad: this.ageCondition, EdadMora: this.age, Asunto: this.subject, idContacto: this.contact, LinkElemento: this.link, TagLink: this.tagLink, ScriptElemento: this.script };
    console.log(data);
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
          // this.router.navigate(['/events-manager/fixed']);
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
          this.subCategoryElementsList = Array<Elementsubcategory>();
          let x = 1;
          // console.log(item);
          if (item.hasOwnProperty('listaElementosResult')) {
            const elementList = item['listaElementosResult'];
            elementList.forEach(element => {
              let elementSubCategoryElement: Elementsubcategory = new Elementsubcategory();
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
      this.subCategoryId = +params['ref'];
    });
    this.readCategorySelected();
    this.readSubCategorySelected();
  }

  readCategorySelected() {
    this.eventsService.getCategoryById(this.categoryId)
      .subscribe(
        item => {
          this.categorySelected = new Categories();
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
        () =>  {
            this.readFieldsRequired();
        });
   
  }

  readSubCategorySelected() {
    this.eventsService.getSubCategoryById(this.subCategoryId)
      .subscribe(
        item => {
          this.subCategorySelected = new Subcategories();
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
    this.router.navigate(['/events-manager/fixed/category/' + this.categorySelected.idCategory])
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

  ageValidationChange(x: boolean) {
    this.ageValidation = x;
    // console.log("VALIDACION EDAD:"+this.ageValidation);
  }

  readTagsList() {
    this.eventsService.getTagsListScript("fixed")
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
          // console.log(this.fieldsRequiredList);
        },error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  isRequired(field:string){
    if(this.fieldsRequiredList.includes(field,0)){
      // console.log("OBLIGATORIO:"+field);
      return true;
    }
    return false;
  }

  readVisibilityActions(data:string){
    // console.log(this.loginService.getActionsRole(data));
    return this.loginService.getActionsRole(data);
  }
}
