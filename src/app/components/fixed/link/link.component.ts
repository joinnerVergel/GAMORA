import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { EventsManagerService } from 'src/app/services/events-manager.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


let tags = [];
let tagsArray = [];
let characterQuantity: number;
let charactersSize: number;
@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})


export class LinkComponent implements OnInit {
  tagsList = tags;
  linkElementForm: FormGroup;

  linkExist: boolean = false;
  limitExceeded: boolean = false;


  @Input() quantityLimit: number = null;
  @Input() submitted: boolean = false;
  @Input() fieldRequired: boolean = false;
  @Input() scriptCharactersQuantity: number = 0;
  @Output() linkChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() tagLinkChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() validateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  msgHTML: string = '';
  componentBegin: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private logService: LogManagedService, private eventsService: EventsManagerService, private router: Router
    , private loginService: LoginService) { }


  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    } else {
      if (this.fieldRequired) {
        this.linkElementForm = this.formBuilder.group({
          linkElement: ['', Validators.required],
          tagLinkElement: ['', Validators.required]
        });
      } else {
        this.linkElementForm = this.formBuilder.group({
          linkElement: [''],
          tagLinkElement: ['']
        });
      }
      characterQuantity = 0;
      if (this.quantityLimit != null) {
        charactersSize = this.quantityLimit;
      }
      this.readTagsList();
      this.Validation();
      this.componentBegin = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      let curVal = JSON.stringify(change.currentValue);
      let prevVal = JSON.stringify(change.previousValue);
      if (prevVal != "false" && prevVal != "true") { //indica que el cambio se produjo en la cantidad de caracteres del link
        if (this.componentBegin) {
          this.dataChange();
        }

      }
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.linkElementForm.controls; }

  Validation() {
    // stop here if form is invalid
    if (this.linkElementForm.invalid || this.limitExceeded) {
      return this.validateChange.emit(false);
    } else {
      if (!this.fieldRequired && this.f.linkElement.value.length > 0 && this.f.tagLinkElement.value.length <= 0) {
        return this.validateChange.emit(false);
      }
    }
    return this.validateChange.emit(true);
  }


  keyPressEvent(key: string) {
    if (key == "Enter" || (charactersSize <= 0 && this.quantityLimit != null) || key == " ") {
      return false;
    }
    let strangeCharacters: string = "|!$()¡¿'*[]{}^:;,´¨~`°¬<>\\\"";
    if (strangeCharacters.indexOf(key) != -1) {
      console.log("Caracter Invalido " + key);
      return false;
    }
    return true;
  }

  dataChange() {
    let control = this.f.linkElement;
    if (control.value.length > 0) {
      this.linkExist = true;
    } else {
      this.linkExist = false;
    }

    this.msgHTML = control.value;
    characterQuantity = 0;
    let text: string = control.value;
    let valueReturn: string = control.value;
    tags.forEach(element => {
      let x = '@' + element.tag;
      if (control.value.indexOf(x) != -1) {
        var regularExpression = new RegExp(x, "g");
        this.msgHTML = this.msgHTML.replace(regularExpression, '<span class="tag">' + element.tag + '</span>');
        valueReturn = valueReturn.replace(regularExpression, '**' + element.tag + '**');
      }
      let elementSize: number = +element.size;
      let countComplete: boolean = false;
      while (!countComplete) {
        if (text.indexOf(x) != -1) {
          text = text.replace(x, "");
          characterQuantity = characterQuantity + elementSize;
        } else {
          countComplete = true;
        }
      }
    });
    if (this.quantityLimit != null) {
      charactersSize = this.quantityLimit - characterQuantity - text.length - this.scriptCharactersQuantity;
      this.eventsService.linkQuantity = characterQuantity + text.length;
      this.limitExceeded = false;
      if (charactersSize < 0) {
        this.limitExceeded = true;
      }
    } else {
      this.limitExceeded = false;
    }

    this.linkChange.emit(valueReturn);
    this.Validation();
    
  }


  // FUNCION QUE FILTRA LA LISTA DE TAGS A MEDIDA QUE VOY ESCRIBIENDO
  findChoices(searchText: string) {
    return tagsArray
      .filter(item => item.toLowerCase().includes(searchText.toLowerCase()))
      .slice(0, 5);
  }

  //FUNCION QUE AGREGA EL TAG UNA VEZ LO SELECCIONO
  getChoiceLabel(choice: string) {

    let elementTag = tags.filter(item => item.tag == `${choice}`);
    let size: number = +elementTag[0].size;
    if (charactersSize < size) {
      return "@";
    }
    return `@${choice}`;
  }

  readTagsList() {
    this.eventsService.getTagsListScript("fixed")
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaResult')) {
            const elementList = item['listaGenericaResult'];
            tags.splice(0, tags.length);
            tagsArray.splice(0, tagsArray.length);
            elementList.forEach(element => {
              let elementTag = { tag: element['Valor'], size: element['Id'] };
              tags.push(elementTag);
              tagsArray.push(element['Valor']);
            });
            // console.log(tags);
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  getCharactersSize() {
    return charactersSize;
  }

  generalKeyPressEvent(key: string, limit: number, control: FormControl, validateStrangeCharacters: boolean, space: boolean) {

    if (!space && key == " ") {
      return false;
    }
    if (key == "Enter") {
      return false;
    }
    if (control.value.length > limit) {
      return false;
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

  dataTagChange() {
    this.tagLinkChange.emit(this.f.tagLinkElement.value);
    this.Validation();
    // this.validateChange.emit(this.f.linkElement.value.length > 0 ? !this.linkElementForm.invalid : true);
  }

}
