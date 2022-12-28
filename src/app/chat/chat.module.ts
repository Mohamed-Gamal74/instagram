import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat/chat.component';
import { SharedModule } from '../shared/shared.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';



@NgModule({
  declarations: [
    ChatComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule,
    PickerModule
  ]
})
export class ChatModule { }
