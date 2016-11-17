import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FeedComponent } from './pages/feed/feed.component';
import { LoanScrollerComponent } from './components/loan-scroller/loan-scroller.component';
import { HoldScrollerComponent } from './components/hold-scroller/hold-scroller.component';
import { FeedWidgetComponent } from './components/feed-widget/feed-widget.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReaderComponent } from './pages/reader/reader.component';
import { LoginComponent } from './pages/login/login.component';

import { BooksService } from "./services/books.service";
import { UsersService } from "./services/users.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeComponent,
    FeedComponent,
    LoanScrollerComponent,
    HoldScrollerComponent,
    FeedWidgetComponent,
    SearchBarComponent,
    SearchBarComponent,
    DashboardComponent,
    ReaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    BooksService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
