import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataServiceService } from '../data-service.service';
import {TextContentComponent} from '../text-content/text-content.component';
import { ActivatedRoute } from '@angular/router';

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
    // private textContentComponent: TextContentComponent,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) {
    // holt sich id
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    // in abhängigkeit von ID sich den Titel der Seite holen und boolean ob text vorhanden ist
    this.getTitle(this.id);
    this.hasIdText(this.id);
  }

  ngOnInit() {
  }

  // Nach initialisieren des Location Objektes kann es bspw. für einen back Button genutzt werden
  goBack(): void {
    // hier nicht zurück, sondern zu QR-Code scanner
    this.location.back();
  }

  hasIdText(id: number) {
    this.dataServiceService.getTextContent(id)
      .subscribe(text => {
        this.hasText = text.hasText;
      });
  }

  getTitle(id: number) {
    this.dataServiceService.getTextContent(id)
      .subscribe(text => {
        this.title = text.title;
      });
  }
}
