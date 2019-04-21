import { Component, OnInit, Renderer2, HostListener, Input } from '@angular/core';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SymbolsService } from 'src/app/services/symbols.service';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/services/pending-changes-guard.service';

@Component({
  selector: 'app-view-work-flow',
  templateUrl: './view-work-flow.component.html',
  styleUrls: ['./view-work-flow.component.css']
})
export class ViewWorkFlowComponent implements OnInit {
  submitted = false;
  wfParameter:any;
  @Input() idWF:number;
  @Input() nameManager:string;
  @Input() nameGroup:string;
  nameWF:string;
  constructor(
    private router: Router, private loginService: LoginService,
    private symbolsService: SymbolsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['/login']);
    }
    this.readNameWF();
  }


 
  readNewLine() {
    return this.symbolsService.ElementConection;
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
 
}
