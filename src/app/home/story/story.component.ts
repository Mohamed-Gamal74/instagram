import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent {

  constructor(private _AuthService: AuthService) {}

  ngOnInit(): void {

  }
}
