import { Injectable } from '@angular/core';
import { MessageLog } from '../models/message';



@Injectable({
  providedIn: 'root'
})

export class LogManagedService {

  // ['success', 'info', 'warning', 'danger', 'primary', 'secondary', 'light', 'dark'];
  MessageList: MessageLog[] = [];

  
  constructor() { }

  removeMessage( obj :MessageLog) {
    this.MessageList=this.MessageList.filter(item=> item!=obj)
  }
  addMessage(message: string,type: string){
    let messageObject:MessageLog=new MessageLog();
    messageObject.message=message;
    messageObject.type=type;
    this.MessageList.push(messageObject);
    setTimeout(() => this.removeMessage(messageObject), 10000);
  }

}
