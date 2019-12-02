import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataServiceService } from '../data-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-text-content-button',
  templateUrl: './text-content-button.component.html',
  styleUrls: ['./text-content-button.component.scss']
})
export class TextContentButtonComponent implements OnInit {

  private readonly id: number;
  private url: string;

  constructor(
    private dataServiceService: DataServiceService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) {
    // holt sich id
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    // erzeugt url zu der navigiert werden soll
    this.createUrl();
  }

  ngOnInit() {
  }

  createUrl() {
    this.url = '/text-content/' + this.id;
  }

}
