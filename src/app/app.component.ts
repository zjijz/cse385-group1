import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private title = 'The Barbs Library';

  private atLogin: boolean = true;

  constructor(private _router: Router) {
    this._router.events.subscribe((val: Event) => {
      if (val instanceof NavigationEnd) {
        console.log(val);
      }
    });
  }

  onLogout() {
    console.log('Logout...');
  }
}
