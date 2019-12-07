import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserQRCodeReader } from '@zxing/library';

@Component({
  selector: 'app-qr-code-page',
  templateUrl: './qr-code-page.component.html',
  styleUrls: ['./qr-code-page.component.scss']
})

/**
 * Komponente QRCodePageComponent kümmert sich um die Erkennung des QR Codes und linkt daraufhin zur nächsten Seite. 
 */
export class QrCodePageComponent implements OnInit {

  // Mit @ViewChild wird das DomElement mit der ID #video (siehe html) angesprochen.
  @ViewChild("video", {static: false})
  public video: any;

  // Referenz auf den Videostream
  private localstream : any;
  
  // Falls keine Erlaubnis auf Kamerazugriff gegeben wird zeigt die Seite einen Infotext.
  private permission : boolean;

  // Das Router Objekt wird nachher benötigt, wenn auf die Nachfolgende Seite mit der passenden ID gelinkt werden soll.
  constructor(private router : Router) { }

  ngOnInit() {
    this.permission = true;
  }

  /**
   * ngAfterViewInit wird erst ausgeführt wenn View geladen ist, dann wird nach den Kamera Zugriffsrechten gefragt
   * und das Video dargestellt. Sobald dort ein QR Code zu sehen ist wird dieser ausgelesen und die nächste Seite 
   * mit der passenden ID geladen.
   *  */ 
  public ngAfterViewInit() {
    // navigator ist die Schnittstelle zum User-Agent (Browser), darüber kann z.B. die Kamera angesprochen werden.
    var browser = <any>navigator;
    
    browser.getUserMedia = (browser.getUserMedia ||
    browser.webkitGetUserMedia ||
    browser.mozGetUserMedia ||
    browser.msGetUserMedia);

    if(browser.mediaDevices && browser.mediaDevices.getUserMedia) {
        browser.mediaDevices.getUserMedia({ audio: false, video: {facingMode: 'environment'} }).then(stream => {
          // mit getUserMedia wird eine Verbindung zur Kamera aufgebaut, bei Erfolg wird das video Objekt mit dem video 
          // stream  initialisiert.
            this.video.nativeElement.srcObject = stream;
            this.video.nativeElement.play();
            this.permission = true;
            this.localstream = stream;
            // Der Code Reader aus der Bibliothek zxing kümmert sich um die Erkennung des QR Codes.
            const codeReader = new BrowserQRCodeReader();
            // Der Reader dekodiert den QR Code
            codeReader.decodeFromInputVideoDevice(undefined, 'video')
            .then(result => {
                console.log(result.getText());
                let id = Number.parseInt(result.getText());
                // Die Methode goToOverview kümmert sich um das Routing.
                this.goToOverview(id);
                console.log(id);
            })
            .catch(err => console.error(err));
            console.log("video started");
        }).catch(err => {
          this.permission = false;
          console.log("Permission for camera denied")
        })
    }
}

/**
 * Navigiert mithilfe des routers zur Overview.
 * @param id id des Objekts das gescannt wurde.
 */
private goToOverview(id: number) {
  // Der Stream stoppt
  this.localstream.getTracks().forEach(element => {
    element.stop();
  });
  
  this.router.navigateByUrl("/overview/" + id.toString()).then(e => {
    if (e){
      // Durch neuladen wird die Kamera disabled
      window.location.reload();
      console.log("Success in Navigation");
    } else {
      console.log("Failure in Navigation");
    }
  })
}

}
