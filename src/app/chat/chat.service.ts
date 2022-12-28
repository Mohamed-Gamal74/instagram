import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  currentUserData = new BehaviorSubject({}) as any;
  chatMessages = new BehaviorSubject([]) as any;

  constructor(private _AuthService: AuthService) {}

  getCurrentUserData() {
    this._AuthService.currentUserData.subscribe((data) => {
      this.currentUserData.next(data);
    });
  }

  async sendMessageHandler(user: any, message: any) {
    const currentUserId = this.currentUserData.value.uid;
    const selectedUserId = user.uid;
    const db = getFirestore();
    const combinedId =
      currentUserId > selectedUserId
        ? currentUserId + selectedUserId
        : selectedUserId + currentUserId;
    const docRef = doc(db, 'chats', combinedId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(docRef, {
        messages: [
          ...docSnap.data()['messages'],
          {
            message: message,
            sender: currentUserId,
            receiver: selectedUserId,
            timestamp: new Date().getTime(),
          },
        ],
      });
    }
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        messages: [
          {
            message: message,
            sender: currentUserId,
            receiver: selectedUserId,
            timestamp: new Date().getTime(),
          },
        ],
      });
    }
    this.getMessages(user);
  }

  async getMessages(user: any): Promise<any> {
    const currentUserId = this.currentUserData.value.uid;
    const selectedUserId = user.uid;
    const db = getFirestore();
    const combinedId =
      currentUserId > selectedUserId
        ? currentUserId + selectedUserId
        : selectedUserId + currentUserId;
    const docRef = doc(db, 'chats', combinedId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.chatMessages.next(docSnap.data()['messages']);

      this.chatMessages.subscribe((data: any) => {
        data.sort((a: any, b: any) => {
          return a.timestamp - b.timestamp;
        });
      });
    }
    if (!docSnap.exists()) {
      return [];
    }
  }
}
