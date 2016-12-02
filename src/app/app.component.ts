import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router'
import { UsersService } from "./services/users.service";
import { DatabaseService } from "./services/database.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('layout')
  private layout: ElementRef;

  private title = 'The Barbs Library';

  private atLogin: boolean = true;

  constructor(private _router: Router, private _us: UsersService, private _ds: DatabaseService) {
    this._router.events.subscribe((val: Event) => {
      if (val instanceof NavigationEnd) {
        console.log(val);

        this.atLogin = val.url == '/';

        if (this.layout.nativeElement.MaterialLayout.drawer_.className.indexOf('is-visible') != -1) {
          this.layout.nativeElement.MaterialLayout.toggleDrawer();
        }
      }
    });
  }

  ngOnInit() {
    this._ds.loadDB();
  }

  ngOnDestroy() {

  }

  onLogout() {
    console.log('Logout...');

    this._us.logout();
  }
}
