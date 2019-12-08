import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthorisationGuardService implements CanActivate {

  constructor(public router : Router) { }

  canActivate() : boolean {
    this.router.navigate(['login'])
    return false;
  }
}
