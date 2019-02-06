import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { EventsManagerService } from 'src/app/services/events-manager.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.css']
})
export class EmailTemplatesComponent implements OnInit {

  templatesOptions = [];
  emailTemplatesForm: FormGroup;
  templateSelected: string;
  templateSelectedModified: string;
  viewIcon = faEye;

  @Input() submitted: boolean = false;
  @Input() fieldRequired: boolean = false;
  @Input() data: string = null;
  @Input() selectValue: string = null;
  @Output() templateOptionChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() validateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private logService: LogManagedService, private loginService: LoginService,
    private router: Router, private eventsService: EventsManagerService,
    config: NgbModalConfig, private modalService: NgbModal,
    private sanitizer: DomSanitizer) {
      config.backdrop = 'static';
      config.keyboard = false;
     }

  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    } else {
      if (this.fieldRequired) {
        this.emailTemplatesForm = this.formBuilder.group({
          templateElement: ['', Validators.required]
        });
      } else {
        this.emailTemplatesForm = this.formBuilder.group({
          templateElement: ['']
        });
      }
      this.readTagsList();
      this.Validation();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.emailTemplatesForm.controls; }

  Validation() {
    // stop here if form is invalid
    if (this.emailTemplatesForm.invalid) {
      console.log('EMITE false');
      return this.validateChange.emit(false);
    }
    console.log('EMITE true');
    return this.validateChange.emit(true);
  }

  readTagsList() {
    this.eventsService.getTemplatesOptionsList()
      .subscribe(
        item => {
          if (item.hasOwnProperty('ObtenerPlantillasCorreoResult')) {
            const elementList = item['ObtenerPlantillasCorreoResult'];
            elementList.forEach(element => {
              let elementTemplateOption: any = { id: element['IdPlantilla'], templateName: element['Nombre'], template: element['Plantilla'] };
              this.templatesOptions.push(elementTemplateOption);
            });
            if (this.selectValue != null) {
              this.f.templateElement.setValue(this.selectValue);
              this.dataChange();
              this.f.templateElement.disable();
            }
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  dataChange() {
    this.templateOptionChange.emit(this.f.templateElement.value);
    this.Validation();
    this.readTemplateSelected();
  }


  readTemplateSelected() {
    this.eventsService.getTemplateSelected(this.f.templateElement.value)
      .subscribe(
        item => {
          if (item.hasOwnProperty('PlantillaCorreoResult')) {
            this.templateSelected = item['PlantillaCorreoResult'];
            
            // console.log(this.templateSelected);
            
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  open(content) {
    this.templateSelectedModified = this.templateSelected.replace("**script**", this.data);
    // console.log("CAMBIÓ",this.templateSelected);
    // lg,md,sm
    this.modalService.open(content,{ size: 'lg'});
  }

  cancel() {
    this.modalService.dismissAll();
  }

  getTemplateName(x: number) {

    let r: any = this.templatesOptions.filter(y => y.id == x);
    // console.log("ASDDAS: ",x,r)
    return r[0].templateName;
  }
  transform(value: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }



}
