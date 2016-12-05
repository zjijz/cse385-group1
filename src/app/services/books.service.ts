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

    cleanBook.authors = [];

    cleanBook.hasHold = false;
    cleanBook.hasLoan = false;

    return cleanBook;
  }

  // Get Book by BookId
  public getBookInfo(email: string, bookId: number): Promise<Book> {
    return new Promise<Book>((resolve, reject) => {
      this._ds.queryDB("SELECT * FROM BookView WHERE BookId = $bookId", { $bookId: bookId })
        .then(res => {
          let book: Book = this.cleanBook(res[0]);

          // Get Authors
          this._ds.queryDB("SELECT * FROM Author WHERE BookId = $bookId", { $bookId: bookId }).then(authors => {
            console.log('authors: ', authors);
            authors.forEach(el => {
              book.authors.push(el['Fname'] + ' ' + el['Lname'])
            });

            // Get genres

            // Get loan info
            this._ds.queryDB("SELECT * FROM Loan WHERE BookId = $bookId AND Email = $email AND EndDate >= DATE('now')",
              { $bookId: bookId, $email: email })
              .then(res => {
                if (res.length != 0) book.hasLoan = true;

                // Get hold info
                this._ds.queryDB("SELECT * FROM Hold WHERE BookId = $bookId AND Email = $email AND EndDate >= DATE('now')",
                  { $bookId: bookId, $email: email })
                .then(res => {
                  if (res.length != 0) book.hasHold = true;

                  resolve(book);
                });
              });
          });
        });
    });
  }

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
  public fuzzySearch(query: string): Promise<Book[]> {
    return new Promise<Book[]>((resolve, reject) => {
      let s =
        "SELECT DISTINCT BookId, Title, Cover FROM Book " +
        "WHERE Title LIKE '$search' OR Publisher LIKE '$search' OR PubDate LIKE '$search' " +
        "UNION " +
        "SELECT DISTINCT BookId, Title, Cover FROM Book NATURAL JOIN Author " +
        "WHERE Fname LIKE '$search' OR Lname LIKE '$search' " +
        "UNION " +
        "SELECT DISTINCT BookId, Title, Cover FROM Book NATURAL JOIN BookGenre NATURAL JOIN Genre " +
        "WHERE GenreName LIKE '$search'";
      this._ds.queryDB(s.replace(/\$search/g, '%' + query + '%'))
      .then(res => {
          let ret: Book[] = [];
          res.forEach(el => ret.push(this.cleanBook(el)));
          resolve(ret);
      });
    });
  }

}
