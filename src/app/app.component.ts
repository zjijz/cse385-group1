import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router'
import { UsersService } from "./services/users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('layout')
  private layout: ElementRef;

  private title = 'The Barbs Library';

  private atLogin: boolean = true;

  constructor(private _router: Router, private _us: UsersService) {
    this._router.events.subscribe((val: Event) => {
      if (val instanceof NavigationEnd) {
        console.log(val);

        if (this.layout.nativeElement.MaterialLayout.drawer_.className.indexOf('is-visible') != -1) {
          this.layout.nativeElement.MaterialLayout.toggleDrawer();
        }
      }
    });
  }

  onLogout() {
    console.log('Logout...');

    this._us.logout();
  }
}
