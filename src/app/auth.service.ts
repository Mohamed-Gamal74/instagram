import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { getFirestore, onSnapshot } from '@firebase/firestore';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // initial values
  toggleSignup = new BehaviorSubject(false);
  errorMessage = new BehaviorSubject('');
  auth = new BehaviorSubject(false);
  currentUserData = new BehaviorSubject({});
  cuurentUserId = new BehaviorSubject('');

  constructor(
    private _Auth: Auth,
    private _Router: Router,
    private _Firestore: Firestore
  ) {
    const auth = window.localStorage.getItem('auth');
    auth ? this.auth.next(true) : this.auth.next(false);

    this._Auth.onAuthStateChanged((user) => {
      if (user) {
        this.cuurentUserId.next(user.uid);
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);

        onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            this.currentUserData.next(doc.data());
          }
        });
      }
    });
  }

  toggleSignupMethod() {
    this.toggleSignup.next(!this.toggleSignup.value);
  }

  // sign up function with firebase and store user data to firestore collection
  async signup(
    email: string,
    fullName: string,
    username: string,
    password: string
  ) {
    await createUserWithEmailAndPassword(this._Auth, email, password)
      .then((res) => {
        setDoc(doc(this._Firestore, 'users', res.user.uid), {
          username: '@' + username,
          email: email,
          uid: res.user.uid,
          fullName: fullName,
          profileImg: '',
          following: [],
          followers: [],
          recentSearch: [],
        });
        this.errorMessage.next('');
        this.auth.next(true);
        window.localStorage.setItem('auth', 'true');
        this._Router.navigate(['/home']);
      })
      .catch((err) => {
        this.errorMessage.next('Email already exists , please try again');
        setTimeout(() => {
          this.errorMessage.next('');
        }, 2000);
      });
  }

  // login function using firebase authentication
  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this._Auth, email, password)
      .then((res) => {
        this.errorMessage.next('');
        this.auth.next(true);
        window.localStorage.setItem('auth', 'true');
        this._Router.navigate(['/home']);
      })
      .catch((err) => {
        this.errorMessage.next('Invalid Email or Password , please try again');

        setTimeout(() => {
          this.errorMessage.next('');
        }, 2000);
      });
  }

  // continue with google function
  async googleLogin() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this._Auth, provider).then((res: any) => {
        setDoc(doc(this._Firestore, 'users', res.user.uid), {
          username: '@' + res.user.displayName,
          email: res.user.email,
          uid: res.user.uid,
          fullName: res.user.displayName,
          profileImg: res.user.photoURL,
          following: [],
          followers: [],
          recentSearch: [],
        });
    });

    this.auth.next(true);
    this._Router.navigate(['/home']);
    window.localStorage.setItem('auth', 'true');
  }

  // logout and delete localstorage auth and redirect the user
  async logout() {
    await signOut(this._Auth).then(() => {
      this.auth.next(false);
      window.localStorage.removeItem('auth');
      this._Router.navigate(['/']);
    });
  }
}
