import { Injectable } from '@angular/core';

import { Book } from 'api/models';

import { DatabaseService } from "./database.service";

@Injectable()
export class BooksService {

  constructor(private _ds: DatabaseService) { }

  // Clean
  private cleanBook(book: Object): Book {
    let cleanBook: Book = {};

    if (book['BookId']) {
      cleanBook._id = parseInt(book['BookId']);
    }

    if (book['ISBN']) {
      cleanBook.isbn = book['ISBN'];
    }

    if (book['Title']) {
      cleanBook.title = book['Title'];
    }

    if (book['Edition']) {
      cleanBook.edition = book['Edition'];
    }

    if (book['Publisher']) {
      cleanBook.publisher = book['Publisher'];
    }

    if (book['PubDate']) {
      cleanBook.pub_date = book['PubDate'];
    }

    if (book['Summary']) {
      cleanBook.summary = book['Summary'];
    }

    if (book['File']) {
      cleanBook.file = book['File'];
    }

    if (book['Cover']) {
      cleanBook.cover = book['Cover'];
    }

    if (book['NumCopies']) {
      cleanBook.num_copies = parseInt(book['NumCopies']);
    }

    if (book['NumAvailable']) {
      cleanBook.num_available = parseInt(book['NumAvailable']);
    }

    return cleanBook;
  }

  // Get Book by BookId

  // Get user loans
  public getUserLoans(email: string): Promise<Book[]> {
    return new Promise<Book[]>((resolve, reject) => {
      this._ds.queryDB("SELECT BookId, Title, Cover FROM Book NATURAL JOIN (SELECT BookId FROM Loan " +
        "WHERE Email = $email AND EndDate > DATE('now'))", { $email: email })
        .then(results => {
          let ret: Book[] = [];
          results.forEach(el => ret.push(this.cleanBook(el)));
          resolve(ret);
        });
    });
  }

  // Get user holds
  public getUserHolds(email: string): Promise<Book[]> {
    return new Promise<Book[]>((resolve, reject) => {
      this._ds.queryDB("SELECT BookId, Title, Cover FROM Book NATURAL JOIN (SELECT BookId FROM Hold " +
        "WHERE Email = $email AND EndDate > DATE('now'))", { $email: email })
        .then(results => {
          let ret: Book[] = [];
          results.forEach(el => ret.push(this.cleanBook(el)));
          resolve(ret);
        });
    });
  }

  // Fuzzy search (search LIKE in title, author, publisher, date and merge them)

  // Get hold info by BookId

  // Get loan info by BookId

}
