import { Injectable } from '@angular/core';

import { User } from 'api/models';

import { DatabaseService } from './database.service';

@Injectable()
export class UsersService {

  public user: User;

  private sql = window['SQL'];

  constructor(private _ds: DatabaseService) {
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
  public login(email: string, password: string): Promise<Object> {
    return new Promise<Object>((resolve, reject) => {
      this._ds.queryDB('SELECT * FROM User WHERE Email = $email', { $email: email }).then(acct => {
        if (acct[0]) {
          const user = acct[0];
          if (user.Password == password) {
            this.user = this.cleanUser(user);

            // Get holds, loans

            // Get friends

            resolve(null);
          } else {
            reject('Username and password do not match.');
          }
        } else {
          reject('Username does not exists.');
        }
      });
    });
  }

  // Get reviews for all friends a user has

  // Get all reviews on DB (for superuser)

  public logout() {
    // stub
  }
}
