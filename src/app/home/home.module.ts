import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { AsideComponent } from './aside/aside.component';
import { PostComponent } from './post/post.component';
import { SwiperModule } from 'swiper/angular';
import { CreatePostComponent } from './create-post/create-post.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    AsideComponent,
    PostComponent,
    CreatePostComponent,
    SkeletonComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SwiperModule,
    PickerModule,
    SharedModule,
  ],
})
export class HomeModule {}
