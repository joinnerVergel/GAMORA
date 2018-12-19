import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { PeticionMarcaNueva } from '../models/addbrandModel';
import { LogManagedService } from './log-managed.service';
import { fixedBrandsListUrl, BrandsFileListUrl, BrandsAddUrl, BrandsDeleteUrl} from './url';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class ManageBrandsService {

  constructor(private http: HttpClient, private logService :LogManagedService,private loginService: LoginService) { }

  getBrandsList() {
    return this.http.get(fixedBrandsListUrl,this.loginService.getHttpOptions());
  }
  getBrandsFileList() {
    return this.http.get(BrandsFileListUrl,this.loginService.getHttpOptions());
  }
  addBrand (data: PeticionMarcaNueva):Observable<PeticionMarcaNueva> {
    let PeticionMarcaNueva:PeticionMarcaNueva=data;
    return this.http.post<PeticionMarcaNueva>(BrandsAddUrl, PeticionMarcaNueva, this.loginService.getHttpOptions()).pipe(
      
    );
  }
  deleteBrand(idBrand: string) {
    return this.http.delete(BrandsDeleteUrl+idBrand,this.loginService.getHttpOptions());
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // console.error('An error occurred:', error.error.message);
      this.logService.addMessage("Ha ocurrido un error al intentar comunicarse con el servidor", "danger");
    } else {
      this.logService.addMessage("La comunicacion con el servidor ha devuelto un error", "danger");
    }
    // return an observable with a user-facing error message
    return throwError(
      'Lo sentimos... algo ha salido mal; por favor intente mas tarde.');
  };


}
