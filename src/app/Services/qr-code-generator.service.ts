import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeGeneratorService {

  private url : string = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150';

  constructor(private httpClient : HttpClient) { }

  createNewCode(data : string) : any {
    return Observable.create(observer => {
      this.httpClient.get<Observable<string>>(this.url + '&data=' + data,  {responseType:  'text' as 'json'} ).subscribe(result => {
        console.log("Result: ", result);
        console.log(result);
        observer.next(result);
      });
    });
   
  
  }
}
