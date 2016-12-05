import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Book } from 'api/models';

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

  constructor() { }

  ngOnInit() { }

  search() {
    console.log('searching...');


  }

}
