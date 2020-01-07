import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
    private router: Router,
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

  /**
   * Navigiert zur "Content-Overview"-Seite.
   */
  goBack(): void {
    this.router.navigate(['/overview/' + this.id]);
  }
}
