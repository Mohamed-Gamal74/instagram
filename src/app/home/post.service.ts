import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  collection,
  addDoc,
  getFirestore,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // initial values
  showPostOverlay = new BehaviorSubject(false);
  allPosts = new BehaviorSubject<any[]>([]);
  liked = new BehaviorSubject(false);

  constructor(private _AuthService: AuthService) {
    // get all posts
    this.getAllPosts();
  }

  // method to create a post and add it to firestore
  createPost(post: any) {
    addDoc(collection(getFirestore(), 'posts'), {
      ...post,
      likes: [],
      comments: [],
      createdAt: new Date(),
      createdBy: this._AuthService.currentUserData.value,
    });
  }

  getAllPosts() {
    const db = getFirestore();
    const posts = collection(db, 'posts');
    const q = query(posts, orderBy('createdAt', 'desc'));

    onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      this.allPosts.next(posts);
      posts.forEach((post: any) => {
        post.likes?.forEach((like: any) => {
          if (like === this._AuthService.cuurentUserId.value) {
            this.liked.next(true);
          } else {
            this.liked.next(false);
          }
        });
      });
      this.getTime();
    });
  }

  // method to show post overlay
  showPostOverlayFn() {
    this.showPostOverlay.next(!this.showPostOverlay.value);
  }

  // method to handle like
  handleLike(post: any) {
    const db = getFirestore();
    const docRef = doc(db, 'posts', post.id);
    const likes = post.likes;
    const index = likes.findIndex((like: any) => {
      return like === this._AuthService.cuurentUserId.value;
    });

    if (index === -1) {
      likes.push(this._AuthService.cuurentUserId.value);

      this.liked.next(true);
    } else {
      likes.splice(index, 1);
      this.liked.next(false);
    }
    setDoc(docRef, { likes }, { merge: true });
  }

  // method to handle comment
  handleComment(post: any, comment: string) {
    const db = getFirestore();
    const docRef = doc(db, 'posts', post.id);
    const comments = post.comments;
    comments.push({
      comment,
      createdAt: new Date(),
      createdBy: this._AuthService.currentUserData.value,
    });
    setDoc(docRef, { comments }, { merge: true });
  }

  deletePost(post: any) {
    const db = getFirestore();
    const docRef = doc(db, 'posts', post.id);
    deleteDoc(docRef);
  }

  // geting the current time - the time of the post
  getTime() {
    this.allPosts.value.forEach((post: any) => {
      const diff = new Date().getTime() - post.createdAt.seconds * 1000;
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if (seconds < 60) {
        post.createdAt = seconds + ' seconds ago';
      } else if (minutes < 60) {
        post.createdAt = minutes + ' minutes ago';
      } else if (hours < 24) {
        post.createdAt = hours + ' hours ago';
      } else if (days < 30) {
        post.createdAt = days + ' days ago';
      }
    });
  }
}
