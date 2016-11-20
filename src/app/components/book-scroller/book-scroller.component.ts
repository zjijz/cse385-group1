import { Component, OnInit, Input } from '@angular/core';

import { Book } from 'api/models';

@Component({
  selector: 'app-book-scroller',
  templateUrl: './book-scroller.component.html',
  styleUrls: ['./book-scroller.component.scss']
})
export class BookScrollerComponent implements OnInit {

  @Input()
  private title: String = '';

  @Input()
  private books: Book[];

  constructor() { }

  ngOnInit() {
  }

}
