import { Component } from '@angular/core';
import { AuthService } from '../../../app/auth.service';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css'],
})
export class SidbarComponent {
  constructor(private _AuthService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this._AuthService.logout();
  }
}
