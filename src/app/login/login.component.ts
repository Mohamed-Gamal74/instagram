import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class LoginComponent {
  hide = true;
  error: string = '';
  loginForm: FormGroup;

  constructor(
    private _AuthService: AuthService,
    private _FormBuilder: FormBuilder
  ) {
    this.loginForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this._AuthService.errorMessage.subscribe((data) => {
      this.error = data;
    });
  }

  toggleSignup() {
    this._AuthService.toggleSignupMethod();
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    } else {
      this._AuthService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
    }
  }

  googleLogin() {
    this._AuthService.googleLogin();
  }
}
