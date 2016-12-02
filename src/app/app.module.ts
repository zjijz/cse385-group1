import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FeedComponent } from './pages/feed/feed.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReaderComponent } from './pages/reader/reader.component';
import { LoginComponent } from './pages/login/login.component';
import { BookPreviewComponent } from './pages/book-preview/book-preview.component';

// Components
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MaterialCard } from './components/material-card/material-card.component';
import { MaterialInput } from './components/material-input/material-input.component';
import { BookScrollerComponent } from './components/book-scroller/book-scroller.component';

// Directives
import { MdlDirective } from './directives/mdl.directive';

import { BooksService } from "./services/books.service";
import { UsersService } from "./services/users.service";
import { DatabaseService } from './services/database.service';

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
    MdlDirective,
    AppComponent,
    HomeComponent,
    FeedComponent,
    DashboardComponent,
    ReaderComponent,
    LoginComponent,
    BookScrollerComponent,
    BookPreviewComponent,
    SearchBarComponent,
    MaterialCard,
    MaterialInput
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BooksService,
    UsersService,
    DatabaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
