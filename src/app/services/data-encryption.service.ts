import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { dataEncDec } from './url';



@Injectable({
  providedIn: 'root'
})
export class DataEncryptionService {

  content:any={};
  VarCrypto=CryptoJS;
  constructor(private loginService: LoginService,private router: Router,private http: HttpClient) {
  }

  getDataEnc() {
    return this.http.get(dataEncDec+"dataEnc/qwert", this.loginService.getHttpOptions()).toPromise();
  }

  encryptionWord(wordClear: string) {
    const key = eval(atob(this.content.a));
    const iv = eval(atob(this.content.a));
    const encrypted = eval(atob(this.content.b));
    return encrypted.toString();
  }

 decryptionWord(wordClear: string) {
  const key = eval(atob(this.content.a));
  const iv = eval(atob(this.content.a));
   const decrypted = eval(atob(this.content.c));
   return decrypted.toString(CryptoJS.enc.Utf8);
  }


}
