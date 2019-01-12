import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { EventsManagerService } from 'src/app/services/events-manager.service';

@Component({
  selector: 'app-age-debt',
  templateUrl: './age-debt.component.html',
  styleUrls: ['./age-debt.component.css']
})
export class AgeDebtComponent implements OnInit {

  ageError = false;
  ageErrorNoRequired=false;

  ageDebtElementForm: FormGroup;
  @Input() submitted: boolean = false;
  @Input() fieldRequired: boolean = false;
  @Output() ageChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() ageConditionChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() validateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private logService: LogManagedService, private loginService: LoginService,
    private router: Router, private eventsService: EventsManagerService) { }

  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    } else {
      if (this.fieldRequired) {
        this.ageDebtElementForm = this.formBuilder.group({
          ageSelectRadio: [1, Validators.required],
          debtAge: ['', Validators.required],
          fromDebtAge: ['', Validators.required],
          untilDebtAge: ['', Validators.required]
        });
      } else {
        this.ageDebtElementForm = this.formBuilder.group({
          ageSelectRadio: [1, Validators.required],
          debtAge: [''],
          fromDebtAge: [''],
          untilDebtAge: ['']
        });
      }
      this.Validation();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.ageDebtElementForm.controls; }

  Validation() {
    if (this.fieldRequired && this.f.ageSelectRadio.value == "1" && (this.f.debtAge.value === "" || this.f.debtAge.value === null)) {
      // console.log(this.f.debtAge.value+"ACA1"+this.fieldRequired, this.f.ageSelectRadio.value == "1" ,(this.f.debtAge.value === "" || this.f.debtAge.value === null) );
      return this.validateChange.emit(false);
    }
    if (this.f.ageSelectRadio.value == "2") {
      this.ageValidate();
      if (this.fieldRequired) {
        if (this.ageError || this.f.fromDebtAge.value === "" || this.f.untilDebtAge.value === "" || this.f.fromDebtAge.value === null || this.f.untilDebtAge.value === null) {
          console.log("ACA0",this.ageError , this.f.fromDebtAge.value === "" , this.f.untilDebtAge.value === "" , this.f.fromDebtAge.value === null , this.f.untilDebtAge.value === null);
          return this.validateChange.emit(false);
        }
      } else {
        if (this.ageError) {
          if ((this.f.fromDebtAge.value === "" || this.f.fromDebtAge.value === null) && (this.f.untilDebtAge.value != "" && this.f.untilDebtAge.value != null)) {
            this.ageErrorNoRequired=true;
            console.log("ACA1");
            return this.validateChange.emit(false);
          }
          if ((this.f.untilDebtAge.value === "" || this.f.untilDebtAge.value === null) && (this.f.fromDebtAge.value != "" && this.f.fromDebtAge.value != null)) {
            this.ageErrorNoRequired=true;
            console.log("ACA2");
            return this.validateChange.emit(false);
          }
          if (this.f.untilDebtAge.value != "" && this.f.untilDebtAge.value != null && this.f.fromDebtAge.value != "" && this.f.fromDebtAge.value != null) {
            this.ageErrorNoRequired=true;
            console.log("ACA3");
            return this.validateChange.emit(false);
          }
          this.ageErrorNoRequired=false;
        }
      }
    }
    return this.validateChange.emit(true);
  }

  dataChange() {
    let condition: string = "=";
    let valueCondition: string = this.f.debtAge.value;
    console.log(valueCondition);
    if (this.f.ageSelectRadio.value == "2") {
      condition = "*";
      valueCondition = this.f.fromDebtAge.value + "*" + this.f.untilDebtAge.value;
    }
    this.ageChange.emit(valueCondition);
    this.ageConditionChange.emit(condition);
    this.Validation();
  }

  ageValidate() {
    if (this.f.untilDebtAge.value <= this.f.fromDebtAge.value) {
      this.ageError = true;
    } else {
      if(this.f.fromDebtAge.value==="" || this.f.fromDebtAge.value===null){
        this.ageError = true;  
      }else{
        this.ageError = false;
      }
      
    }
  }

}
