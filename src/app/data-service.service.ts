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

  constructor(
    private http: HttpClient
  ) {}
  getQrCodeInformation(id: number): Observable<QrCodeData> {
    const url = this.apiUrl.concat("?id=").concat(id.toString());
    return this.http.get<QrCodeData>(url);
  }
}
