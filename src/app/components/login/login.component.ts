import { Component, OnInit } from '@angular/core';
import { faUser, faUnlock, faLock } from '@fortawesome/free-solid-svg-icons';
import { DataEncryptionService } from 'src/app/services/data-encryption.service';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/request/usuario';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UserLogged } from 'src/app/models/userLogged';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userIcon = faUser;
  passwordIcon = faLock;

  loginForm: FormGroup;
  submitted = false;

  constructor(private dataEncryption: DataEncryptionService, private formBuilder: FormBuilder, private logService: LogManagedService,
    private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    if (this.loginService.isLogged() ||this.loginService.recoverSession()) {
      console.log("ESTA LOGUEADO")
      this.router.navigate(['/']);
      
    }
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  Validation() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return false;
    }
    return true;
  }

  login() {
    let validate: boolean = this.Validation();
    let ok:boolean=false;
    if (validate) {
      // console.log(this.dataEncryption.decryptionWord(this.dataEncryption.encryptionWord(this.f.userName.value)));
      // console.log(this.dataEncryption.decryptionWord(this.dataEncryption.encryptionWord(this.f.userPassword.value)));
      let user: Usuario = { Usuario: this.dataEncryption.encryptionWord(this.f.userName.value), Contrasena: this.dataEncryption.encryptionWord(this.f.userPassword.value) }
      console.log(user);
      var suscripcion = this.loginService.getUserToken(user)
        .subscribe(
          respuesta => {
            if (respuesta["State"]) {
              let userL: UserLogged = new UserLogged();
              userL.key_1 = user.Usuario;
              userL.key_2 = user.Contrasena;
              userL.key_3 = respuesta["Data"];
              userL.token = respuesta["Msg"];
              // console.log("_________________________________________________")
              // console.log(userL);
              this.loginService.setUserLogged(userL);

              // this.logService.addMessage(this.loginService.getLocalUserLogged(), "success");
              // console.log(this.loginService.getHttpOptions());
              ok=true;
              

            } else {
              this.logService.addMessage(respuesta["Msg"], "warning");
            }
          }
          , error => {
            console.log("Error", error);
          },
          () =>{
            if(ok){
              this.router.navigate(['/']);
            }
          }
        );
    }
  }


  keyPress_(x: string) {
    if (x == 'Enter') {
      this.login();
    }
  }
}
