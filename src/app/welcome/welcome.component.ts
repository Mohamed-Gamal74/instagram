import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  hide = true;
  signup: boolean = false;

  constructor(private _AuthService: AuthService) {}

  ngOnInit(): void {
    this._AuthService.toggleSignup.subscribe((data) => {
      this.signup = data;
    });
  }
}
