import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = false;

  constructor(private authService: AuthService) { }

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

    if (this.isLoginMode) {
      // ...
    } else {
      this.authService.singUp(email, password)
        .subscribe(data => {
          console.log(data);
        }, error => {
          console.log(error);
        })
    }

    authForm.reset();
  }
}
