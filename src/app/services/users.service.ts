import { Injectable } from '@angular/core';

import { User } from 'api/models';

@Injectable()
export class UsersService {

  public user: User;

  constructor() {
    this.user = <User> { email: null, privilege: null, picture: null, first_name: null, last_name: null,
                    friends: [], loans: [], holds: [] };
  }

  // Validate login

  // Get user info

}
