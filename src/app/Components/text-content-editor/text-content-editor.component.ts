import { Component, OnInit } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { QrCodeInfoService } from '../../Services/qr-code-info.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataServiceService } from '../../Services/data-service.service';


@Component({
  selector: 'app-text-content-editor',
  templateUrl: './text-content-editor.component.html',
  styleUrls: ['./text-content-editor.component.scss']
})
export class TextContentEditorComponent implements OnInit {

  private quillToolbarConfig: Object = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }]
    ]
  };

  private hasText: boolean;
  private title: string;
  private content: string;
  private id: number;

  constructor(
    private qrCodeInfoService: QrCodeInfoService,
    private router: Router,
    private location: Location,
    private dataService: DataServiceService,
    private activatedRoute: ActivatedRoute
  ) {
    if(localStorage.getItem('isEditor') === 'false') {
      this.router.navigate(['/start']);
    }
    qrCodeInfoService.qrCodeData.subscribe(
      qrCodeData => {
        this.title = qrCodeData.title;
        this.content = qrCodeData.contentText;
    });
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.dataService.putQrCodeInformation(this.id, this.title, this.content).subscribe(_ =>
      this.goBack()
    );
  }
}
