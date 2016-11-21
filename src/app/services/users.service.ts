import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'api/models';

let SQL: any;

@Injectable()
export class UsersService {

  public user: User;

  constructor(private _router: Router) {
    this.user = <User> { email: null, privilege: null, picture: null, first_name: null, last_name: null,
                    friends: [], loans: [], holds: [] };
  }

  // Validate login / get user info
  public login(email: string, password: string) {
    console.log(SQL);

    this._router.navigateByUrl('/home');
  }

  // Get reviews for all friends a user has

  // Get all reviews on DB (for superuser)

  public logout() {
    this._router.navigateByUrl('/');
  }
}
