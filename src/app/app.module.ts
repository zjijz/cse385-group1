import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

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
import { BookPreviewComponent } from './pages/book-preview/book-preview.component';

import { BooksService } from "./services/books.service";
import { UsersService } from "./services/users.service";
import { MdlDirective } from './directives/mdl.directive';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'reader/:bookId', component: ReaderComponent },
  { path: 'preview/:bookId', component: BookPreviewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedComponent,
    LoanScrollerComponent,
    HoldScrollerComponent,
    FeedWidgetComponent,
    SearchBarComponent,
    DashboardComponent,
    ReaderComponent,
    LoginComponent,
    BookPreviewComponent,
    MdlDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BooksService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
