import { Injectable, Optional } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QrCodeData } from './qr-code-data';
import { QrCodeInfoService } from './qr-code-info.service';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private apiUrl = 'https://plxmvji4k4.execute-api.eu-central-1.amazonaws.com/api';
  isGetting = false;

  constructor(
    private http: HttpClient,
    private qrCodeInfoService: QrCodeInfoService
  ) {}
  /**
   * Holt sich anhand der ID die entsprechenden QR-Code-Daten aus AWS
   * @param id ID des QR-Codes
   */
  getQrCodeInformation(id: number): Observable<QrCodeData> {
    this.isGetting = true;
    console.log('Loading...');
    
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Id-token'));
    const url = this.apiUrl.concat('?id=').concat(id.toString());
    const response = this.http.get<QrCodeData>(url, {headers});
    response.subscribe(
      _ => this.isGetting = false, // Remove loading animation as soon as observable returns value
      _ => this.isGetting = false  // Do the same on error
    );
    return response;
  }

  /**
   * Speichert Daten in DynamoDB
   * Falls id noch nicht in DB hinterlegt ist wird ein neuer Eintrag erstellt, ansonsten wird der bestehende upgedated
   * @param id ID des Qr-code
   * @param email E-Mail Adresse des Users
   * @param title Neuer Titel
   * @param content Neuer Textinformationen
   * @param hasText Ob ein Text zum Qr-code vorhanden ist
   */
  putQrCodeInformation(id: number, title: string, content: string): Observable<Object> {
    if (content.length < 1) {
      content = ' ';
    }
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Id-token'))
      .set('Content-Type', 'application/json');

    const body = {
        id,
        title,
        contentText: content,
      };
    console.log('Put-Request Body: ' + JSON.stringify(body));
    return this.http.put(this.apiUrl, JSON.stringify(body), {headers});
  }

   /**
   * Stellt eine Anfrage was die nächste freie ID für einen Benutzer ist.
   */
  getNextFreeId(): Observable<Object> {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Id-token'))
      .set('Content-Type', 'application/json');
    return this.http.get(`${ this.apiUrl }/free-id`, {headers});
  }
}
