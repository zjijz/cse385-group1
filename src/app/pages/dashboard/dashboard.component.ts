import { Component, OnInit } from '@angular/core';

import { UsersService } from "../../services/users.service";

import { User } from 'api/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private email: string;
  private picture: string;
  private fname: string;
  private lname: string;
  private numFriends: number;
  private numLoans: number;
  private currLoans: number;
  private numHolds: number;
  private currHolds: number;

  private isEdited: boolean = false;

  constructor(private _us: UsersService) { }

  ngOnInit() {
    this._us.user.subscribe((user: User) => {
      console.log(user);

      this.email = user.email;
      this.fname = user.first_name;
      this.lname = user.last_name;
      this.numFriends = user.friends.length;
      this.currHolds = user.holds.length;
      this.currLoans = user.loans.length;
      this.numLoans = user.totalLoans;
      this.numHolds = user.totalHolds;
    });
  }

  private onSave() {
    this._us.saveUserName(this.email, this.fname, this.lname);
  }

}
