import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Comment } from './comment.model';

@Injectable()
export class CommentService {
  url = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: Http) {}

  getCommentList(): Observable<Comment> {
    return this.http.get(this.url).map(data => data.json());
  }
}

