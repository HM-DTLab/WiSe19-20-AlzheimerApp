import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataServiceService } from '../data-service.service';
import { QrCodeInfoService } from '../qr-code-info.service';
import {AuthorisationService} from '../authorisation.service';
@Component({
  selector: 'app-text-content',
  templateUrl: './text-content.component.html',
  styleUrls: ['./text-content.component.scss']
})
export class TextContentComponent implements OnInit {

  // Boolean Variable, soll Wert von data-service enthalten, wird in contactDataService benutzt
  private hasText: boolean;
  private  readonly id: number = +this.activatedRoute.snapshot.paramMap.get('id');
  private content: string;
  private title: string;
  // Jede Komponente die die Location, also die aktuelle Position Nutzen möchte muss folgendes importieren:
  // import { Location } from '@angular/common';
  // zusätzlich muss im Konstruktor das location Objekt initialisiert werden.
  // Für das tracken der ID in der URL wird ein ActivatedRoute Objekt verwendet.
  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dataService: DataServiceService,
    private qrCodeInfoService: QrCodeInfoService,
    public authservice:AuthorisationService
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

  /**
   * Bei einer URL der Form localhost:4200/text-component/1 wird über diese Methode die id 1 herausgelesen und zurückgegeben
   * Über die activatedRoute wird der Parameter ausgelesen.
   * @returns id, wenn Zahl eingegeben, null sonst
   */

  // Nach initialisieren des Location Objektes kann es bspw. für einen back Button genutzt werden
  goBack():void {
    this.location.back();
  }
}
