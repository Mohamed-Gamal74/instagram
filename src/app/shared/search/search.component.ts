import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class SearchComponent {
  @Input() search: boolean = false;
  allUsers: any[] = [];
  filterdUser: any[] = [];

  constructor(private _SearchService: SearchService) {}

  ngOnInit() {
    this._SearchService.allUsers.subscribe((data) => {
      this.allUsers = data;
    });

    this._SearchService.filterdUser.subscribe((data) => {
      this.filterdUser = data;
    });
  }

  handleSearch(event: any) {
    this._SearchService.handleSearch(event);
  }
}
