import { Component, DoCheck, OnInit } from '@angular/core';
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  doc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { FollowService } from 'src/app/home/follow.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  userId = '';
  userData: any = {};
  selectedImg = '';
  posts: any[] = [];
  showChangeImg = false;
  following = false;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _AuthService: AuthService,
    private _FollowService: FollowService
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((data) => {
      this.userId = data['id'];
      this.getUserData();
      this.isCurrentUser();
      this.isFollowing();
    });
  }

  // check if user is the current user
  async isCurrentUser() {
    this._AuthService.cuurentUserId.subscribe((data) => {
      data === this.userId
        ? (this.showChangeImg = true)
        : (this.showChangeImg = false);
    });
  }

  // check if is following
  async isFollowing() {
    this._FollowService.isFollowing(this.userId);
    this._FollowService.followed.subscribe((data) => {
      this.following = data;
    });
  }

  // get user data and posts
  getUserData() {
    const db = getFirestore();
    const docRef = doc(db, 'users', this.userId);
    getDoc(docRef).then((doc) => {
      this.userData = doc.data();
    });

    const q = query(
      collection(db, 'posts'),
      where('createdBy.uid', '==', this.userId)
    );

    onSnapshot(q, (querySnapshot) => {
      this.posts = [];
      querySnapshot.forEach((doc) => {
        this.posts.push(doc.data());
      });
    });
  }

  // change profile image for the current user
  onFileSelected(event: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImg = reader.result as string;
      const db = getFirestore();
      const docRef = doc(db, 'users', this.userId);
      setDoc(docRef, { profileImg: this.selectedImg }, { merge: true });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  followUser(user : any) {
    this._FollowService.followUser(user);
    this.getUserData()
  }

  unFollowUser(user : any) {
    this._FollowService.unfollowUser(user );
    this.getUserData()
  }
}
