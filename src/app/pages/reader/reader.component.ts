import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {

  private text: string = 'Loading...';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let request = new XMLHttpRequest();
      request.open("GET", 'assets/books/' + params['bookId'] + '.txt');
      request.onload = (evt: any) => this.text = evt.target.responseText;
      request.send();
    });
  }

}
