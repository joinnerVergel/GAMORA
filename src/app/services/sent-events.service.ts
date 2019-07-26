import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { LogManagedService } from './log-managed.service';
import { HttpClient } from '@angular/common/http';
import { sentEventsUrl } from './url';

@Injectable({
  providedIn: 'root'
})
export class SentEventsService {

  constructor(private http: HttpClient, private logService: LogManagedService, private loginService: LoginService) { }


  readSentEvents(data:any) {
    return this.http.post<any>(sentEventsUrl, data, this.loginService.getHttpOptions()).pipe();
  }
}
