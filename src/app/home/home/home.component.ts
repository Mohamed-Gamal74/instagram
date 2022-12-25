import { Component } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  showPostOverlay = false;
  constructor(private _PostService: PostService) {}

  ngOnInit(): void {
    this._PostService.showPostOverlay.subscribe((data) => {
      this.showPostOverlay = data;
    });
  }
}
