import { Injectable } from '@angular/core';

@Injectable()
export class DatabaseService {

  private sql: any = window['SQL'];

  public db: any;

  constructor() { }

  loadDB() {
    console.log('Loading db...');

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'assets/test.txt', true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = (evt: any) => {
      let arr = new Uint8Array(evt.target.response);
      this.db = new this.sql.Database(arr);
    };

    xhr.send();
  }

  queryDB(query: string, params?: Object): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      let results: any[] = [];
      this.db.each(query, params, item => results.push(item));
      resolve(results);
    });
  }

  updateDB(query: string, params: Object): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.run(query, params);
      resolve(null);
    });
  }
}
