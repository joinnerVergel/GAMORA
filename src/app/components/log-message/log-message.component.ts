import { Component, OnInit } from '@angular/core';
import { LogManagedService } from 'src/app/services/log-managed.service';

@Component({
  selector: 'app-log-message',
  templateUrl: './log-message.component.html',
  styleUrls: ['./log-message.component.css']
})
export class LogMessageComponent implements OnInit {

  constructor( public logService:LogManagedService) { }

  ngOnInit() {
  }

}
