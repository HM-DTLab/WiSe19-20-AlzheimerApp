import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Kümmert sich um die Generierung neuer QR Codes
 */
export class QrCodeGeneratorService {

  private url : string = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150';

  constructor(private httpClient : HttpClient) { }

  /**
   * Stellt anfagen an qrserver und gibt den dort generierten QR Code als Blob zurück
   * @param data Daten die in QR Code geschrieben werden
   */
  createNewCode(data : string) : Observable<Blob> {
    return Observable.create(observer => {
      this.httpClient.get<Observable<string>>(this.url + '&data=' + data,  {responseType:  'blob' as 'json'} ).subscribe(result => {
        observer.next(result);
        observer.complete();
      }, (err) => {
        observer.error(err);
        observer.complete();
      });
    });
  }
}
