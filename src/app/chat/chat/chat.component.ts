import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  currentUserData: any;
  following: any = [];
  openedChat = false;
  selectedUser: any;
  message = '';
  chats = [];

  constructor(private _ChatService: ChatService) {}

  ngOnInit(): void {
    this._ChatService.getCurrentUserData();
    this._ChatService.currentUserData.subscribe((data: any) => {
      this.currentUserData = data;
      if (this.currentUserData.following?.length > 0) {
        this.getFollowing();
      }
    });
    this._ChatService.chatMessages.subscribe((data: any) => {
      this.chats = data;
    });
  }

  getFollowing() {
    const db = getFirestore();
    const users = collection(db, 'users');
    this.currentUserData.following?.map((user: any) => {
      const q = query(users, where('uid', '==', user));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.following.push(doc.data());
        });
      });
    });

  }

  openChat(user: any, evnt: any) {
    this.openedChat = true;
    evnt.target.parentElement.classList.add('active');
    this.selectedUser = user;
    this._ChatService.getMessages(user);
  }

  messageTyping(event: any) {
    this.message = event.target.value;
  }

  sendMessage() {
    if (this.message !== '') {
      this.showEmojiPicker = false;
      this._ChatService.sendMessageHandler(this.selectedUser, this.message);
      this.message = '';
    } else {
      return;
    }
  }

  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger',
  ];
  set = 'twitter';
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    this.message = `${this.message}${event.emoji.native}`;
  }
}
