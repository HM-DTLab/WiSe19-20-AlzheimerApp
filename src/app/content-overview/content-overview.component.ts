import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {DataServiceService} from '../data-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-content-overview',
  templateUrl: './content-overview.component.html',
  styleUrls: ['./content-overview.component.scss']
})
export class ContentOverviewComponent implements OnInit {

  // boolean ob angezeigt werden soll, dass Seite noch geladen wird
  private title: string;
  private id: number;
  private hasText: boolean;

  // Jede Komponente die die Location, also die aktuelle Position Nutzen möchte muss folgendes importieren:
  // import { Location } from '@angular/common';
  // zusätzlich muss im Konstruktor das location Objekt initialisiert werden.
  constructor(
    private dataServiceService: DataServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.loadDataFromDataBase();
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
   * Wechselt zur Startseite, auf der die Qr-Codes gescannt werden.
   */
  backToQrCodeScan() {
    this.router.navigate(['/start']);
  }

  /**
   * Läd ID, Titel und ob bereits ein Textbeitrag ertellt wurde von dem Dataservice.
   * ToDo später aus der Datenbank
   */
  loadDataFromDataBase() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.dataServiceService.getTextContent(this.id)
      .subscribe(text => {
        this.title = text.title;
        this.hasText = text.hasText;
      });
  }
}
