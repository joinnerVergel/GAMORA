import { Component, OnInit, Renderer2, AfterViewInit, HostListener } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SymbolsService } from 'src/app/services/symbols.service';
import { ComponentCanDeactivate } from 'src/app/services/pending-changes-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fixed-edit-work-flow',
  templateUrl: './fixed-edit-work-flow.component.html',
  styleUrls: ['./fixed-edit-work-flow.component.css']
})
export class FixedEditWorkFlowComponent implements OnInit,ComponentCanDeactivate {
  submitted = false;
  wfParameter:any;
  idWF:number;
  nameWF:string;
  isEdit:boolean=false;
  // wf:any;
  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private logService: LogManagedService,
    private router: Router, private loginService: LoginService,
    private renderer: Renderer2, private symbolsService: SymbolsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    }
     this.wfParameter= this.route.params.subscribe(params => {
      this.idWF = params['id'];
    });

    this.readWorkFlowIsEdit();
    this.readNameWF();
  }


  open(content) {
 
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

  action(x: boolean) {
    if (x) {
      this.addWorkFlow();
    } else {
      this.modalService.dismissAll();
    }
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
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  readNameWF(){
    this.symbolsService.getRefWorkflow(1,this.idWF.toString(),1)
    .subscribe(
      respuesta => {
        if (respuesta.hasOwnProperty('ObtenerReferenciaFlujoResult')) {
          let elementWF:any = respuesta['ObtenerReferenciaFlujoResult'];
          this.nameWF=elementWF["Valor"];
        }
        
      }, error => {
        if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
          this.loginService.clearSessionLogin();
          this.router.navigate(['/login']);
        }
      }
      );
    }
 
  readWorkFlowIsEdit() {
    this.symbolsService.getWorkFlow(this.idWF)
      .subscribe(
        item => {
          if (item.hasOwnProperty('ObtenerFlujoResult')) {
            const element = item['ObtenerFlujoResult'];
              this.isEdit=element['FlujoEditable'];
              //console.log(element);
              //console.log("ENCONTRADO: ",this.isEdit);
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
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
