import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QrCodeGeneratorService } from '../../Services/qr-code-generator.service';
import { DataServiceService } from '../../Services/data-service.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-qr-code-generation',
  templateUrl: './qr-code-generation.component.html',
  styleUrls: ['./qr-code-generation.component.scss']
})
/**
 * Generiert QR-Codes mithilfe des Services und stellt diese da. Daten für die QR Codes werden über ein Input Feld genommen
 */
export class QrCodeGenerationComponent implements OnInit {

  public qrCode : any;
  public generated : boolean;
  public newTitle : number;
  public invalidInput : boolean;
  public newId : number = -1;

  public generationForm : FormGroup;

  constructor(
    private generationService : QrCodeGeneratorService,
    public formBuilder : FormBuilder,
    private dataService : DataServiceService,
    private router : Router
  ) { 
    if (localStorage.getItem('isEditor') == 'false') {
      this.router.navigate(['start'])
    }
  }


  ngOnInit() {
    this.generationForm = this.formBuilder.group({
      newTitle: ['', Validators.required]
    });
  }


  /**
   * Generiert einen QR Code und prüft vorher ob wirklich eine Nummer eingegben wurde,
   * Ruft dann die Methode createImageFromBlob auf um das Bild zu parsen.
   */
   async generate() : Promise<void> {
    if (this.generationForm.invalid) {
      this.invalidInput = true;
      return;
    }
    let title : string = this.generationForm.controls.newTitle.value;
    await this.dataService.getNextFreeId().then((result) => {
      this.newId = result['nextFreeId'];
      console.log("Nächste freie ID: ", result['nextFreeId']);
    }, (err) => {
      console.log(err);
      this.invalidInput = true;
      return;
    });
        
    this.dataService.putQrCodeInformation(this.newId , title, 'Dies ist nur ein Test').subscribe((result) => {
      console.log(result);
    });

    this.generationService.createNewCode(this.newId.toString()).subscribe(result => {
      this.createImageFromBlob(result);
      this.invalidInput = false;
    }, (err) => {
      this.invalidInput = true;
      console.log(err);
    });
  }

  /**
   * Wandelt einen Blob in ein  Bild um das dann im Image Tag dargestellt wird.
   * @param blob Blob mit Bilddaten.
   */
  createImageFromBlob(blob : Blob) : void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.qrCode = reader.result;
    }, false);

    reader.readAsDataURL(blob);
    this.generated = true;
  }

  goToOverview() : void {
    this.router.navigate(['/overview/' + this.newId])
  }
}
