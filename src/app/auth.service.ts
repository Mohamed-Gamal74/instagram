import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
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
  toggleSignup = new BehaviorSubject(false);
  errorMessage = new BehaviorSubject('');
  auth = new BehaviorSubject(false);
  currentUserID = new BehaviorSubject('');
  userDate = new BehaviorSubject({});

  constructor(
    private _Auth: Auth,
    private _Router: Router,
    private _Firestore: Firestore
  ) {
    const auth = window.localStorage.getItem('auth');
    auth ? this.auth.next(true) : this.auth.next(false);

    this._Auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserID.next(user.uid);
      }
    });
  }

  toggleSignupMethod() {
    this.toggleSignup.next(!this.toggleSignup.value);
  }

  async signup(
    email: string,
    fullName: string,
    username: string,
    password: string
  ) {
    await createUserWithEmailAndPassword(this._Auth, email, password)
      .then((res) => {
        setDoc(doc(this._Firestore, 'users', res.user.uid), {
          username: username,
          email: email,
          uid: res.user.uid,
          fullName: fullName,
        });
        this._Router.navigate(['/home']);
        this.errorMessage.next('');
        this.auth.next(true);
        window.localStorage.setItem('auth', 'true');
      })
      .catch((err) => {
        this.errorMessage.next('Email already exists , please try again');
        setTimeout(() => {
          this.errorMessage.next('');
        }, 2000);
      });
  }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this._Auth, email, password)
      .then((res) => {
        this._Router.navigate(['/home']);
        this.errorMessage.next('');
        this.auth.next(true);
        window.localStorage.setItem('auth', 'true');
      })
      .catch((err) => {
        this.errorMessage.next('Invalid Email or Password , please try again');

        setTimeout(() => {
          this.errorMessage.next('');
        }, 2000);
      });
  }

  async googleLogin() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this._Auth, provider).then((res) => {
      setDoc(doc(this._Firestore, 'users', res.user.uid), {
        username: res.user.displayName,
        email: res.user.email,
        uid: res.user.uid,
        fullName: res.user.displayName,
      });
      this.auth.next(true);
      this._Router.navigate(['/home']);
      window.localStorage.setItem('auth', 'true');
    });
  }

  async logout() {
    await signOut(this._Auth).then(() => {
      this._Router.navigate(['/']);
      this.auth.next(false);
      this.currentUserID.next('');
      window.localStorage.removeItem('auth');
    });
  }

  getUserData() {}
}
