import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorisationService } from '../authorisation.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthorisationService, public router: Router) { }

  ngOnInit() {
  }

  login() : void {
    this.authService.login('firlus@hm.edu', 'Alzhe1mer!');
    this.router.navigate(['start']);
  }

}
