import { Component } from '@angular/core';
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
export class UserprofileComponent {
  userId = '';
  userData: any = {};
  selectedImg = '';
  posts: any = [];
  showChangeImg = false;
  following = false;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _AuthService: AuthService,
    private _FollowService: FollowService
  ) {}

  ngOnInit(): void {
    this.userId = this._ActivatedRoute.snapshot.params['id'];
    this.getUserData();
    this.getUserPosts();
    this._AuthService.cuurentUserId.subscribe((data) => {
      if (data === this.userId) {
        this.showChangeImg = true;
      }
    });

    this._FollowService.isFollowing(this.userId);
    this._FollowService.followed.subscribe((data) => {
      this.following = data;
    });
  }

  getUserData() {
    const db = getFirestore();
    const docRef = doc(db, 'users', this.userId);
    getDoc(docRef).then((doc) => {
      this.userData = doc.data();
    });
  }

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

  getUserPosts() {
    const db = getFirestore();
    const q = query(
      collection(db, 'posts'),
      where('createdBy.uid', '==', this.userId)
    );

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        this.posts.push(change.doc.data());
      });
    });
  }

  followUser(user: any) {
    this._FollowService.followUser(user);
  }

  unFollowUser(user: any) {
    this._FollowService.unfollowUser(user);
  }
}
