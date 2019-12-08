import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorisationService } from './authorisation.service';


@Injectable({
  providedIn: 'root'
})
/**
 * Kümmert sich um die Berechtigungen des Zugriffs der User auf eine bestimmte Seite. Wird dazu im RoutingModule 
 * als "Guard" eingetragen.
 */
export class AuthorisationGuardService implements CanActivate {

  constructor(public router : Router, public authService : AuthorisationService) { }

  /**
   * Entscheidet aufgrund des Access Tokens ob ein Benutzer auf die seite zugreifen darf oder nicht
   * @returns boolean ob Zugriff erlaubt oder nicht.
   */
  canActivate() : boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login'])
      return false;
    }
    return true;
  }
}
