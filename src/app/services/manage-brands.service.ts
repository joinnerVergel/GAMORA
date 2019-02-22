import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { PeticionMarcaNueva } from '../models/addbrandModel';
import { LogManagedService } from './log-managed.service';
import { mf_BrandsListUrl, mf_BrandsFileListUrl, mf_BrandsAddUrl, mf_BrandsDeleteUrl} from './url';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class ManageBrandsService {

  constructor(private http: HttpClient, private logService :LogManagedService,private loginService: LoginService) { }

  getBrandsList(operation:number) {
    return this.http.get(mf_BrandsListUrl+operation,this.loginService.getHttpOptions());
  }
  getBrandsFileList(operation:number) {
    return this.http.get(mf_BrandsFileListUrl+operation,this.loginService.getHttpOptions());
  }
  addBrand (data: PeticionMarcaNueva):Observable<PeticionMarcaNueva> {
    let PeticionMarcaNueva:PeticionMarcaNueva=data;
    return this.http.post<PeticionMarcaNueva>(mf_BrandsAddUrl, PeticionMarcaNueva, this.loginService.getHttpOptions()).pipe(
      
    );
  }
  deleteBrand(idBrand: string, operation:number) {
    return this.http.delete(mf_BrandsDeleteUrl+idBrand+'/'+operation,this.loginService.getHttpOptions());
  }




}
