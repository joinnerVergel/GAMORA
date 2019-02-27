import { Component, OnInit, HostListener } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SymbolsService } from 'src/app/services/symbols.service';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { ComponentCanDeactivate } from 'src/app/services/pending-changes-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fixed-workflow-list',
  templateUrl: './fixed-workflow-list.component.html',
  styleUrls: ['./fixed-workflow-list.component.css']
})
export class FixedWorkflowListComponent implements OnInit,ComponentCanDeactivate {

  workFlowList:Array<any>= Array<any> ();
  editIcon = faEdit;

  constructor(private loginService: LoginService,private router: Router,private symbolsService: SymbolsService) { }

  ngOnInit() {
    if(!this.loginService.isLogged()){
      this.router.navigate(['/login']);
    }else{
      this.readWorkFlowList();
    }
  }

  readVisibilityActions(data:string){
    return this.loginService.getActionsRole(data);
  }

  readWorkFlowList() {
    this.symbolsService.getWorkflowList(1)
      .subscribe(
        item => {
          this.workFlowList = Array<any>();
          let x = 1;
          if (item.hasOwnProperty('ListarFlujoResult')) {
            const elementList = item['ListarFlujoResult'];
            elementList.forEach(element => {
              let elementWorkFlow: any ={};
              elementWorkFlow.item = x++;
              elementWorkFlow.nameWorkFlow = element['NombreFlujo'];
              elementWorkFlow.createdBy = element['CreadoPor'];
              elementWorkFlow.dateCreated = this.formatDate(element['FecCreacion']);
              elementWorkFlow.dateUpdate = this.formatDate(element['FecActualizacion']);
              elementWorkFlow.idOperationType = element['IdTipoOperacion'];
              elementWorkFlow.heightPx = element['AltoPx'];
              elementWorkFlow.weightPx = element['AnchoPx'];
              elementWorkFlow.duration = element['Duracion'];
              elementWorkFlow.events = element['Eventos'];
              elementWorkFlow.idWorkFlow = element['IdFlujo'];
              elementWorkFlow.eventsQuantity = element['QEventos'];
              this.workFlowList.push(elementWorkFlow);
            });
            
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401){             
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  formatDate(dateParam: string) {
    let x = dateParam.substring(dateParam.indexOf("(") + 1, dateParam.indexOf("-0"));
    let dateEpoch = parseInt(x);
    return new Date(dateEpoch);
  };

  editWorkflow(workFlowId: number) {
    this.router.navigate(['/workflow/fixed/edit-workflow/' + workFlowId])
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    this.loginService.keepSession();
    return true;
  }

}
