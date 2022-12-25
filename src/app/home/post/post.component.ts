import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  posts: any = [];
  user: any = {};
  liked: boolean = false;
  showDeleteOverlay: boolean = false;

  constructor(
    private _PostService: PostService,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    // get all posts
    this._PostService.allPosts.subscribe((posts) => {
      this.posts = posts;
    });
    // get current user
    this._AuthService.currentUserData.subscribe((data) => {
      this.user = data;
    });

    // get liked status
    this._PostService.liked.subscribe((data) => {
      this.liked = data;
    });
  }

  // handle like
  handleLike(post: any) {
    this._PostService.handleLike(post);
  }

  // handle comment
  handleComm(post: any, event: any) {
    if (event.target.value !== '') {
      this._PostService.handleComment(post, event.target.value);
      event.target.value = '';
    }
  }

  // handle delete
  deleteHandler(post: any) {
    this._PostService.deletePost(post);
  }
}
