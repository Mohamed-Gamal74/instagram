import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';

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
  search: boolean = false;
  recentSearch: any[] = [];
  filterdUser: any[] = [];

  constructor(private _SearchService: SearchService, private _Router: Router) {}

  ngOnInit() {
    this._SearchService.showSearch.subscribe((data) => {
      this.search = data;
    });
    this._SearchService.getRecentSearch();
    this._SearchService.recentSearch.subscribe((data) => {
      this.recentSearch = data;
    });

    this._SearchService.filterdUser.subscribe((data) => {
      this.filterdUser = data;
    });
  }

  handleSearch(event: any) {
    this._SearchService.handleSearch(event);
  }

  async handleRoute(id: string, user: any) {
    this._SearchService.handleRecentSearch(user);
    this._Router.navigate(['/profile', id]);
    this._SearchService.showSearch.next(false);
    this._SearchService.filterdUser.next([]);
  }
}
