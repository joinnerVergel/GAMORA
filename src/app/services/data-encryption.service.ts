import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

import { LoginService } from './login.service';



@Injectable({
  providedIn: 'root'
})
export class DataEncryptionService {

  constructor(private loginService: LoginService) { }

  encryptionWord(wordClear: string) {//método para cifrar una cadena con AES
    const key = CryptoJS.enc.Utf8.parse('T8tGP6UYhWfBSPxS');//llave de cifrado, debe ser de 16 caracteres
    const iv = CryptoJS.enc.Utf8.parse('T8tGP6UYhWfBSPxS');
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(wordClear), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
   
  //   console.log('Encrypted :' + encrypted);
  //   console.log('Key :' + encrypted.key);
  //   console.log('Salt :' + encrypted.salt);
  //   console.log('iv :' + encrypted.iv);
  //   console.log('Decrypted : ' + decrypted);
  //   console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));
  //  console.log(wordClear);
   return encrypted.toString();
 }

 decryptionWord(wordClear: string) {//método para cifrar una cadena con AES
  const key = CryptoJS.enc.Utf8.parse('T8tGP6UYhWfBSPxS');//llave de cifrado, debe ser de 16 caracteres
  const iv = CryptoJS.enc.Utf8.parse('T8tGP6UYhWfBSPxS');
 
  const decrypted = CryptoJS.AES.decrypt(wordClear, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  });

  //  console.log('Decrypted : ' + decrypted);
  // console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));
  // console.log(wordClear);
  return decrypted.toString(CryptoJS.enc.Utf8);
}


}
