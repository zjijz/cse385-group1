import { Component, OnInit } from '@angular/core';

import { Book } from 'api/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private holds: Book[] = [
    /*<Book> {
      _id: 0,
      title: 'The Odds of Loving Grover Cleveland',
      edition: '1',
      file: 'assets/books/0.txt',
      cover: 'assets/covers/0.png',
      authors: ['Test 1', 'Test 2'],
      genres: ['Fiction', 'Romance']
    },
    <Book> {
      _id: 1,
      title: 'Life and Death',
      edition: '1',
      file: 'assets/books/1.txt',
      cover: 'assets/covers/1.png',
      authors: ['Test 1'],
      genres: ['Fiction', 'Romance', 'Horror']
    },
    <Book> {
      _id: 0,
      title: 'The Odds of Loving Grover Cleveland',
      edition: '1',
      file: 'assets/books/0.txt',
      cover: 'assets/covers/0.png',
      authors: ['Test 1', 'Test 2'],
      genres: ['Fiction', 'Romance']
    },
    <Book> {
      _id: 1,
      title: 'Life and Death',
      edition: '1',
      file: 'assets/books/1.txt',
      cover: 'assets/covers/1.png',
      authors: ['Test 1', 'Test 2'],
      genres: ['Fiction', 'Romance', 'Horror']
    },
    <Book> {
      _id: 0,
      title: 'The Odds of Loving Grover Cleveland',
      edition: '1',
      file: 'assets/books/0.txt',
      cover: 'assets/covers/0.png',
      authors: ['Test 1', 'Test 2'],
      genres: ['Fiction', 'Romance']
    },
    <Book> {
      _id: 1,
      title: 'Life and Death',
      edition: '1',
      file: 'assets/books/1.txt',
      cover: 'assets/covers/1.png',
      authors: ['Test 1', 'Test 2'],
      genres: ['Fiction', 'Romance', 'Horror']
    },
    <Book> {
      _id: 0,
      title: 'The Odds of Loving Grover Cleveland',
      edition: '1',
      file: 'assets/books/0.txt',
      cover: 'assets/covers/0.png',
      authors: ['Test 1', 'Test 2'],
      genres: ['Fiction', 'Romance']
    },
    <Book> {
      _id: 1,
      title: 'Life and Death',
      edition: '1',
      file: 'assets/books/1.txt',
      cover: 'assets/covers/1.png',
      authors: ['Test 1', 'Test 2'],
      genres: ['Fiction', 'Romance', 'Horror']
    }*/
  ];
  private loans: Book[] = [
    /*<Book> {
      _id: 0,
      title: 'The Odds of Loving Grover Cleveland',
      edition: '1',
      file: 'assets/books/0.txt',
      cover: 'assets/covers/0.png',
      authors: ['Test 1', 'Test 2'],
      genres: ['Fiction', 'Romance']
    },
    <Book> {
      _id: 1,
      title: 'Life and Death',
      edition: '1',
      file: 'assets/books/1.txt',
      cover: 'assets/covers/1.png',
      authors: ['Test 1', 'Test 2'],
      genres: ['Fiction', 'Romance', 'Horror']
    }*/
  ];

  constructor() { }

  ngOnInit() {

  }
}
