import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-calendar-options',
  templateUrl: './calendar-options.component.html',
  styleUrls: ['./calendar-options.component.css']
})
export class CalendarOptionsComponent implements OnInit {


  newCalendarForm: FormGroup;
  @Input() calendar: any;
  @Input() submitted: boolean = false;
  @Output() validateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() dataCalendarChange: EventEmitter<any> = new EventEmitter<any>();
  // isSelected:boolean=false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newCalendarForm = this.formBuilder.group({
      calendarName: [false, Validators.required],
      calendarFrom: [8, Validators.required],
      calendarUntil: [18, Validators.required]      
    });
    if(this.calendar.id==1){
      this.f.calendarName.setValue(true);
      this.dataChange();
    }
    this.Validation();
  }

  changeCheck(x:boolean){
    // this.isSelected=x;
    this.dataChange();
  }

   // convenience getter for easy access to form fields
   get f() { return this.newCalendarForm.controls; }

   Validation() {
       // stop here if form is invalid
     if (this.newCalendarForm.invalid) {
       if(this.f.calendarName.value){
        this.validateChange.emit(false);
       }else{
        this.validateChange.emit(true);
       }
       
     }else{
      this.validateChange.emit(true);
     }
     
   }

   dataChange(){
    let x:any={checked:this.f.calendarName.value,calendar:this.calendar.id,from:this.f.calendarFrom.value,until:this.f.calendarUntil.value};
    this.dataCalendarChange.emit(x);
    this.Validation();
   }

  

}
