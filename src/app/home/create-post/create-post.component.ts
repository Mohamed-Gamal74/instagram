import { Component } from '@angular/core';
import { PostService } from '../post.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [animate(200)]),
    ]),
  ],
})
export class CreatePostComponent {
  selectedImg = '';
  captionValue = '';


  constructor(private _PostService: PostService) {}

  ngOnInit(): void {}

  closeOverlay() {
    this._PostService.showPostOverlayFn();
  }

  imgChangeHandler(event: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImg = reader.result as string;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  createPostHandler(event: any) {
    if (this.selectedImg == '') return;
    else {
      this._PostService.createPost({
        img: this.selectedImg,
        caption: this.captionValue,
      });
      this._PostService.showPostOverlayFn();
    }
  }

  captionHandler(event: any) {
    this.captionValue = event.target.value;
  }

  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger',
  ];
  set = 'twitter';
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    this.captionValue = `${this.captionValue}${event.emoji.native}`;

    // this.showEmojiPicker = false;
  }
}
