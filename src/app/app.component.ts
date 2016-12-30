import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';

import { CommentService } from './comment.service';
import { Comment } from './comment.model';

@Component({
  selector: 'app-root',
  template: `
    <h1>My App</h1>
    <p>Current Time: {{ time | date: 'medium' }}</p>
    <app-comment-list [comments]="comments$ | async"></app-comment-list>
  `
})
export class AppComponent implements OnInit {
  time = new Date();
  comments$: Observable<Comment>;

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.comments$ = this.commentService.getCommentList();
    setInterval(() => {
      this.time = new Date();
    }, 100);
  }
}
