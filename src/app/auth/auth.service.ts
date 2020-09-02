import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

export interface AuthResponseData {
  idToken: string,      //	A Firebase Auth ID token for the newly created user.
  email: string,        //	The email for the newly created user.
  refreshToken: string, //	A Firebase Auth refresh token for the newly created user.
  expiresIn: string,    //	The number of seconds in which the ID token expires.
  localId: string       //	The uid of the newly created user.
  registered?: boolean   //  Whether the email is for an existing account.
}

@Injectable({providedIn: "root"})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  private static handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "Account with this email already exists!";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "Account with this email does not exists!";
        break
      case 'INVALID_PASSWORD':
        errorMessage = "Wrong password!";
        break;
    }
    return throwError(errorMessage);
  }

  singUp(email: String, password: String) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdn_hVrnOKHeJD34lgpDURPJ0pUjyJotc',
        {
          email,
          password,
          returnSecureToken: true
        })
      .pipe(catchError(AuthService.handleError));
  }

  logIn(email: String, password: String) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdn_hVrnOKHeJD34lgpDURPJ0pUjyJotc',
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(AuthService.handleError));
  }
}
