import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SentEventsService } from 'src/app/services/sent-events.service';

@Component({
  selector: 'app-sent-events',
  templateUrl: './sent-events.component.html',
  styleUrls: ['./sent-events.component.css']
})
export class SentEventsComponent implements OnInit {

  filterForm: FormGroup;
  searchIcon = faSearch;
  submitted = false;
  sentList: Array<any> = [];
  constructor(
    private formBuilder: FormBuilder,
    private logService: LogManagedService, private sentEvService: SentEventsService,
    private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    }
    const numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
    this.filterForm = this.formBuilder.group({
      filterType: ['CC', Validators.required],
      filterText: ['', [Validators.required, Validators.pattern(numericNumberReg)]],
    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.filterForm.controls; }

  Validation() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.filterForm.invalid) {
      return false;
    } else {
      return true;
    }
  }
  changeFilter() {
    this.f.filterText.clearValidators();
    if (this.f.filterType.value == 'CodCuenta' || this.f.filterType.value == 'CodCliente' ||
      this.f.filterType.value == 'Celular' || this.f.filterType.value == 'CC') {
      const numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
      this.f.filterText.setValidators([Validators.required, Validators.pattern(numericNumberReg)])
    }
    if (this.f.filterType.value == 'Correo') {
      this.f.filterText.setValidators([Validators.required, Validators.email])
    }
    let r = this.f.filterText.value;
    console.log(r);

    this.f.filterText.updateValueAndValidity;
    console.log(this.f.filterType.value == 'Correo', this.f.filterText.errors.email);

    // if(this.submitted){
    //   let x = this.Validation();
    //   console.log(x);
    // }


  }

  applyFilter() {
    let x = this.Validation();
    if (x) {
      let d:any={campo:this.f.filterType.value,valor:this.f.filterText.value}
      this.sentEvService.readSentEvents(d)
        .subscribe(
          item => {
            if (item.hasOwnProperty('BuscarUsuarioLDAPResult')) {
              this.sentList = item['BuscarUsuarioLDAPResult'];
            }
          }, error => {
            if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
              this.loginService.clearSessionLogin();
              this.router.navigate(['/login']);
            }
          });

    }
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    this.loginService.keepSession();
    return true;
  }
}
