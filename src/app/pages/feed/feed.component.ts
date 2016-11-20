import { Component, OnInit } from '@angular/core';

import { Review, Book, User } from "api/models";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  private availReview = [
    {
      book_id: 0,
      book_title: 'The Odds of Loving Grover Cleveland'
    },
    {
      book_id: 1,
      book_title: 'Life and Death'
    }
  ];

  private reviews: Review[] = [
    <Review> {
      book: <Book> {
        title: 'The Odds of Loving Grover Cleveland'
      },
      rating: 5,
      words: 'This is a review',
      user: <User> {
        first_name: 'Greg',
        last_name: 'Pataky'
      }
    }
  ];

  private showNew: boolean = false;
  private isEdited: boolean = false;

  constructor() { }

  ngOnInit() { }

  getRatingArr(review: Review): string[] {
    let ret = [];
    for (let i = 0; i < review.rating; i++)
      ret.push('' + i);
    return ret;
  }

}
