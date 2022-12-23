import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SidbarComponent } from './sidbar/sidbar.component';
import { AsideComponent } from './aside/aside.component';
import { StoryComponent } from './story/story.component';
import { PostComponent } from './post/post.component';
import { SwiperModule } from 'swiper/angular';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  declarations: [
    HomeComponent,
    SidbarComponent,
    AsideComponent,
    StoryComponent,
    PostComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SwiperModule
  ]
})
export class HomeModule { }
