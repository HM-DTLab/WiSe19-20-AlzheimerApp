import { Component, OnInit } from '@angular/core';
import { QrCodeGeneratorService } from '../../Services/qr-code-generator.service';
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
  public idToBeGenerated : number;
  public invalidInput : boolean;

  public generationForm : FormGroup;

  constructor(
    private generationService : QrCodeGeneratorService,
    public formBuilder : FormBuilder
  ) { }

  ngOnInit() {
    this.generationForm = this.formBuilder.group({
      idToBeGenerated: ['', Validators.required]
    });
  }


  /**
   * Generiert einen QR Code und prüft vorher ob wirklich eine Nummer eingegben wurde,
   * Ruft dann die Methode createImageFromBlob auf um das Bild zu parsen.
   */
  generate() : void {
    if (this.generationForm.invalid) {
      this.invalidInput = true;
      return;
    }

    this.idToBeGenerated = parseInt(this.generationForm.controls.idToBeGenerated.value);

    if (isNaN(this.idToBeGenerated)) {
      this.invalidInput = true;
      this.generated = false;
      this.idToBeGenerated = null;
      return;
    }
      
    this.generationService.createNewCode(this.idToBeGenerated.toString()).subscribe(result => {
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
}
