import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorisationService } from '../authorisation.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

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
  private userView = true;


  constructor(public authService: AuthorisationService, public router: Router, public formBuilder : FormBuilder) {
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
      password: ['', Validators.required],
      //optRadio: [''],
    });

  }

  logUserView() {
    console.log(this.userView);
  }
  /**
   * Wird nach dem Bestätigen der eingaben aufgerufen und sendet Anfrage mithilfe des AuthorisationServices
   */
  login() : void {
    if (this.loginForm.invalid) {
      console.log("Invalid form");
      this.isInvalid = true;
      return;
    }

    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe((result) => {
      if (result) {
        console.log("sicht " + this.userView);
        if (!this.userView) {
          localStorage.setItem('isEditor', 'true');
        } else {
          localStorage.setItem('isEditor', 'false');
        }
        this.router.navigate(['start']);
      } else {
        this.isInvalid = true;
      }
    }, (err) => {
      this.isInvalid = true;
    });
  }

}
