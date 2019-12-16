import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { QrCodeData } from './qr-code-data';

@Injectable({
  providedIn: 'root'
})
export class QrCodeInfoService {
  private qrcodeDataSource = new BehaviorSubject<QrCodeData>(new QrCodeData());
  qrCodeData = this.qrcodeDataSource.asObservable();
  
  /**
   * Wird nach HTTP-Anfrage aufgerufen, versorgt ContentOverview und TextContent mit QR-Code-Details
   * @param qrcodeData New qr code data
   */
  updateQrCodeData(qrcodeData: QrCodeData) {
    this.qrcodeDataSource.next(qrcodeData);
  }

}
