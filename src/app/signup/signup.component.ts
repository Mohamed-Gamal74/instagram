import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class SignupComponent {
  hide = true;
  signupForm: FormGroup;
  error: string = '';

  constructor(
    private _AuthService: AuthService,
    private _FormBuilder: FormBuilder
  ) {
    this.signupForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
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

  signup() {
    if (this.signupForm.invalid) {
      return;
    } else {
      this._AuthService.signup(
        this.signupForm.value.email,
        this.signupForm.value.fullName,
        this.signupForm.value.username,
        this.signupForm.value.password
      );
    }
  }
}
