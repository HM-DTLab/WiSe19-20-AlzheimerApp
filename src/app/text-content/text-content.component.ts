import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-text-content',
  templateUrl: './text-content.component.html',
  styleUrls: ['./text-content.component.scss']
})
export class TextContentComponent implements OnInit {

  // Jede Komponente die die Location, also die aktuelle Position Nutzen möchte muss folgendes importieren:
  // import { Location } from '@angular/common';
  // zusätzlich muss im Konstruktor das location Objekt initialisiert werden.
  // Für das tracken der ID in der URL wird ein ActivatedRoute Objekt verwendet.
  constructor(
    private activatedRoute : ActivatedRoute,
    private location : Location
  ) { }

  ngOnInit() {
  }

  /**
   * Bei einer URL der Form localhost:4200/text-component/1 wird über diese Methode die id 1 herausgelesen und zurückgegeben
   * Über die activatedRoute wird der Parameter ausgelesen.
   * @returns id, wenn Zahl eingegeben, null sonst
   */
  getId() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    return  Number.isNaN(id)? null : id;
  }

  // Nach initialisieren des Location Objektes kann es bspw. für einen back Button genutzt werden 
  goBack():void {
    this.location.back();
  }

}
