import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {
  
  poolData = {
    UserPoolId: 'eu-central-1_77EViVvtH', 
    ClientId: '7oum34oqgm3kptjemkvvkjun61', 
  };
  userPool = new CognitoUserPool(this.poolData);
  currUser : any;

  constructor(public jwtHelper: JwtHelperService) { }

  login(username: string, password: string) : Observable<any> {
    var authenticationData = {
      Username : username,
      Password : password,
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);
    var userData = {
        Username : 'firlus@hm.edu',
        Pool : this.userPool
    };
    var cognitoUser = new CognitoUser(userData);

    return Observable.create(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
  
          localStorage.setItem('Access-token', result.getAccessToken().getJwtToken());
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err) {
          console.log(err);
          observer.error(err);
        },
      });
    });
  }

  register(email : string, password: string) : Observable<any> {
    const attributesList = [];
  
    return Observable.create(observer => {
      this.userPool.signUp(email, password, attributesList, null, (err, result) => {
        if (err) {
          console.log("An error occured during regeristration", err);
        }
        this.currUser = result.user;
        observer.next(result);
      });
    });
  }

  confirmAuthCode(code) : Observable<any> {
    const user = {
      Username : this.currUser.username,
      Pool : this.userPool
    };

    const cognitoUser = new CognitoUser(user);
    return Observable.create(observer => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log("confirmAuthCode() success", result);
        observer.next(true);
      });
    });
  }

  isLoggedIn() : boolean {
    const token = localStorage.getItem('Access-token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
