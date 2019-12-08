import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorisationService } from './authorisation.service';


@Injectable({
  providedIn: 'root'
})

export class AuthorisationGuardService implements CanActivate {

  constructor(public router : Router, public authService : AuthorisationService) { }

  canActivate() : boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login'])
      return false;
    }
    return true;
  }
}
