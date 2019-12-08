import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorisationService } from '../authorisation.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isInvalid : boolean;
  loginForm : FormGroup;

  constructor(public authService: AuthorisationService, public router: Router, public formBuilder : FormBuilder) { 
    if (this.authService.isLoggedIn()) { 
      this.router.navigate(['/start']);
      }
  }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required] 
    });
  }

  login() : void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe((result) => {
      if (!result) {
        this.isInvalid = true;
      } else {
        this.router.navigate(['start']);
      }
    })
  }

}
