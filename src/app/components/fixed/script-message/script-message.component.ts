import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { EventsManagerService } from 'src/app/services/events-manager.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

let tags = [];
let tagsArray = [];
let characterQuantity: number;
//const quantityLimit: number = 140;
let charactersSize: number;

@Component({
  selector: 'app-script-message',
  templateUrl: './script-message.component.html',
  styleUrls: ['./script-message.component.css']
})
export class ScriptMessageComponent implements OnInit {
  tagsList = tags;
  scriptElementForm: FormGroup;

  limitExceeded: boolean = false;



  @Input() submitted: boolean = false;
  @Input() fieldRequired: boolean = false;
  @Input() linkCharactersQuantity: number = 0;
  @Input() quantityLimit: number = null;
  @Output() scriptChange: EventEmitter<string> = new EventEmitter<string>();
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
        this.scriptElementForm = this.formBuilder.group({
          scriptElement: ['', Validators.required]
        });
      } else {
        this.scriptElementForm = this.formBuilder.group({
          scriptElement: ['']
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
        //  console.log("ACTUAL:"+curVal+" ANTERIOR:"+prevVal);
        if (this.componentBegin) {
          this.dataChange();
        }

      }
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.scriptElementForm.controls; }

  Validation() {
    // stop here if form is invalid
    if (this.scriptElementForm.invalid || this.limitExceeded) {
      return this.validateChange.emit(false);
    }
    return this.validateChange.emit(true);
  }

  keyPressEvent(key: string) {
    if (key == "Enter" || (charactersSize <= 0 && this.quantityLimit != null)) {
      return false;
    }
    let strangeCharacters: string = "|!#$%&/()=?¡¿'*+[]{}^-_:;,.´¨~`°¬<>\\\"";
    if (strangeCharacters.indexOf(key) != -1) {
      console.log("Caracter Invalido " + key);
      return false;
    }
    return true;
  }

  dataChange() {
    let control = this.f.scriptElement;
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
          // console.log(characterQuantity + ">>>>>>>>");
        } else {
          countComplete = true;
        }
      }
      // console.log(text);
    });

    if (this.quantityLimit != null) {
      charactersSize = this.quantityLimit - characterQuantity - text.length - this.linkCharactersQuantity;
      this.eventsService.scriptQuantity = characterQuantity + text.length;
      this.limitExceeded = false;
      if (charactersSize < 0) {
        this.limitExceeded = true;
      }
    } else {
      this.limitExceeded = false;
    }
    this.scriptChange.emit(valueReturn);
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

}
