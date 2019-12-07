import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { QrCodeData } from './qr-code-data';

@Injectable({
  providedIn: 'root'
})
export class QrCodeInfoService {
  private qrcodeDataSource = new BehaviorSubject<QrCodeData>(new QrCodeData());
  qrCodeData = this.qrcodeDataSource.asObservable();
  
  updateQrCodeData(qrcodeData: QrCodeData) {
    this.qrcodeDataSource.next(qrcodeData);
  }

}
