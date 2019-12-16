import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataServiceService } from '../data-service.service';
import {TextContentComponent} from '../text-content/text-content.component';
import {ActivatedRoute, Router} from '@angular/router';
import { QrCodeInfoService } from '../qr-code-info.service';
import {AuthorisationService} from '../authorisation.service';


@Component({
  selector: 'app-content-overview',
  templateUrl: './content-overview.component.html',
  styleUrls: ['./content-overview.component.scss']
})
export class ContentOverviewComponent implements OnInit {

  // boolean ob angezeigt werden soll, dass Seite noch geladen wird
  private title: string;
  private error: boolean;
  private id: number;
  private hasText: boolean;
  private contentText: string;

  // Jede Komponente die die Location, also die aktuelle Position Nutzen möchte muss folgendes importieren:
  // import { Location } from '@angular/common';
  // zusätzlich muss im Konstruktor das location Objekt initialisiert werden.
  constructor(
    private dataServiceService: DataServiceService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private qrCodeInfoService: QrCodeInfoService,
    public authservice:AuthorisationService
  ) {
    // holt sich id
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    qrCodeInfoService.qrCodeData.subscribe(
      qrCodeData => {
        this.title = qrCodeData.title;
        this.hasText = qrCodeData.hasTextContent;
    });
    // in abhängigkeit von ID sich den Titel der Seite holen und boolean ob text vorhanden ist
    this.getQrCodeInformation(this.id);
  }

  /**
   * Prüft ob Titel geladen wurde.
   * Noch nicht geladen => Loader anzeigen
   * Geladen => Content der seite anzeigen
   */
  isLoadingFromDatabase(): boolean {
    // prüfen ob title noch leer
    return this.title ? false : true;
  }

  ngOnInit() {
  }

  /**
   * Navigiert zur Text-Content Übersicht des QR-Codes
   */
  goToTextContent(): void {
    this.router.navigate(['/text-content/' + this.id]);
  }

  // Nach initialisieren des Location Objektes kann es bspw. für einen back Button genutzt werden
  goBack(): void {
    // hier nicht zurück, sondern zu QR-Code scanner
    this.location.back();
  }

  getQrCodeInformation(id: number) {
    this.dataServiceService.getQrCodeInformation(id)
      .subscribe(qrCodeData => {
        this.error = false;
        this.qrCodeInfoService.updateQrCodeData(qrCodeData);
      }, error => {
        this.error = true;
      });
  }
  logout(){
    this.authservice.logout();
  }
}
