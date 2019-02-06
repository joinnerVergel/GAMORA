import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { LoginService } from 'src/app/services/login.service';
import { EventsManagerService } from 'src/app/services/events-manager.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact-options',
  templateUrl: './contact-options.component.html',
  styleUrls: ['./contact-options.component.css']
})
export class ContactOptionsComponent implements OnInit {

  contactOptions = [];
  contactElementForm: FormGroup;
 
  @Input() submitted: boolean = false;
  @Input() fieldRequired: boolean = false;
  @Input() selectValue: string = null;
  @Output() contactOptionChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() validateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder,private http: HttpClient, private logService: LogManagedService, private loginService: LoginService,
    private router: Router, private eventsService: EventsManagerService) { }

  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    }else{
      if (this.fieldRequired) {
        this.contactElementForm = this.formBuilder.group({
          contactElement: ['', Validators.required]
        });
      } else {
        this.contactElementForm = this.formBuilder.group({
          contactElement: ['']
        });
      }
      this.readTagsList();
      this.Validation();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.contactElementForm.controls; }

  Validation() {
    // stop here if form is invalid
    if (this.contactElementForm.invalid) {
      console.log('EMITE false');
      return this.validateChange.emit(false);
    }
    console.log('EMITE true');
    return this.validateChange.emit(true);
  }

  readTagsList() {
    this.eventsService.getContactOptionsList()
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaResult')) {
            const elementList = item['listaGenericaResult'];
            elementList.forEach(element => {
              let elementContactOption = { id: element['Id'], contactOption: element['Valor'] };
              this.contactOptions.push(elementContactOption);
            });
            if(this.selectValue!=null){
              this.f.contactElement.setValue(this.selectValue);
              this.dataChange();
              this.f.contactElement.disable();
            }
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  dataChange(){
    this.contactOptionChange.emit(this.f.contactElement.value);
    this.Validation();
  }
}
