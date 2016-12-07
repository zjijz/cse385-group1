import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from 'api/models';

import { BooksService } from "../../services/books.service";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.scss']
})
export class BookPreviewComponent implements OnInit {

  private book: Book = <Book>{
    _id: null,
    cover: null,
    edition: null,
    file: null,
    isbn: null,
    num_available: null,
    num_copies: null,
    pub_date: null,
    publisher: null,
    summary: null,
    title: null,
    authors: [],
    genres: [],
    hasHold: null,
    hasLoan: null
  }; /*= <Book>{
    _id: 5,
    cover: "assets/covers/5.png",
    edition:
      "Tra Edition",
    file: "assets/books/5.txt",
    isbn: "1466322748",
    num_available: 0,
    num_copies: 6,
    pub_date: "2011-07-12",
    publisher: "CreateSpace Independent",
    summary: "Kafka's masterpiece and best-known work, The Trial tells the story of a man arrested and prosecuted by a remote, inaccessible authority, with the nature of his crime not revealed to him or to the reader.",
    title: "The Trial",
    authors: ['Author 1', 'Author 2'],
    genres: ['Genre 1', 'Genre 2'],
    hasHold: false,
    hasLoan: true
  }*/;

  private authors: string = this.book.authors.join(', ');
  private genres: string = this.book.genres.join(', ');

  constructor(private route: ActivatedRoute, private router: Router, private _us: UsersService, private _bs: BooksService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let bookId = params['bookId'];

      this._bs.getBookInfo(this._us.user.getValue().email, bookId).then(book => {
        this.book = book;
        this.authors = this.book.authors.join(', ');
        this.genres = this.book.genres.join(', ');
      });
    });
  }

  placeOnHold() {
    this._us.putBookOnHold(this.book._id, this._us.user.getValue().email).then(() => {
      this._bs.getBookInfo(this._us.user.getValue().email, this.book._id).then(book => {
        this.book = book;
        this.authors = this.book.authors.join(', ');
        this.genres = this.book.genres.join(', ');
      });
    });
  }

  placeOnLoan() {
    this._us.putBookOnLoan(this.book._id, this._us.user.getValue().email).then(() => {
      this._bs.getBookInfo(this._us.user.getValue().email, this.book._id).then(book => {
        this.book = book;
        this.authors = this.book.authors.join(', ');
        this.genres = this.book.genres.join(', ');
      });
    });
  }

  openReader() {
    this.router.navigateByUrl('/reader/' + this.book._id);
  }

}
