import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'api/models';

import { DatabaseService } from './database.service';

@Injectable()
export class UsersService {

  public user: User;

  private sql = window['SQL'];

  constructor(private _router: Router, private _ds: DatabaseService) {
    this.user = <User> { email: null, privilege: null, picture: null, first_name: null, last_name: null,
                    friends: [], loans: [], holds: [] };
  }

  // Clean results
  private cleanUser(user: Object) {
    let cleanUser: User = {};

    if (user['Email']) {
      cleanUser.email = user['Email'];
    }

    if (user['Fname']) {
      cleanUser.first_name = user['Fname'];
    }

    if (user['Lname']) {
      cleanUser.last_name = user['Lname'];
    }

    if (user['Picture']) {
      cleanUser.picture = user['Picture'];
    }

    if (user['PrivId']) {
      cleanUser.privilege = parseInt(user['PrivId']);
    }

    return cleanUser;
  }

  // Validate login / get user info
  public login(email: string, password: string) {
    const acct = this._ds.queryDB('SELECT * FROM User WHERE Email = $email', { $email: email });

    if (acct[0]) {
      const user = acct[0];
      if (user.Password == password) {
        this.user = this.cleanUser(user);
      } else {
        // Password mismatch error
      }
    } else {
      // Email doesn't exist error
    }

    //this._router.navigateByUrl('/home');
  }

  // Get reviews for all friends a user has

  // Get all reviews on DB (for superuser)

  public logout() {
    this._router.navigateByUrl('/');
  }
}
