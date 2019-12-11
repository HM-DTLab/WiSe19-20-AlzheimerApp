import { Component, OnInit } from '@angular/core';
import { AuthorisationService } from '../authorisation.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * Kümmert sich um die Registrierung neuer Nutzer.
 */
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;
  codeInputForm : FormGroup;
  needRegCode : boolean;
  isInvalid : boolean;

  constructor(public authService: AuthorisationService, public router: Router, public formBuilder : FormBuilder) {
    if (authService.isLoggedIn()) {
      router.navigate(['start']);
    }
   }

  /**
   * Initialisiert die beiden Form Objekte, einmal zum eingeben der neuen User-Infos und anschließend
   * zum eingeben des Bestätigungscodes
   */
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      FirstTimePassword: ['', Validators.required],
      SecondTimePassword: ['', Validators.required] 
    });

    this.codeInputForm = this.formBuilder.group({
      codeInput: ['', Validators.required]
    });
  }

  /**
   * Wird nach Eingabe aller Daten aufgerufen und ruft Registrier-Methode des AuthorisationServices auf.
   */
  register() : void {
    var firstTimePassword = this.registerForm.controls.FirstTimePassword.value;
    var secondTimePassword = this.registerForm.controls.SecondTimePassword.value;
    var email = this.registerForm.controls.email.value;
    if (this.registerForm.invalid || firstTimePassword !== secondTimePassword) {
      this.isInvalid = true;
      return;
    }


    var regexPassword = new RegExp("(?=.{8,})(?=.*[0-9])(?=.[!@#\$%\^&])(?=.*[A-Z])");
    var regexMail = new RegExp(".*@.*");
    if (!(regexPassword.test(firstTimePassword) || regexMail.test(email))) {
      this.isInvalid = true;
      return;
    }

    this.authService.register(email, firstTimePassword).subscribe((worked) => {
      if (!worked) {
        this.isInvalid = true;
      } else {
        this.needRegCode = true;
      }
    }, (err) => {
      console.log("Auch Fehler in Register Komponente", err);
      if (err.name.includes("Exists")) {
        this.needRegCode = true;
        this.isInvalid = false;
      }
    });
  }

  /**
   * Wird nach Eingabe des Codes aufgerufen und ruft Registrier-Methode des AuthorisationServices auf.
   */
  sendAuthCode() : void {
    if(this.codeInputForm.invalid) {
      this.isInvalid = true;
      return;
    }

    this.authService.confirmAuthCode(this.registerForm.controls.email.value, this.codeInputForm.controls.codeInput.value).subscribe(worked => {
      if (!worked) {
        this.isInvalid = true;
      } else {
        this.router.navigate(['login']);
      }
    });
  } 

}
