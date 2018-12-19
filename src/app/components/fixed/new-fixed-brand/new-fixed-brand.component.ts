import { Component, OnInit } from '@angular/core';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageBrandsService } from 'src/app/services/manage-brands.service';
import { Files } from 'src/app/models/files';
import { PeticionMarcaNueva } from 'src/app/models/addbrandModel';
import { LogManagedService } from 'src/app/services/log-managed.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { DataEncryptionService } from 'src/app/services/data-encryption.service';


@Component({
  selector: 'app-new-fixed-brand',
  templateUrl: './new-fixed-brand.component.html',
  styleUrls: ['./new-fixed-brand.component.css']
})
export class NewFixedBrandComponent implements OnInit {

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
    this.viewNewBrandsForm = false;
    // let dataa='{"NombreMarca":"xxx","NombreArchivo":"XXX.txt","UsuarioMarca":"SYSTEM"}';
    // const data={
    //   "NombreMarca" : this.f.brandName.value,
    //   "NombreArchivo" : this.f.fileOption.value,
    //   "UsuarioMarca" : "SYSTEM"
    // } 
    let data: PeticionMarcaNueva = new PeticionMarcaNueva();
    data.NombreMarca = this.f.brandName.value;
    data.NombreArchivo = this.f.fileOption.value;
    data.UsuarioMarca = this.getNameUser();
    data.TipoOperacion=1;

    // const myObj = JSON.stringify(data);
    // console.log(myObj);
    this.addBrands(data);
  }

  getNameUser(){
    let x = this.loginService.getLocalUserLogged();
    return this.dataEncryption.decryptionWord(x['key_1']);
  }
  readBrandsFileList() {
    this.manageBrandsService.getBrandsFileList()
      .subscribe(
        item => {
          this.filesDirectory = Array<Files>();
          if (item.hasOwnProperty('listaGenericaResult')) {
            const elementList = item['listaGenericaResult'];
            elementList.forEach(element => {
              let elementFile: Files = new Files();
              elementFile.id = element['Id'];
              elementFile.file = element['Valor'];
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

  addBrands(data: PeticionMarcaNueva) {
    var suscripcion = this.manageBrandsService.addBrand(data)
      .subscribe(
        respuesta => {
          if(respuesta["State"]){
            this.logService.addMessage(respuesta["Msg"],"success");
          }else{
            this.logService.addMessage(respuesta["Msg"],"warning");
          }
          this.modalService.dismissAll();
          this.router.navigate(['/manage-brands/fixed']);
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
}
