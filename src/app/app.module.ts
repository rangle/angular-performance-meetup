import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CommentListComponent } from './comment-list.component';
import { CommentComponent } from './comment.component';
import { CommentService } from './comment.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [
    CommentService,
  ],
  declarations: [
    AppComponent,
    CommentListComponent,
    CommentComponent,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
