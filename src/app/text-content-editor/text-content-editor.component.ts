import { Component, OnInit } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { QrCodeInfoService } from '../qr-code-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text-content-editor',
  templateUrl: './text-content-editor.component.html',
  styleUrls: ['./text-content-editor.component.scss']
})
export class TextContentEditorComponent implements OnInit {

  private hasText: boolean;
  private title: string;
  private content: string;

  constructor(
    private qrCodeInfoService: QrCodeInfoService,
    private router: Router
  ) {
    if(localStorage.getItem('isEditor') === 'false') {
      this.router.navigate(['/start']);
    }
    qrCodeInfoService.qrCodeData.subscribe(
      qrCodeData => {
        this.title = qrCodeData.title;
        this.content = qrCodeData.contentText;
        console.log(qrCodeData);
    });
  }

  ngOnInit() {
  }

}
