import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {environment} from "../../environments/environment";

import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

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
  private logOutTimeout: any = null;

  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {
  }

  singUp(email: String, password: String) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
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
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
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

  autoLogIn() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const user = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (user.token) {
      this.store.dispatch(new AuthActions.Login({
        email: user.email,
        userId: user.id,
        token: user.token,
        tokenExpirationData: new Date(userData._tokenExpirationDate)
      }));
      this.autoLogOut(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
    }
  }

  logOut() {
    this.store.dispatch(new AuthActions.Logout());
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.logOutTimeout) {
      clearTimeout(this.logOutTimeout);
      this.logOutTimeout = null;
    }
  }

  autoLogOut(timeDuration: number) {
    console.log(timeDuration);
    this.logOutTimeout = setTimeout(() => {
      this.logOut();
    }, timeDuration);
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
    this.store.dispatch(new AuthActions.Login({email, userId, token, tokenExpirationData}));
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
