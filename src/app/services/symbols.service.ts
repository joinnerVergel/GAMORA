import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { symbolsListUrl, workFlowAddUrl, fixedWorkFlowListUrl, readFixedWorkFlow } from './url';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SymbolsService {
  symbolSelected: string = null;
  outElement: string = null;
  inElement: string = null;
  optionOutElement: string = null;
  ElementConection: boolean = false;
  ElementReposition:boolean=false;
  ElementRepositionId:string=null;
  dropElementX:number=null;
  dropElementY:number=null;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getFixedSymbolsList() {
    return this.http.get(symbolsListUrl, this.loginService.getHttpOptions());
  }

  getWorkFlow(url:string) {
    return this.http.get(readFixedWorkFlow+url, this.loginService.getHttpOptions());
  }

  addSymbol(symbol: any) {
    let l = JSON.parse(sessionStorage.getItem('workFlow'));
    let symbolsList: Array<any> = l['Simbolos'];
    symbolsList.push(symbol);
    l['Simbolos'] = symbolsList;
    sessionStorage.setItem('workFlow', JSON.stringify(l));
  };

  updateSymbol(symbol: any) {
    let l = JSON.parse(sessionStorage.getItem('workFlow'));
    let symbolsList: Array<any> = l['Simbolos'];
    symbolsList.forEach(element => {
      if (element.IdSimbolo == symbol.IdSimbolo) {
        element.CoordenadaX = symbol.CoordenadaX;
        element.CoordenadaY = symbol.CoordenadaY;
        if (element.IdTipoSimbolo == 2) {
          element.TiempoEspera = symbol.TiempoEspera;
        }
        if (element.IdTipoSimbolo == 1) {
          element.Horario = symbol.Horario;
          element.Repeticiones = symbol.Repeticiones;
        }
      }
    });
    l['Simbolos'] = symbolsList;
    sessionStorage.setItem('workFlow', JSON.stringify(l));
  };

  newWorkFlow(wf: any) {
    sessionStorage.setItem('workFlow', JSON.stringify(wf));
  }

  updateWorkFlow(wf: any, option: number) {
    let l = JSON.parse(sessionStorage.getItem('workFlow'));
    if (option == 0) {
      l.NombreFlujo = wf.NombreFlujo;
    }
    if (option == 1) {
      l.AnchoPx = wf.AnchoPx;
      l.AltoPx = wf.AltoPx;
    }
    sessionStorage.setItem('workFlow', JSON.stringify(l));
  }

  validateEmptyExitNodes() {
    let r: boolean = true;
    let l = JSON.parse(sessionStorage.getItem('workFlow'));
    let symbolsList: Array<any> = l['Simbolos'];
    symbolsList.forEach(element => {
      if (element.IdTipoSimbolo != 5) {
        if (element.NodoSucesor == null) {
          r = false;
        } else {
          if (element.NodoSucesor.indexOf("null,") != -1 || element.NodoSucesor.indexOf(",null") != -1) {
            r = false;
          }
        }
      }
    });
    return r;
  }
  validateEmptyEntryNodes() {
    let r: boolean = false;
    let response: boolean = true;
    let l = JSON.parse(sessionStorage.getItem('workFlow'));
    let symbolsList: Array<any> = l['Simbolos'];
    symbolsList.forEach(i => {
      if (i.IdTipoSimbolo != 4) {
        r = false;
        // console.log("NODO EVALUADO:" + i.Nombre);
        symbolsList.forEach(j => {
          if (j.IdTipoSimbolo != 5) {
            // console.log("COMPARADO CON:" + j.Nombre + "  sucesor:" + j.NodoSucesor);
            if (j.NodoSucesor.indexOf(i.IdSimbolo) != -1) {
              r = true;
            }
          }
        });
        if (!r) {
          response = false;
        }
      }
    });
    return response;
  }

  getPositionSymbol(IdS: string) {
    let r: any = null;
    let l = JSON.parse(sessionStorage.getItem('workFlow'));
    let symbolsList: Array<any> = l['Simbolos'];
    symbolsList.forEach(element => {
      if (element.IdSimbolo == IdS) {
        r = { x: element.CoordenadaX, y: element.CoordenadaY };
      }
    });
    return r;
  }

  getAddPositionSymbol(IdS: string, point: string, option: string) {
    let r: any = { x: 0, y: 0 };
    let l = JSON.parse(sessionStorage.getItem('workFlow'));
    let symbolsList: Array<any> = l['Simbolos'];
    symbolsList.forEach(element => {

      if (element.IdSimbolo == IdS) {
        if (element.IdTipoSimbolo == 1) {
          if (point == "in") {
            r = { x: 42, y: 0 };
          } else {
            r = { x: 42, y: 40 };
          }
        }
        if (element.IdTipoSimbolo == 2) {
          if (point == "in") {
            r = { x: 21, y: 2 };
          } else {
            r = { x: 21, y: 38 };
          }
        }
        if (element.IdTipoSimbolo == 3) {
          if (point == "in") {
            r = { x: 17, y: 0 };
          } else {
            if (option == "YES") {
              r = { x: 0, y: 17 };
            } else {
              r = { x: 32, y: 17 };
            }
          }
        }
        if (element.IdTipoSimbolo == 4) {
          r = { x: 40, y: 40 };
        }
        if (element.IdTipoSimbolo == 5) {
          r = { x: 40, y: 0 };
        }
      }
    });
    return r;
  }

  addSuccessorNode() {
    let l = JSON.parse(sessionStorage.getItem('workFlow'));
    let symbolsList: Array<any> = l['Simbolos'];
    symbolsList.forEach(element => {
      if (element.IdSimbolo == this.outElement) {
        // console.log("OPCION DE SALIDA: "+this.optionOutElement+ "  ENTRADA:"+this.inElement);
        if (this.optionOutElement != null) {
          let nSucesor: string = element.NodoSucesor;
          // console.log("NSUCESOR:"+nSucesor);
          if (this.optionOutElement == "YES") {
            if (nSucesor == null) {
              element.NodoSucesor = "null," + this.inElement;
            } else {
              nSucesor = nSucesor.replace(",null", "," + this.inElement);
              element.NodoSucesor = nSucesor;
            }
          } else {//NO
            if (nSucesor == null) {
              element.NodoSucesor = this.inElement + ",null";
            } else {
              nSucesor = nSucesor.replace("null,", this.inElement + ",");
              element.NodoSucesor = nSucesor;
              // console.log(" reemplazo NSUCESOR:"+nSucesor);
            }
          }
        } else { // si es un control diferente al de decision
          element.NodoSucesor = this.inElement;
        }
      }
    });
    l['Simbolos'] = symbolsList;
    sessionStorage.setItem('workFlow', JSON.stringify(l));
  }

  occupiedOut(IdS: string, option: string) {
    // console.log(IdS + " ----------------------");
    let r: boolean = true;
    let l = JSON.parse(sessionStorage.getItem('workFlow'));
    let symbolsList: Array<any> = l['Simbolos'];
    symbolsList.forEach(element => {
      if (element.IdSimbolo == IdS && option != null) {
        let nSucesor: string = element.NodoSucesor;
        if (option == "NO") {
          if (nSucesor == null || nSucesor.indexOf("null,") != -1) {
            r = false;
            // console.log("SALIDA LIBRE " + option);
          }
        } else {
          if (nSucesor == null || nSucesor.indexOf(",null") != -1) {
            r = false;
            // console.log("SALIDA LIBRE " + option);
          }
        }
      } else {
        if (element.IdSimbolo == IdS && element.NodoSucesor == null) {
          r = false;
        }
      }
    });

    return r;
  }
  occupiedIn(IdS: string) {
    // console.log(IdS + " ----------------------");
    let r: boolean = false;
    let l = JSON.parse(sessionStorage.getItem('workFlow'));
    let symbolsList: Array<any> = l['Simbolos'];
    let nSucesor: string = null;
    symbolsList.forEach(element => {
      nSucesor = element.NodoSucesor;
      if (nSucesor != null) {
        if (nSucesor.indexOf(IdS) != -1) {
          console.log(" entrada ocupada....");
          r = true;
        }
      }
    });
    return r;
  }

  crossReference(idIn: string) {
    let r: boolean = false;
    let l = JSON.parse(sessionStorage.getItem('workFlow'));
    let symbolsList: Array<any> = l['Simbolos'];
    let nSucesor: string = null;
    let fatherNode: string = this.outElement;
    let fatherExist: boolean = true;
    while (fatherExist) {
      // console.log(" -- PADRE EXISTE:"+fatherExist);
      fatherExist = false;
      symbolsList.forEach(element => {
        nSucesor = element.NodoSucesor;
        if (nSucesor != null) {
          if (nSucesor.indexOf(fatherNode) != -1) {
            fatherExist = true;
            fatherNode = element.IdSimbolo;
            // console.log("PADRE: "+ element.Nombre);
            if (fatherNode == idIn) {
              console.log("Referencia Cruzada")
              r = true;
            }
          }
        }
      });
    }

    return r;
  }

  saveWorkflow(data: any): Observable<any> {
    return this.http.post<any>(workFlowAddUrl, data, this.loginService.getHttpOptions()).pipe(

    );
  }

  getWorkflowList() {
    return this.http.get(fixedWorkFlowListUrl, this.loginService.getHttpOptions());
  }

  removeSymbol() {
    let l = JSON.parse(sessionStorage.getItem('workFlow'));
    let symbolsList: Array<any> = l['Simbolos'];
    symbolsList = symbolsList.filter(elm => elm.IdSimbolo != this.symbolSelected);
    symbolsList.forEach(element => {
      if (element.IdTipoSimbolo != 5) {
        if (element.NodoSucesor != null) {
          if (element.NodoSucesor == this.symbolSelected) {
            element.NodoSucesor = null;
          } else {
            if (element.NodoSucesor.indexOf(this.symbolSelected) != -1) {
              element.NodoSucesor = element.NodoSucesor.replace(this.symbolSelected, "null");
            }
          }
        }
      }
    });
    l['Simbolos'] = symbolsList;
    sessionStorage.setItem('workFlow', JSON.stringify(l));
  }

  showconnectingLine(in_:string,out_:string){
    let r: boolean = false;
    let inExist: boolean = false;
    let outExist: boolean = false;
    let l = JSON.parse(sessionStorage.getItem('workFlow'));
    let symbolsList: Array<any> = l['Simbolos'];
    symbolsList.forEach(element => {
      if(element.IdSimbolo==in_){
        inExist=true;
      }
      if(element.IdSimbolo==out_){
        outExist=true;
      }
    });
    if(inExist && outExist){
      r=true;
    }
    return r;
  }

  showSymbol(id_:string){
    let r: boolean = false;
    let l = JSON.parse(sessionStorage.getItem('workFlow'));
    let symbolsList: Array<any> = l['Simbolos'];
    symbolsList.forEach(element => {
      if(element.IdSimbolo==id_){
       r=true;
      }
    });
    return r;
  }

  getSymbolsWorkFlow(){
    let l = JSON.parse(sessionStorage.getItem('workFlow'));
    let symbolsList: Array<any> = l['Simbolos'];
    return symbolsList;
  }

  isRemovable(){
    let r: boolean = false;
    let l = JSON.parse(sessionStorage.getItem('workFlow'));
    let symbolsList: Array<any> = l['Simbolos'];
    symbolsList.forEach(element => {
      if(element.IdSimbolo==this.symbolSelected && element.IdTipoSimbolo!=4 && element.IdTipoSimbolo!=5){
       r=true;
      }
    });
    return r;
  }

}
