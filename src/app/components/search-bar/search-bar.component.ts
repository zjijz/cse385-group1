import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Book } from 'api/models';

import { BooksService } from "../../services/books.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output()
  private isSearching = new EventEmitter<boolean>();

  @Output()
  private books = new EventEmitter<Book[]>();

  private query: string = '';

  constructor(private _bs: BooksService) { }

  ngOnInit() { }

  search() {
    this._bs.fuzzySearch(this.query).then(res => {
      console.log(res);
      this.books.emit(res)
    });
  }

  private onInput(event) {
    this.isSearching.emit(event.target.value != "");

    this.search();
  }

  private onKeyup(event) {
    if (event.keyCode === 13) this.search();
  }

}
