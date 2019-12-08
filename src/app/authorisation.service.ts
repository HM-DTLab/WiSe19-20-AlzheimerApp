import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

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

  login(username: string, password: string) : BehaviorSubject<boolean> {
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
    var worked = new BehaviorSubject(false);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
            var accessToken = result.getAccessToken().getJwtToken();
            // Ab hier ist man eingeloggt und hat den Token für die Http-Requests
            localStorage.setItem('Access-token', accessToken);
            console.log("Logged in on cognito");
            worked.next(true);
        },
        onFailure: function(err) {
            alert("Falsche Login du Zipfel");
        },
    });
    return worked;
  }

  register(email : string, password: string) : BehaviorSubject<boolean> {
    const attributesList = [];
  
    var worked = new BehaviorSubject(false);
    this.userPool.signUp(email, password, attributesList, null, (err, result) => {
      if (err) {
        console.log("An error occured during regeristration", err);
      }
      this.currUser = result.user;
      worked.next(true);
    });
    return worked;
  }

  confirmAuthCode(code) : BehaviorSubject<boolean> {
    const user = {
      Username : this.currUser.username,
      Pool : this.userPool
    };

    const cognitoUser = new CognitoUser(user);
    var worked = new BehaviorSubject(false);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("confirmAuthCode() success", result);
      worked.next(true);
    });

    return worked;
  }

  isLoggedIn() : boolean {
    const token = localStorage.getItem('Access-token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
