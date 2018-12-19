import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SymbolsService } from 'src/app/services/symbols.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-new-fixed-workflow',
  templateUrl: './new-fixed-workflow.component.html',
  styleUrls: ['./new-fixed-workflow.component.css']
})
export class NewFixedWorkflowComponent implements OnInit {
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
    let wf: any = { NombreFlujo: null, AnchoPx: x, AltoPx: y, IdTipoOperacion: 1, Simbolos: [] }
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
    this.symbolsService.saveWorkflow(data)
      .subscribe(
        respuesta => {
          if (respuesta["State"]) {
            this.logService.addMessage(respuesta["Msg"], "success");
          } else {
            this.logService.addMessage(respuesta["Msg"], "warning");
          }
          this.modalService.dismissAll();
          this.router.navigate(['/workflow/fixed']);
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }


}
