import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { QrCodeInfoService } from '../../Services/qr-code-info.service';

@Component({
  selector: 'app-text-content',
  templateUrl: './text-content.component.html',
  styleUrls: ['./text-content.component.scss']
})
export class TextContentComponent implements OnInit {

  private  readonly id: number = +this.activatedRoute.snapshot.paramMap.get('id');
  public content: string;
  public title: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private qrCodeInfoService: QrCodeInfoService
  ) {
    /**
     * Holt sich QR-Code-Daten aus QrCodeInfoService
     */
    qrCodeInfoService.qrCodeData.subscribe(
      qrCodeData => {
        this.title = qrCodeData.title;
        this.content = qrCodeData.contentText;
    });
  }

  ngOnInit() {
  }

  // Nach initialisieren des Location Objektes kann es bspw. für einen back Button genutzt werden
  goBack():void {
    this.location.back();
  }
}
