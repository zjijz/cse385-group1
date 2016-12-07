import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Review, Book, User } from "api/models";

import { UsersService } from "../../services/users.service";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  private availReview = [
    <Book> {
      _id: 0,
      title: 'The Odds of Loving Grover Cleveland'
    },
    <Book> {
      _id: 1,
      title: 'Life and Death'
    }
  ];

  private reviews: Review[] = [
    <Review> {
      book: <Book> {
        _id: 1,
        title: 'The Odds of Loving Grover Cleveland'
      },
      rating: 5,
      words: 'This is a review',
      user: <User> {
        email: 'johndoe@email.com',
        first_name: 'Greg',
        last_name: 'Pataky'
      }
    }
  ];

  private showNew: boolean = false;
  private isEdited: boolean = false;

  @ViewChild('book')
  private bookElement: ElementRef;

  @ViewChild('rating')
  private ratingElement: ElementRef;

  @ViewChild('review')
  private reviewElement: ElementRef;

  constructor(private _us: UsersService) { }

  ngOnInit() {
    console.log(this._us.reviews);
  }

  getRatingArr(review: Review): string[] {
    let ret = [];
    for (let i = 0; i < review.rating; i++)
      ret.push('' + i);
    return ret;
  }

  addReview() {
    this._us.addReview(this._us.user.getValue().email,
                       parseInt(this.bookElement.nativeElement.value),
                       parseInt(this.ratingElement.nativeElement.value),
                       this.reviewElement.nativeElement.value);
  }

  deleteReview(email: string, bookId: number) {
    console.log(email, bookId);
  }
}
