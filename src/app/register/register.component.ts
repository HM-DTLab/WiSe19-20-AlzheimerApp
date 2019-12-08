import { Component, OnInit } from '@angular/core';
import { AuthorisationService } from '../authorisation.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;
  codeInputForm : FormGroup;
  needRegCode : boolean;
  isInvalid : boolean;

  constructor(public authService: AuthorisationService, public router: Router, public formBuilder : FormBuilder) { }

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

  register() : void {
    if (
      this.registerForm.invalid || this.registerForm.controls.FirstTimePassword.value !== this.registerForm.controls.SecondTimePassword.value
      ) {
      this.isInvalid = true;
      return;
    }

    this.authService.register(this.registerForm.controls.email.value, this.registerForm.controls.SecondTimePassword.value).subscribe(worked => {
      if (!worked) {
        this.isInvalid = true;
      } else {
        this.needRegCode = true;
      }
    })
  }

  sendAuthCode() : void {
    if(this.codeInputForm.invalid) {
      this.isInvalid = true;
      return;
    }

    this.authService.confirmAuthCode(this.codeInputForm.controls.codeInput.value).subscribe(worked => {
      if (!worked) {
        this.isInvalid = true;
      } else {
        this.router.navigate(['login']);
      }
    });
  } 

}
