import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { EventsManagerService } from 'src/app/services/events-manager.service';
import { LogManagedService } from 'src/app/services/log-managed.service';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit {
  uploader: FileUploader = new FileUploader({ url: URL });
  hasBaseDropZoneOver: boolean = false;
  hasAnotherDropZoneOver: boolean = false;


  constructor( private logService: LogManagedService, private eventsService: EventsManagerService) { }

  ngOnInit() {
    
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }


  prueba(){
    let formulario: FormData =new FormData();
    console.log(this.uploader.queue[0]._file.slice(0,this.uploader.queue[0]._file.size ));
    formulario.append('archivo',this.uploader.queue[0]._file);
    formulario.append('prueba','asdasda');
    console.log(formulario.get('prueba'));

    var suscripcion = this.eventsService.adddSubCategoryElement(formulario)
      .subscribe(
        respuesta => {
          if (respuesta["State"]) {
            this.logService.addMessage(respuesta["Msg"], "success");
          } else {
            this.logService.addMessage(respuesta["Msg"], "warning");
          }
                    // this.router.navigate(['/events-manager/fixed']);
        }
        // , error => {
        //   if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
        //     this.loginService.clearSessionLogin();
        //     this.router.navigate(['/login']);
        //   }
        // }
        );


  }


}
