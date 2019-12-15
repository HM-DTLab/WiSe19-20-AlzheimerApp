import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorisationService } from '../../Services/authorisation.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { QrCodeGeneratorService } from '../../Services/qr-code-generator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
/**
 * Kümmert sich um den Login mithilfe der Angular ReactiveForms
 */
export class LoginComponent implements OnInit {
  isInvalid : boolean;
  loginForm : FormGroup;
  generated : boolean;

  @ViewChild("image", {static : false})
  public img : any;

  constructor(
    public authService: AuthorisationService,
    public router: Router, 
    public formBuilder : FormBuilder,
    public genServ : QrCodeGeneratorService
    ) { 
    if (this.authService.isLoggedIn()) { 
      this.router.navigate(['/start']);
      }
  }
  
  /**
   * Bildet eine neue FormGroup
   */
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required] 
    });
  }

  /**
   * Wird nach dem Bestätigen der eingaben aufgerufen und sendet Anfrage mithilfe des AuthorisationServices
   */
  login() : void {
    if (this.loginForm.invalid) {
      this.isInvalid = true;
      return;
    }

    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe((result) => {
      if (result) {
        this.router.navigate(['start']);
      } else {
        this.isInvalid = true;
      }
    }, (err) => {
      this.isInvalid = true;
    });
  }
}
