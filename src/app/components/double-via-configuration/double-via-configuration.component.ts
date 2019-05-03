import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SymbolsService } from 'src/app/services/symbols.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EventsManagerService } from 'src/app/services/events-manager.service';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-double-via-configuration',
  templateUrl: './double-via-configuration.component.html',
  styleUrls: ['./double-via-configuration.component.css']
})
export class DoubleViaConfigurationComponent implements OnInit {

  responseList: Array<any> = Array<any>();
  deleteIcon = faTrashAlt;
  responseSelected: any = {};
  newResponseForm: FormGroup;
  submitted = false;
  newResponseFormView: boolean = false;

  constructor( private router: Router, private loginService: LoginService,
    private route: ActivatedRoute,
    public modalService: NgbModal, private formBuilder: FormBuilder,
    private eventsService:EventsManagerService,
    private logService:LogManagedService) { }

  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    } else {
       this.readResponseList();
    }
    this.newResponseForm = this.formBuilder.group({
      clientResponse: [0, Validators.required],
      toolResponse: [0,Validators.required],
    });
  }

    // convenience getter for easy access to form fields
    get f() { return this.newResponseForm.controls; }

    Validation() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.newResponseForm.invalid) {
        return false;
      }
      return true;
    }
    action(x: boolean, action: string) {
      if (x) {
        if (action == "add") {
          this.addResponse();
          this.toggleFormNewResponse();
        }
        if (action == "delete") {
          this.deleteResponse(this.responseSelected);
        }
      }
    }
  

  open( action: string) {
    if (action == "add") {
      let validate: boolean = this.Validation();
      if (validate) {
        const modalRef = this.modalService.open(ConfirmDialogComponent);
        modalRef.componentInstance.description="Se va a configurar una nueva respuesta para los clientes";
        modalRef.componentInstance.question="¿Está seguro de ejecutar esta acción?"
        modalRef.componentInstance.result.subscribe(($e) => {
          this.action($e, action); 
        });
      }
    } else {
      const modalRef = this.modalService.open(ConfirmDialogComponent);
        modalRef.componentInstance.description="Se va a eliminar el descuento seleccionado.";
        modalRef.componentInstance.question="¿Está seguro de ejecutar esta acción?"
        modalRef.componentInstance.result.subscribe(($e) => {
          this.action($e, action); 
        });
    }
  }

  saveResponse() {
    let Response_: Array<any> = [];
    
    this.responseList.forEach(element => {
      let d: any = { respuestaCliente: element.respuestaCliente, respuestaHerramienta: element.respuestaHerramienta}
      Response_.push(d);
    });
    
    var suscripcion = this.eventsService.saveResponse(Response_)
      .subscribe(
        respuesta => {
          if (respuesta["State"]) {
            this.logService.addMessage(respuesta["Msg"], "success");
            
          } else {
            this.logService.addMessage(respuesta["Msg"], "warning");
          }
          this.readResponseList();
        });
  }

  readResponseList() {
    this.eventsService.getResponseList()
      .subscribe(
        item => {
          this.responseList = [];
          let x = 1;
          if (item.hasOwnProperty('ObtenerRespuestasResult')) {
            const elementList = item['ObtenerRespuestasResult'];
            elementList.forEach(element => {
              let elementResponse: any = {};
              elementResponse.item = x++;
              elementResponse.respuestaCliente = element['respuestaCliente'];
              elementResponse.respuestaHerramienta = element['respuestaHerramienta'];
              this.responseList.push(elementResponse);
            });
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  deleteResponse(d: any) {
    if (this.readVisibilityActions('ELIMINAR_DESCUENTO')) {
      this.responseList = this.responseList.filter(x => x.item != d.item);
       this.saveResponse();
    }
  }
  addResponse() {
    if (this.readVisibilityActions('CREAR_DESCUENTO')) {
      let d: any = { item: this.responseList.length + 1, respuestaCliente:this.f.clientResponse.value,respuestaHerramienta:this.f.toolResponse.value  };
      console.log(d);
      this.responseList.push(d);
      this.saveResponse();
    }
  }

  toggleFormNewResponse() {
    this.newResponseFormView = !this.newResponseFormView;
    this.newResponseForm.reset();
    this.submitted = false;
  }
  readVisibilityActions(data: string) {
    return this.loginService.getActionsRole(data);
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

 
}
