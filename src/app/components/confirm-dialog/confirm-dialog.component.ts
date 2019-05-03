import { Component, OnInit,Input, Output,EventEmitter,Renderer2, ViewChild} from '@angular/core';
import {  NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() description :string;
  @Input() question :string;
  @Output() result:EventEmitter<boolean>=new EventEmitter<boolean>();
  
  

  constructor(public activeModal: NgbActiveModal, public modal: NgbModal) {}

  ngOnInit() {
  }

  cancel():void{
    this.activeModal.close();
    this.result.emit(false);
  }
  confirm():void{
    this.activeModal.close();
    this.result.emit(true);
  }

}
