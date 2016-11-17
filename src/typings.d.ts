// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;

declare module 'api/models' {
  interface Book {
    _id?: number;
    isbn?: string;
    title?: string;
    edition?: string;
    publisher?: string;
    pub_date?: number; // milliseconds from epoch
    summary?: string;
    file?: string; // relative path to book contents
    cover?: string; // relative path to book cover img
    num_copies?: number;
    num_available?: number;
    authors: Author[];
    genres: BookGenre[];
  }

  interface Author {
    first_name?: string;
    last_name?: string;
  }

  interface BookGenre {
    _id?: number;
    name?: string;
  }

  interface Hold {
    book?: Book;
    start_date?: number;
    end_date?: number;
  }

  interface Loan {
    book?: Book;
    start_date?: number;
    end_date?: number;
  }

  interface Review {
    book?: Book;
    rating?: number;
    words?: string;
  }

  interface User {
    holds?: Hold[];
    loans?: Loan[];
    email?: string;
    privilege?: number;
    picture?: string;
    first_name?: string;
    last_name?: string;
    friends: User[];
  }
}
