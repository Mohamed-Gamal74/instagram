import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor() { }
}
