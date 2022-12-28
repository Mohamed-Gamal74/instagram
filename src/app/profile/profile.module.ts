import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { SharedModule } from '../shared/shared.module';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserprofileComponent,
    EditprofileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
