import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {




  constructor(private _AuthService: AuthService) {}

  ngOnInit(): void {
    this._AuthService.getUserData()
  }

}
