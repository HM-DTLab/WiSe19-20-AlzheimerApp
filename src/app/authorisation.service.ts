import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService {

  constructor(public jwtHelper: JwtHelperService) { }

  login(username: string, password: string) : void {
    var authenticationData = {
      Username : username,
      Password : password,
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);
    var poolData = {
      UserPoolId: 'eu-central-1_77EViVvtH', 
      ClientId: '7oum34oqgm3kptjemkvvkjun61', 
    };
    var userPool = new CognitoUserPool(poolData);
    var userData = {
        Username : 'firlus@hm.edu',
        Pool : userPool
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
            var accessToken = result.getAccessToken().getJwtToken();
            console.log(accessToken);
            // Ab hier ist man eingeloggt und hat den Token für die Http-Requests
            localStorage.setItem('Access-token', accessToken);
        },
        onFailure: function(err) {
            alert(err);
        },
    });
  }

  isLoggedIn() : boolean {
    const token = localStorage.getItem('Access-token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
