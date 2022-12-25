import { Injectable } from '@angular/core';
import { collection, getFirestore, onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  allUsers = new BehaviorSubject<any[]>([]);
  filterdUser = new BehaviorSubject<any[]>([]);

  constructor() {
    this.getAllUsers();
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
}
