import { Component, OnInit, HostListener } from '@angular/core';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { Files } from 'src/app/models/files';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageBrandsService } from 'src/app/services/manage-brands.service';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { DataEncryptionService } from 'src/app/services/data-encryption.service';
import { PeticionMarcaNueva } from 'src/app/models/addbrandModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-mobile-brand',
  templateUrl: './update-mobile-brand.component.html',
  styleUrls: ['./update-mobile-brand.component.css']
})
export class UpdateMobileBrandComponent implements OnInit {

  folder = faFolderOpen;
  filesDirectory: Array<Files> = Array<Files>();
  viewNewBrandsForm: boolean = true;
  brandName:string=null;
  newBrandForm: FormGroup;
  submitted = false;
  brand_:any=null;

  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private formBuilder: FormBuilder, 
    private manageBrandsService: ManageBrandsService, private logService: LogManagedService,
    private router: Router,private loginService: LoginService,private dataEncryption: DataEncryptionService
    ,private route: ActivatedRoute) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    if(!this.loginService.isLogged()){
      this.router.navigate(['/login']);
    }
    this.getBrandName();
    this.readBrandsFileList();
    this.newBrandForm = this.formBuilder.group({
      fileOption: ['', Validators.required],
    });
  }
  getBrandName() {
    this.brand_ = this.route.params.subscribe(params => {
      this.brandName = params['name'];
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
    let data: PeticionMarcaNueva = new PeticionMarcaNueva();
    data.NombreMarca = this.brandName;
    data.NombreArchivo = this.f.fileOption.value;
    data.UsuarioMarca = this.getNameUser();
    data.TipoOperacion=2;
    this.updateBrand(data);
  }

  getNameUser(){
    let x = this.loginService.getLocalUserLogged();
    return this.dataEncryption.decryptionWord(x['key_1']);
  }
  readBrandsFileList() {
    this.manageBrandsService.getBrandsFileList(2)
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

  updateBrand(data: PeticionMarcaNueva) {
    var suscripcion = this.manageBrandsService.updateBrand(data)
      .subscribe(
        respuesta => {
          if(respuesta["State"]){
            this.logService.addMessage(respuesta["Msg"],"success");
          }else{
            this.logService.addMessage(respuesta["Msg"],"warning");
          }
          // this.modalService.dismissAll();
          this.router.navigate(['/manage-brands/mobile']);
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
