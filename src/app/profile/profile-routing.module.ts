import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {
    path: '',
    component: UserprofileComponent,
    canActivate: [AuthGuard],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
