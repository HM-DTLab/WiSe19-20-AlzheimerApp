import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-content-overview',
  templateUrl: './content-overview.component.html',
  styleUrls: ['./content-overview.component.scss']
})
export class ContentOverviewComponent implements OnInit {

  // Jede Komponente die die Location, also die aktuelle Position Nutzen möchte muss folgendes importieren:
  // import { Location } from '@angular/common';
  // zusätzlich muss im Konstruktor das location Objekt initialisiert werden.
  constructor(
    private location : Location
  ) { }

  ngOnInit() {
  }

  // Nach initialisieren des Location Objektes kann es bspw. für einen back Button genutzt werden 
  goBack():void {
    this.location.back();
  }
}
