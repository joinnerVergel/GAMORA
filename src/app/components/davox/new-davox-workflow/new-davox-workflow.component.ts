import { Component, OnInit, Renderer2, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SymbolsService } from 'src/app/services/symbols.service';
import { ComponentCanDeactivate } from 'src/app/services/pending-changes-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-davox-workflow',
  templateUrl: './new-davox-workflow.component.html',
  styleUrls: ['./new-davox-workflow.component.css']
})
export class NewDavoxWorkflowComponent implements OnInit,ComponentCanDeactivate {
  newWorkflowForm: FormGroup;
  submitted = false;

  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private logService: LogManagedService,
    private router: Router, private loginService: LoginService,
    private renderer: Renderer2, private symbolsService: SymbolsService) { }

  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    }
    this.newWorkflowForm = this.formBuilder.group({
      workflowName: ['', Validators.required],
    });
    let x = $('.divWorkFlow').width();
    let y = $('.divWorkFlow').height();
    let wf: any = { Creacion:true,NombreFlujo: null, AnchoPx: x, AltoPx: y, IdTipoOperacion: 4, Simbolos: [] }
    this.symbolsService.newWorkFlow(wf);
  }

  // convenience getter for easy access to form fields
  get f() { return this.newWorkflowForm.controls; }

  Validation() {
    this.submitted = true;
    if (!this.newWorkflowForm.invalid) {
      return true;
    }
    return false;
  }
  open(content) {
    let validate: boolean = this.Validation();
    if (validate) {
      let validOutput: boolean = this.symbolsService.validateEmptyExitNodes();
      if (validOutput) {
        let validInput: boolean = this.symbolsService.validateEmptyEntryNodes();
        if (validInput) {
          this.modalService.open(content);
        } else {
          this.logService.addMessage("Error: todos los símbolos excepto el de inicio del flujo, deben tener asociado un nodo padre", "warning");
        }
      } else {
        this.logService.addMessage("Error: todos los nodos de salida de los símbolos deben estar asociados a un nodo de entrada de un símbolo sucesor", "warning");
      }
    }
  }

  action(x: boolean) {
    if (x) {
      this.addWorkFlow();
    } else {
      this.modalService.dismissAll();
    }
  }
  generalKeyPressEvent(key: string, limit: number, control: AbstractControl, validateStrangeCharacters: boolean) {

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

  updateWorkFlow() {
    let wf: any = { NombreFlujo: this.f.workflowName.value }
    this.symbolsService.updateWorkFlow(wf, 0);
  }

  readNewLine() {
    return this.symbolsService.ElementConection;
  }

  addWorkFlow() {
    let data: any = JSON.parse(sessionStorage.getItem('workFlow'));
    let workFlowCreated:boolean=false;
    this.symbolsService.saveWorkflow(data)
      .subscribe(
        respuesta => {
          if (respuesta["State"]) {
            this.logService.addMessage(respuesta["Msg"], "success");
            workFlowCreated=true;
          } else {
            this.logService.addMessage(respuesta["Msg"], "warning");
          }
          this.modalService.dismissAll();
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        },() => {
          if(workFlowCreated){
            this.symbolsService.getRefWorkflow(2,this.f.workflowName.value,4)
            .subscribe(
              respuesta => {
                if (respuesta.hasOwnProperty('ObtenerReferenciaFlujoResult')) {
                  let elementWF:any = respuesta['ObtenerReferenciaFlujoResult'];
                  let r:any='/workflow/davox/edit-workflow/'+elementWF["Id"];
                  this.router.navigate([r]);
                }
                
              }, error => {
                if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
                  this.loginService.clearSessionLogin();
                  this.router.navigate(['/login']);
                }
              }
              );
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
