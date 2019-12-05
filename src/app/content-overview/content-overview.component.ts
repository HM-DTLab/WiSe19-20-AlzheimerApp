import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataServiceService } from '../data-service.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-content-overview',
  templateUrl: './content-overview.component.html',
  styleUrls: ['./content-overview.component.scss']
})
export class ContentOverviewComponent implements OnInit {

  // private hasTextContent: boolean;
  private title: string;
  private id: number;
  private hasText: boolean;

  // Jede Komponente die die Location, also die aktuelle Position Nutzen möchte muss folgendes importieren:
  // import { Location } from '@angular/common';
  // zusätzlich muss im Konstruktor das location Objekt initialisiert werden.
  constructor(
    private dataServiceService: DataServiceService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    // holt sich id
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    // in abhängigkeit von ID sich den Titel der Seite holen und boolean ob text vorhanden ist
    this.loadTitleOfId(this.id);
    this.loadHasIdText(this.id);
  }

  ngOnInit() {
  }

  // Nach initialisieren des Location Objektes kann es bspw. für einen back Button genutzt werden
  goBack(): void {
    // hier nicht zurück, sondern zu QR-Code scanner
    this.location.back();
  }

  /**
   * Navigiert zur Text-Content Übersicht des QR-Codes
   */
  goToTextContent(): void {
    this.router.navigate(['/text-content/' + this.id]);
  }

  /**
   * Prüft, ob eine Textbeschreibung zu dem QR-Code verfügbar ist und speichert den Status in hasText
   * @param id Id eines QR-Codes, zudem ermittelt wird, ob Txtcontent vorhanden ist
   */
  private loadHasIdText(id: number) {
    this.dataServiceService.getTextContent(id)
      .subscribe(text => {
        this.hasText = text.hasText;
      });
  }

  /**
   * Läd den Titel eines QR-Codes und speichrt ihn in <code>title<code/>
   * @param id Id eines QR-Codes, zudem der Titel geladen wird
   */
  private loadTitleOfId(id: number) {
    this.dataServiceService.getTextContent(id)
      .subscribe(text => {
        this.title = text.title;
      });
  }
}
