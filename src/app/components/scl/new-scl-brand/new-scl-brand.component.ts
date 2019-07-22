import { Component, OnInit, HostListener } from '@angular/core';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { Files } from 'src/app/models/files';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageBrandsService } from 'src/app/services/manage-brands.service';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { DataEncryptionService } from 'src/app/services/data-encryption.service';
import { ComponentCanDeactivate } from 'src/app/services/pending-changes-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-scl-brand',
  templateUrl: './new-scl-brand.component.html',
  styleUrls: ['./new-scl-brand.component.css']
})
export class NewSclBrandComponent implements OnInit, ComponentCanDeactivate {

  folder = faFolderOpen;
  filesDirectory: Array<Files> = Array<Files>();
  viewNewBrandsForm: boolean = true;

  newBrandForm: FormGroup;
  submitted = false;

  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private formBuilder: FormBuilder, 
    private manageBrandsService: ManageBrandsService, private logService: LogManagedService,
    private router: Router,private loginService: LoginService,private dataEncryption: DataEncryptionService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    if(!this.loginService.isLogged()){
      this.router.navigate(['/login']);
    }
    this.readBrandsFileList();
    this.newBrandForm = this.formBuilder.group({
      brandName: ['', Validators.required],
      fileOption: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.newBrandForm.controls; }

  Validation() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newBrandForm.invalid) {
      return false;
    }
    return true;
  }

  open(content) {
    let validate: boolean = this.Validation();
    if (validate) {
      this.modalService.open(content);
    }
  }

  onSubmit() {
    this.modalService.dismissAll();
    this.viewNewBrandsForm = false;
    let data: any = {};
    data.NombreMarca = this.f.brandName.value;
    data.NombreArchivo = this.f.fileOption.value;
    data.UsuarioMarca = this.getNameUser();
    data.TipoOperacion=3;
    this.addBrands(data);
  }

  getNameUser(){
    let x = this.loginService.getLocalUserLogged();
    return this.dataEncryption.decryptionWord(x['key_1']);
  }
  readBrandsFileList() {
    this.manageBrandsService.getBrandsFileList(3)
      .subscribe(
        item => {
          this.filesDirectory = Array<Files>();
          if (item.hasOwnProperty('ListarArchivosMarcasResult')) {
            const elementList = item['ListarArchivosMarcasResult'];
            elementList.forEach(element => {
              let elementFile: Files = new Files();
              elementFile.file = element;
              this.filesDirectory.push(elementFile);
            });
            // console.log(this.filesDirectory);
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401){             
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });

    
  }

  addBrands(data: any) {
    var suscripcion = this.manageBrandsService.addBrand(data)
      .subscribe(
        respuesta => {
          if(respuesta["State"]){
            this.logService.addMessage(respuesta["Msg"],"success");
          }else{
            this.logService.addMessage(respuesta["Msg"],"warning");
          }
          // this.modalService.dismissAll();
          this.router.navigate(['/manage-brands/scl']);
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401){             
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        });
  }

  action(x: boolean) {
    if (x) {
      this.onSubmit();
    } else {
      this.modalService.dismissAll();
    }
  }

  generalKeyPressEvent(key: string, limit: number, control: FormControl, validateStrangeCharacters: boolean) {

    if (key == "Enter") {
      return false;
    }
    if (control.value != null) {
      if (control.value.length > limit) {
        return false;
      }
    }
    if (validateStrangeCharacters) {
      let strangeCharacters: string = "|!#$%&/()=?¡¿'*+[]{}^-_:;,.´¨~`°¬<>\\\"@";
      if (strangeCharacters.indexOf(key) != -1) {
        console.log("Caracter Invalido " + key);
        return false;
      }
    }
    return true;
  }


  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    this.loginService.keepSession();
    return true;
  }
}
