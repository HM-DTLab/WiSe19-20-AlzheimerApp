import { Injectable, Optional } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { QrCodeData } from './qr-code-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private apiUrl = 'https://plxmvji4k4.execute-api.eu-central-1.amazonaws.com/api';
  private apiUrlPut = 'https://plxmvji4k4.execute-api.eu-central-1.amazonaws.com/api/put-qr-code-information';

  constructor(
    private http: HttpClient
  ) {}
  /**
   * Holt sich anhand der ID die entsprechenden QR-Code-Daten aus AWS
   * @param id
   */
  getQrCodeInformation(id: number): Observable<QrCodeData> {
    var headers = new HttpHeaders().set('Authorization', localStorage.getItem('Id-token'));

    const url = this.apiUrl.concat("?id=").concat(id.toString());
    return this.http.get<QrCodeData>(url,{headers: headers});
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
  putQrInfo(id: number, email: string, title: string, content: string, hasText: boolean) {
    // ToDo: Möglich machen, dass man...
    //  nur Titel speichert, oder nur Content -> Lambda anpassen?!
    if (content.length < 1) {
      content = ' ';
    }

    // Header fuer HTTP-Request
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('Id-token'))
      .set('Content-Type', 'application/json');

    // Body des Requests (Uebergebene Parameter an die api)
    const body = {
      'queryStringParameters': {
        'id': id,
        'username': 'firlus@hm.edu',
        'title': title,
        'contentText': content,
        'hasText': true
      }
    }
    console.log('Put-Request Body: ' + body);
    // Put-Request an Api
    this.http.put(this.apiUrlPut, JSON.stringify(body), {headers: headers}).subscribe(response => console.log(response));
  }
}
