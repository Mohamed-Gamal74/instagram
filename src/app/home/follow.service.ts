import { Injectable } from '@angular/core';
import {
  collection,
  getFirestore,
  query,
  onSnapshot,
  doc,
  setDoc,
  arrayUnion,
} from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';
import { arrayRemove, where } from 'firebase/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  allUsers = new BehaviorSubject<any[]>([]);
  followed = new BehaviorSubject(false);

  constructor(private _auth: Auth, private _AuthService: AuthService) {}

  // method to get all users from firestore then filter out the current user
  //&& users that are already followed
  getAllusers() {
    this._auth.onAuthStateChanged((user) => {
      if (user) {
        const db = getFirestore();
        const users = collection(db, 'users');
        const q = query(users, where('uid', '!=', user.uid));
        onSnapshot(q, (snapshot) => {
          const users = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          this._AuthService.cuurentUserId.subscribe((id) => {
            this.allUsers.next(
              users.filter((user: any) => {
                return !user.followers?.includes(id);
              })
            );
          });
        });
      }
    });
  }

  // method to follow a user and add it to firestore
  followUser(user: any) {
    const db = getFirestore();
    const docRef = doc(db, 'users', user.uid);
    setDoc(
      docRef,
      { followers: arrayUnion(this._AuthService.cuurentUserId.value) },
      { merge: true }
    );
    const docRef2 = doc(db, 'users', this._AuthService.cuurentUserId.value);
    setDoc(docRef2, { following: arrayUnion(user.uid) }, { merge: true });
    this.getAllusers();
    this.followed.next(true);
  }

  // method to unfollow a user and remove it from firestore
  unfollowUser(user: any) {
    const db = getFirestore();
    const docRef = doc(db, 'users', user.uid);
    setDoc(
      docRef,
      { followers: arrayRemove(this._AuthService.cuurentUserId.value) },
      { merge: true }
    );
    const docRef2 = doc(db, 'users', this._AuthService.cuurentUserId.value);
    setDoc(docRef2, { following: arrayRemove(user.uid) }, { merge: true });
    this.getAllusers();
    this.followed.next(false);
  }

  // method that cheks if the current user is following a user
  async isFollowing(user: any) {
    this._AuthService.currentUserData.subscribe(async (data: any) => {
      if (data.following?.includes(user)) {
        this.followed.next(true);
      } else {
        this.followed.next(false);
      }
    });
  }
}
