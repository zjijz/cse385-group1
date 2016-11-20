import { Component, OnInit } from '@angular/core';

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
  private numHolds: number;

  private isEdited: boolean = false;

  constructor() { }

  ngOnInit() { }

}
