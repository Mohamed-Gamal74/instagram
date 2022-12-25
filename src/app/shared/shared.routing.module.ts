import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'profile/:id',
    loadChildren: () =>
      import('../profile/profile.module').then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
