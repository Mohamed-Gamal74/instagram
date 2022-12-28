import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent {
  userData: any;
  userUpdateForm: FormGroup;

  constructor(
    private _AuthService: AuthService,
    private _FormBuilder: FormBuilder,
    private _Router: Router
  ) {
    this.userUpdateForm = this._FormBuilder.group({
      fullName: '',
      username: '',
      bio: '',
    });
  }

  ngOnInit(): void {
    this._AuthService.currentUserData.subscribe((data) => {
      this.userData = data;

    });
  }

  onSubmit() {
    const db = getFirestore();
    const docRef = doc(db, 'users', this.userData.uid);
    updateDoc(docRef, {
      fullName: this.userUpdateForm.value.fullName || this.userData.fullName,
      username: this.userUpdateForm.value.username || this.userData.username,
      bio: this.userUpdateForm.value.bio || this.userData.bio,
    }).then(() => {
      this._Router.navigate(['/profile', this.userData.uid]);
    });
  }
}
