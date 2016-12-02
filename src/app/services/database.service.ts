import { Injectable } from '@angular/core';

@Injectable()
export class DatabaseService {

  private sql: any = window['SQL'];

  public db: any;

  constructor() { }

  loadDB() {
    console.log('Loading db...');

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'assets/test.db', true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = (evt: any) => {
      let arr = new Uint8Array(evt.target.response);
      this.db = new this.sql.Database(arr);
    };

    xhr.send();
  }

  queryDB(query: string, params?: Object): any[] {
    let results: any[] = [];
    this.db.each(query, params, item => results.push(item));
    return results;
  }

  updateDB(query: string, params: Object) {
    this.db.run(query, params);
  }
}
