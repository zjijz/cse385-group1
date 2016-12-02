import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private email: string;
  private password: string;

  private errString: string = '';

  constructor(private _router: Router, private _us: UsersService) { }

  ngOnInit() { }

  login() {
    console.log('Loggin in...');
    this._us.login(this.email, this.password)
      .then(() => this._router.navigateByUrl('/home'))
      .catch(err => this.errString = err);
  }

}
