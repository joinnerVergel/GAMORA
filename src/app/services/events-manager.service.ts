import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { LogManagedService } from './log-managed.service';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { PeticionCategoriaNueva } from '../models/request/addCategoryModel';
import { tagsListScriptUrl, contactsOptionsUrl,templatesOptionsUrl, templateEmailUrl, mf_CategoriesListUrl, mf_CategoryAddUrl, mf_categoryByIdUrl, mf_subCategoryAddUrl, mf_subCategoriesListUrl, mf_subCategoryByIdUrl, mf_subCategoryElementsListUrl, mf_subCategoryElementAddUrl, mf_subCategoryElementFieldsRequiredUrl, mf_elementSubcategoryStateUrl, mf_elementSubcategoryDeleteUrl } from './url';
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

  getCategoriesList(operacion:number) {
    return this.http.get(mf_CategoriesListUrl+operacion, this.loginService.getHttpOptions());
  }
  getCategoryById(idCategory: number) {
    // console.log(categoryByIdUrl + idCategory);
    return this.http.get(mf_categoryByIdUrl + idCategory, this.loginService.getHttpOptions());
  }



  addCategory(data: any): Observable<any> {
    return this.http.post<any>(mf_CategoryAddUrl, data, this.loginService.getHttpOptions()).pipe(

    );
  }

  getSubCategoriesList(idCategory: number) {
    // console.log(subCategoriesListUrl + idCategory);
    return this.http.get(mf_subCategoriesListUrl + idCategory, this.loginService.getHttpOptions());
  }

  getSubCategoryById(idSubCategory: number) {
    return this.http.get(mf_subCategoryByIdUrl + idSubCategory, this.loginService.getHttpOptions());
  }
  addSubCategory(data: any): Observable<any> {
    return this.http.post<any>(mf_subCategoryAddUrl, data, this.loginService.getHttpOptions()).pipe(

    );
  }

  getSubCategoryElementsList(idSubCategory: number) {
    // console.log(subCategoryElementsListUrl + idSubCategory);
    return this.http.get(mf_subCategoryElementsListUrl + idSubCategory, this.loginService.getHttpOptions());
  }

  // getSubCategoryElementById(idSubCategoryElement: number) {
  //   return this.http.get(mf_subCategoryElementByIdUrl + idSubCategoryElement, this.loginService.getHttpOptions());
  // }
  addSubCategoryElement(data: any): Observable<any> {
    return this.http.post<any>(mf_subCategoryElementAddUrl, data, this.loginService.getHttpOptions()).pipe(

    );
  }

  //PAra el adjunto
  adddSubCategoryElement(data: FormData): Observable<FormData> {
    return this.http.post<FormData>(mf_subCategoryElementAddUrl, data, this.loginService.getHttpOptionsFormData()).pipe(

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

  getTemplatesOptionsList() {
    return this.http.get(templatesOptionsUrl, this.loginService.getHttpOptions());
  }

  getTemplateSelected(x: number) {
    return this.http.get(templateEmailUrl+x, this.loginService.getHttpOptions());
  }
  

  getElementFieldsRequired(category:number) {
      return this.http.get(mf_subCategoryElementFieldsRequiredUrl + category, this.loginService.getHttpOptions());
  }

  changeElementState(idElementSubcategory:number) {
    return this.http.put(mf_elementSubcategoryStateUrl+idElementSubcategory, null,this.loginService.getHttpOptions());
  }

  deleteElement(idElementSubcategory:number) {
    return this.http.delete(mf_elementSubcategoryDeleteUrl+idElementSubcategory,this.loginService.getHttpOptions());
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
