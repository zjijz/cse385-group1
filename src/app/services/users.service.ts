import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User, Review, Book } from 'api/models';

import { DatabaseService } from './database.service';
import { BooksService } from "./books.service";

@Injectable()
export class UsersService {

  public user: BehaviorSubject<User>;
  public reviews: Review[];

  private default: User = <User> { email: null, privilege: null, picture: null, first_name: null, last_name: null,
    friends: [], loans: [], holds: [], totalLoans: 0, totalHolds: 0, availToReview: [] };

  private sql = window['SQL'];

  constructor(private _ds: DatabaseService, private _bs: BooksService) {
    this.user = new BehaviorSubject<User>(this.default);
    this.reviews = [];
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

  private cleanReview(review: Object) {
    let cleanReview: Review = {};

    if (review['Rating']) {
      cleanReview.rating = review['Rating'];
    }

    if (review['Words']) {
      cleanReview.words = review['Words'];
    }

    cleanReview.user = this.cleanUser(review);

    let book: Book = {};

    if (review['BookId']) {
      book._id = review['BookId'];
    }

    if (review['Cover']) {
      book.cover = review['Cover'];
    }

    if (review['Title']) {
      book.title = review['Title'];
    }

    cleanReview.book = book;

    return cleanReview;
  }

  public getUser(email: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      let user: User = {};
      this._ds.queryDB('SELECT * FROM User WHERE Email = $email', {$email: email}).then(accounts => {
        user = this.cleanUser(accounts[0]);

        // Get holds, loans
        this._bs.getUserHolds(email).then(res => {
          user.holds = res;

          this._bs.getUserLoans(email).then(res => {
            user.loans = res;

            // Get friends
            this._ds.queryDB("SELECT EmailSecond FROM Friend WHERE EmailFirst = $email", {$email: email})
              .then(friends => {
                friends.forEach(friend => user.friends.push(this.cleanFriend(friend)));

                this.getTotalHolds(email).then(num => {
                  user.totalHolds = num;

                  this.getTotalLoans(email).then(num => {
                    user.totalLoans = num;

                    this._bs.getBooksToReview(email).then(bks => {
                      user.availToReview = bks;

                      // Get reviews Async
                      this.getAllReviews(this.user.getValue()).then(res => this.reviews = res);

                      // Resolve
                      resolve(user);
                    });
                  });
                });
              });
          });
        });
      });
    });
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

                        this._bs.getBooksToReview(email).then(bks => {
                          user.availToReview = bks;

                          // Set new user
                          this.user.next(user);

                          // Get reviews Async
                          this.getAllReviews(this.user.getValue()).then(res => this.reviews = res);

                          resolve(null);
                        });
                      });
                    });
                  });
              });
            });
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
      this._ds.queryDB("SELECT COUNT(*) FROM Hold WHERE Email = $email GROUP BY Email", { $email: email })
        .then(res => {
          if (res[0] && res['COUNT(*)']) {
            resolve(res[0]['COUNT(*)'])
          } else {
            resolve(0);
          }
        });
    });
  }

  private getTotalLoans(email: string): Promise<number> {
    return new Promise<any>((resolve, reject) => {
      this._ds.queryDB("SELECT COUNT(*) FROM Loan WHERE Email = $email GROUP BY Email", { $email: email })
        .then(res => {
          if (res[0] && res['COUNT(*)']) {
            resolve(res[0]['COUNT(*)'])
          } else {
            resolve(0);
          }
        });
    });
  }

  // Save user update info
  public saveUserName(email: string, fname: string, lname: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._ds.updateDB("UPDATE User SET Fname = $first, Lname = $last WHERE Email = $email",
        { $first: fname, $last: lname, $email: email })
        .then(() => {
          this.getUser(email).then(user => {
            this.user.next(user);
            resolve(null);
          });
        });
    });
  }

  // Get reviews for all friends a user has
  // Or all reviews on the system if the user is a superuser
  public getAllReviews(user: User): Promise<Review[]> {
    return new Promise<Review[]>((resolve, reject) => {
      let reviews: Review[] = [];
      const query = ((user.privilege == 1)
        ? "SELECT BookId, Cover, Title, Email, Fname, Lname, Rating, Words, DateAdded " +
          "FROM Review NATURAL JOIN Book NATURAL JOIN User " +
          "ORDER BY DateAdded DESC"
        : "SELECT BookId, Cover, Title, Email, Fname, Lname, Rating, Words, DateAdded " +
          "FROM Review NATURAL JOIN Book NATURAL JOIN User " +
          "WHERE Email IN (SELECT EmailSecond FROM Friend WHERE EmailFirst = $email) OR Email = $email " +
          "ORDER BY DateAdded DESC").replace(/\$email/g, "'" + user.email + "'");
      this._ds.queryDB(query).then(res => res.forEach(review => {
        reviews.push(this.cleanReview(review));
        resolve(reviews);
      }));
    });
  }

  // Get all reviews on DB (for superuser)

  public logout(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.user.next(this.default);
      resolve(null);
    });
  }

  public addReview(email: string, bookId: number, rating: number, review: string): Promise<any> {
    return new Promise<any>((resolve, reject) =>
      this._ds.updateDB("INSERT INTO Review VALUES ( $bookId, $email, $rating, $review, DATE('now') )",
        { $bookId: bookId, $email: email, $rating: rating, $review: review})
        .then(() => {
          this.getAllReviews(this.user.getValue()).then(reviews => {
            let rvs: Review[] = [];
            reviews.forEach(review => rvs.push(this.cleanReview(review)));
            this.reviews = rvs;

            let user: User = this.user.getValue();
            this._bs.getBooksToReview(email).then(books => {
              user.availToReview = books;

              this.user.next(user);

              resolve(null);
            });
          });
        })
    );
  }

  public deleteReview(email: string, bookId: number): Promise<any> {
    return new Promise<any>((resolve, reject) =>
      this._ds.updateDB("DELETE FROM Review WHERE BookId = $bookId AND Email = $email",
        { $email: email, $bookId: bookId })
      .then(() => {
        this.getAllReviews(this.user.getValue()).then(reviews => {
          console.log('Reviews: ', reviews);

          let rvs: Review[] = [];
          reviews.forEach(review => rvs.push(this.cleanReview(review)));
          this.reviews = rvs;

          let user: User = this.user.getValue();
          this._bs.getBooksToReview(email).then(books => {
            user.availToReview = books;

            this.user.next(user);

            resolve(null);
          });
        });
      })
    );
  }
}
