import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from 'api/models';

import { DatabaseService } from './database.service';
import { BooksService } from "./books.service";

@Injectable()
export class UsersService {

  public user: BehaviorSubject<User>;
  private default: User = <User> { email: null, privilege: null, picture: null, first_name: null, last_name: null,
    friends: [], loans: [], holds: [], totalLoans: 0, totalHolds: 0, allTitles: [] };

  private sql = window['SQL'];

  constructor(private _ds: DatabaseService, private _bs: BooksService) {
    this.user = new BehaviorSubject<User>(this.default);
  }

  // Clean results
  private cleanUser(user: Object) {
    let cleanUser: User = { holds: [], loans: [], friends: [] };

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

  private cleanFriend(user: Object) {
    return { email: user['EmailSecond'] };
  }

  // Validate login / get user info
  public login(email: string, password: string): Promise<any> {
    let user: User = {};
    return new Promise<Object>((resolve, reject) => {
      this._ds.queryDB('SELECT * FROM User WHERE Email = $email', { $email: email }).then(acct => {
        if (acct[0]) {
          let account = acct[0];
          if (account.Password == password) {
            user = this.cleanUser(account);

            // Get holds, loans
            this._bs.getUserHolds(email).then(res => {
              user.holds = res;

              this._bs.getUserLoans(email).then(res => {
                user.loans = res;

                // Get friends
                this._ds.queryDB("SELECT EmailSecond FROM Friend WHERE EmailFirst = $email", { $email: email })
                  .then(friends => {
                    friends.forEach(friend => user.friends.push(this.cleanFriend(friend)));

                    this.getTotalHolds(email).then(num => {
                      user.totalHolds = num;

                      this.getTotalLoans(email).then(num => {
                        user.totalLoans = num;

                        // Set new user
                        this.user.next(user);
                      });
                    });
                  });
              });
            });

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

  // Get total number of holds and loans
  private getTotalHolds(email: string): Promise<number> {
    return new Promise<any>((resolve, reject) => {
      this._ds.queryDB("SELECT COUNT(*) FROM Hold WHERE Email = $email GROUP BY Email;", { $email: email })
        .then(res => resolve(res[0]['COUNT(*)']));
    });
  }

  private getTotalLoans(email: string): Promise<number> {
    return new Promise<any>((resolve, reject) => {
      this._ds.queryDB("SELECT COUNT(*) FROM Loan WHERE Email = $email GROUP BY Email;", { $email: email })
        .then(res => resolve(res[0]['COUNT(*)']));
    });
  }

  // Save user update info
  public saveUserName(email: string, fname: string, lname: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._ds.updateDB("UPDATE User SET Fname = $first, Lname = $last WHERE Email = $email",
        { $first: fname, $last: lname, $email: email })
        .then(() => {
          let user: User = {};
          this._ds.queryDB('SELECT * FROM User WHERE Email = $email', { $email: email }).then(accounts => {
            user = this.cleanUser(accounts[0]);

            // Get holds, loans
            this._bs.getUserHolds(email).then(res => {
              user.holds = res;

              this._bs.getUserLoans(email).then(res => {
                user.loans = res;

                // Get friends
                this._ds.queryDB("SELECT EmailSecond FROM Friend WHERE EmailFirst = $email", { $email: email })
                  .then(friends => {
                    friends.forEach(friend => user.friends.push(this.cleanFriend(friend)));

                    this.getTotalHolds(email).then(num => {
                      user.totalHolds = num;

                      this.getTotalLoans(email).then(num => {
                        user.totalLoans = num;

                        // Set new user
                        this.user.next(user);
                      });
                    });
                  });
              });
            });

            resolve(null);
          });
        });
    });
  }

  // Get reviews for all friends a user has
  // Or all reviews on the system if the user is a superuser
  public getAllReviews() {
    
  }

  // Get all reviews on DB (for superuser)

  public logout() {
    // stub
  }
}
