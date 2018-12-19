import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { Router } from '@angular/router';
import { EventsManagerService } from 'src/app/services/events-manager.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {


  subjectElementForm: FormGroup;
  @Input() submitted: boolean = false;
  @Input() fieldRequired: boolean = false;
  @Output() subjectChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() validateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private logService: LogManagedService, private loginService: LoginService,
    private router: Router, private eventsService: EventsManagerService) { }

  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    } else {
      if (this.fieldRequired) {
        this.subjectElementForm = this.formBuilder.group({
          subjectElement: ['', Validators.required]
        });
      }else{
        this.subjectElementForm = this.formBuilder.group({
          subjectElement: ['']
        });
      }
      this.Validation();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.subjectElementForm.controls; }

  Validation() {
    // stop here if form is invalid
    if (this.subjectElementForm.invalid) {
      return this.validateChange.emit(false);
    }
    return this.validateChange.emit(true);
  }

  generalKeyPressEvent(key: string, limit: number, control: AbstractControl, validateStrangeCharacters: boolean) {

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

  dataChange(){
    this.subjectChange.emit(this.f.subjectElement.value);
    this.Validation();
  }

}
