import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { PostService } from '../../home/post.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css'],
})
export class SidbarComponent {
  userId = '';
  userData: any = {};
  userImg = '';
  slideNav = false;


  constructor(
    private _AuthService: AuthService,
    private _PostService: PostService,
    private _SearchService: SearchService
  ) {}

  ngOnInit(): void {

    this._SearchService.showSearch.subscribe((data) => {
      this.slideNav = data;
    });



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
    this._SearchService.showSearchBar();
  }
}
