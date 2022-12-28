import { Injectable } from '@angular/core';
import {
  collection,
  getFirestore,
  onSnapshot,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { arrayUnion } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  filterdUser = new BehaviorSubject<any[]>([]);
  showSearch = new BehaviorSubject<boolean>(false);
  allUsers = new BehaviorSubject<any[]>([]);
  recentSearch = new BehaviorSubject<any[]>([]);

  constructor(private _AuthService: AuthService) {
    this.getAllUsers();
  }

  showSearchBar() {
    this.showSearch.next(!this.showSearch.value);
  }

  getAllUsers() {
    const db = getFirestore();
    const users = collection(db, 'users');
    onSnapshot(users, (snapshot) => {
      const users = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      this.allUsers.next(users);
    });
  }

  handleSearch(event: any) {
    const value = event.target.value;
    if (value) {
      this.allUsers.subscribe((data) => {
        const filterdUser = data.filter((user) => {
          return user.username.toLowerCase().includes(value.toLowerCase());
        });
        this.filterdUser.next(filterdUser);
      });
    }
  }

  handleRecentSearch(user: any) {
    let currentUserId = this._AuthService.cuurentUserId.value;
    const db = getFirestore();
    const userRef = doc(db, 'users', currentUserId);
    setDoc(
      userRef,
      {
        recentSearch: arrayUnion({
          uid: user.uid,
          username: user.username,
          profileImg: user.profileImg,
        }),
      },

      { merge: true }
    );
  }

  getRecentSearch() {
    const currentUserId = this._AuthService.cuurentUserId.value;
    if (currentUserId) {
      const db = getFirestore();
      const userRef = doc(db, 'users', currentUserId);
      onSnapshot(userRef, (snapshot) => {
        const data = snapshot.data();
        this.recentSearch.next(data?.['recentSearch']);
      });
    }
  }
}
