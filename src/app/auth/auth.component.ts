import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

import {AuthResponseData, AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onToggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.logIn(email, password);
    } else {
      authObs = this.authService.singUp(email, password);
    }

    authObs.subscribe(data => {
      console.log(data);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    })

    authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
