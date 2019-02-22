import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor() { }

  // saveFile() {
  //   const headers = new Headers();
  //   headers.append('Accept', 'text/plain');
  //   this.http.get('http://localhost:8080/api/files', { headers: headers })
  //     .toPromise()
  //     .then(response => this.saveToFileSystem(response));
  // }

  // private saveToFileSystem(response: any) {
  //   const contentDispositionHeader: string = response.headers.get('Content-Disposition');
  //   const parts: string[] = contentDispositionHeader.split(';');
  //   const filename = parts[1].split('=')[1];
  //   const blob = new Blob([response._body], { type: 'text/plain' });
  //   saveAs(blob, filename);
  // }
}
