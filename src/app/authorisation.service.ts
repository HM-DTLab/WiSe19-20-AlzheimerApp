import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Beinhaltet die Anmeldungslogik bei Cognito. Kann den Aktuellen Login Status zurückgeben, sich anmelden oder 
 * eine Registrierung (inkl. Bestätigungscode) durchführen.
 */
export class AuthorisationService {
  
  poolData = {
    UserPoolId: 'eu-central-1_77EViVvtH', 
    ClientId: '7oum34oqgm3kptjemkvvkjun61', 
  };
  userPool = new CognitoUserPool(this.poolData);
  currUser : any;

  constructor(public jwtHelper: JwtHelperService) { }

  /**
   * Loggt einen User ein
   * @param username Der Nutzername (muss Email sein)
   * @param password Passwort des Nutzers
   */
  login(username: string, password: string) : Observable<any> {
    var authenticationData = {
      Username : username,
      Password : password,
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);
    var userData = {
        Username : username,
        Pool : this.userPool
    };
    var cognitoUser = new CognitoUser(userData);

    return Observable.create(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
            var accessToken = result.getAccessToken().getJwtToken();
            // Ab hier ist man eingeloggt und hat den Token für die Http-Requests
            localStorage.setItem("Access-token", accessToken);
            observer.next(result);
            console.log("Logged in in Auth Service")
            observer.complete();
        },
        onFailure: function(err) {
            observer.error(err);
            observer.complete();
        },
    
      });
    });
  }

  /**
   * Registriert einen neuen User. Dieser erhält eine Email und muss den Bestätigungscode eingeben.
   * @param email Email des neuen Nutzers
   * @param password Passwort des neuen Nutzers
   */
  register(email : string, password: string) : Observable<any> {
    const attributesList = [];
    return Observable.create(observer => {
      this.userPool.signUp(email, password, attributesList, null, (err, result) => {
        if (err) {
          console.log("An error occured during regeristration", err);
          observer.error(err);
          observer.complete();
        } else {
          this.currUser = result.user;
          observer.next(result);
          observer.complete();
        }
      });
    });
  }

  /**
   * Validiert die Emailadresse durch eingeben de Codes. (Muss gemacht werden bevor ein User freigeschalten wird).
   * @param code BEstätigungscode
   */
  confirmAuthCode(username, code) : Observable<any> {
    const user = {
      Username : username,
      Pool : this.userPool
    };

    const cognitoUser = new CognitoUser(user);
    return Observable.create(observer => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log("confirmAuthCode() success", result);
        observer.next(true);
      });
    });
  }

  /**
   * Gibt den aktuellen Login Status zurück (angemeldet oder nicht).
   */
  isLoggedIn() : boolean {
    const token = localStorage.getItem('Access-token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
