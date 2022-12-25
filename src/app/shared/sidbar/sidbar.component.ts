import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { PostService } from '../../home/post.service';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css'],
})
export class SidbarComponent {
  userId = '';
  userData: any = {};
  userImg = '';
  showSearchValue = false;

  constructor(
    private _AuthService: AuthService,
    private _PostService: PostService
  ) {}

  ngOnInit(): void {
    this._AuthService.cuurentUserId.subscribe((data) => {
      this.userId = data;
    });

    this._AuthService.currentUserData.subscribe((data) => {
      this.userData = data;
      if (this.userData['profileImg']) {
        this.userImg = this.userData['profileImg'];
      }
    });
  }

  logout() {
    this._AuthService.logout();
  }

  showOverlay() {
    this._PostService.showPostOverlayFn();
  }

  showSearch() {
    this.showSearchValue = !this.showSearchValue;
  }
}
