import { Component, OnInit,Input, Output,EventEmitter,Renderer2, ViewChild} from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() description :string;
  @Input() question :string;
  @Output() result:EventEmitter<boolean>=new EventEmitter<boolean>();
  
  

  constructor() {}

  ngOnInit() {
  }

  cancel():void{
    this.result.emit(false);
  }
  confirm():void{
    this.result.emit(true);
  }

}
