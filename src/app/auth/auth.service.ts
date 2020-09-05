import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user.model";

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
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
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
      .pipe(catchError(this.handleError),
        tap(authData => {
          this.handleAuthentication(authData.email, authData.localId, authData.idToken, +authData.expiresIn);
        }));
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
      .pipe(catchError(this.handleError),
        tap(authData => {
        this.handleAuthentication(authData.email, authData.localId, authData.idToken, +authData.expiresIn);
      }));
  }

  private handleError(errorRes: HttpErrorResponse) {
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

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const tokenExpirationData = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, tokenExpirationData);
    this.user.next(user);
  }
}
