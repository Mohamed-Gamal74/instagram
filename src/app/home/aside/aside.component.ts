import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FollowService } from '../follow.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate(500)]),
    ]),
  ],
})
export class AsideComponent {
  users: any = [];

  constructor(
    private _AuthService: AuthService,
    private _FollowService: FollowService,
    private _Router: Router
  ) {}
  userData: any = {};

  ngOnInit(): void {
    this._AuthService.currentUserData.subscribe((data) => {
      this.userData = data;
      this._FollowService.getAllusers();
    });

    this._FollowService.allUsers.subscribe((data) => {
      this.users = data;
    });
  }

  handleFollow(user: any) {
    this._FollowService.followUser(user);
  }

  handleRoute() {
    this._Router.navigate(['/profile', this.userData.uid]);
  }
}
