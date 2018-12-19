import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { LogManagedService } from './log-managed.service';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { PeticionCategoriaNueva } from '../models/request/addCategoryModel';
import { CategoriesListUrl, CategoryAddUrl, subCategoriesListUrl, subCategoryAddUrl, categoryByIdUrl, subCategoryByIdUrl, subCategoryElementsListUrl, subCategoryElementByIdUrl, subCategoryElementAddUrl, tagsListScriptUrl, contactsOptionsUrl, subCategoryElementFieldsRequiredUrl } from './url';
import { PeticionSubCategoriaNueva } from '../models/request/addSubCategoryModel';
import { PeticionElementoSubCategoriaNuevo } from '../models/request/addSubCategoryElementModel';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class EventsManagerService {

  public linkQuantity: number = 0;
  public scriptQuantity: number = 0;

  constructor(private http: HttpClient, private logService: LogManagedService, private loginService: LoginService) { }

  getCategoriesList() {
    return this.http.get(CategoriesListUrl, this.loginService.getHttpOptions());
  }
  getCategoryById(idCategory: number) {
    // console.log(categoryByIdUrl + idCategory);
    return this.http.get(categoryByIdUrl + idCategory, this.loginService.getHttpOptions());
  }



  addCategory(data: PeticionCategoriaNueva): Observable<PeticionCategoriaNueva> {
    return this.http.post<PeticionCategoriaNueva>(CategoryAddUrl, data, this.loginService.getHttpOptions()).pipe(

    );
  }

  getSubCategoriesList(idCategory: number) {
    // console.log(subCategoriesListUrl + idCategory);
    return this.http.get(subCategoriesListUrl + idCategory, this.loginService.getHttpOptions());
  }

  getSubCategoryById(idSubCategory: number) {
    return this.http.get(subCategoryByIdUrl + idSubCategory, this.loginService.getHttpOptions());
  }
  addSubCategory(data: PeticionSubCategoriaNueva): Observable<PeticionSubCategoriaNueva> {
    return this.http.post<PeticionSubCategoriaNueva>(subCategoryAddUrl, data, this.loginService.getHttpOptions()).pipe(

    );
  }

  getSubCategoryElementsList(idSubCategory: number) {
    // console.log(subCategoryElementsListUrl + idSubCategory);
    return this.http.get(subCategoryElementsListUrl + idSubCategory, this.loginService.getHttpOptions());
  }

  getSubCategoryElementById(idSubCategoryElement: number) {
    return this.http.get(subCategoryElementByIdUrl + idSubCategoryElement, this.loginService.getHttpOptions());
  }
  addSubCategoryElement(data: PeticionElementoSubCategoriaNuevo): Observable<PeticionElementoSubCategoriaNuevo> {
    return this.http.post<PeticionElementoSubCategoriaNuevo>(subCategoryElementAddUrl, data, this.loginService.getHttpOptions()).pipe(

    );
  }


  adddSubCategoryElement(data: FormData): Observable<FormData> {
    return this.http.post<FormData>(subCategoryElementAddUrl, data, this.loginService.getHttpOptionsFormData()).pipe(

    );
  }

  getTagsListScript(type: string) {
    if (type == "fixed") {
      return this.http.get(tagsListScriptUrl + "1", this.loginService.getHttpOptions());
    }
    return this.http.get(tagsListScriptUrl + "2", this.loginService.getHttpOptions());
  }

  getBackFormatScript(scriptText: string, tagsList: Array<string>) {
    let valueReturn: string = scriptText;
    tagsList.forEach(element => {
      let x: string = '@' + element;
      if (scriptText.indexOf(x) != -1) {
        var regularExpression = new RegExp(x, "g");
        valueReturn = valueReturn.replace(regularExpression, '**' + element + '**');
      }
      return valueReturn;
    });
  }


  getContactOptionsList() {
    return this.http.get(contactsOptionsUrl, this.loginService.getHttpOptions());
  }
  

  getElementFieldsRequired(category:number) {
      return this.http.get(subCategoryElementFieldsRequiredUrl + category, this.loginService.getHttpOptions());
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
