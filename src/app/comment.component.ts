import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Comment } from './comment.model';

@Component({
  selector: 'app-comment',
  styles: [`
    :host {
      display: block;
      border: 1px solid black;
      margin-bottom: 10px;
      padding: 10px;
    }
    span { display: block }
  `],
  template: `
    <span><strong>Post ID:</strong> {{ comment?.postId }}<span>
    <span><strong>ID:</strong> {{ comment?.id }}<span>
    <span><strong>Name:</strong> {{ comment?.name }}<span>
    <span><strong>Email:</strong> {{ comment?.email }}<span>
    <span><strong>Body:</strong> {{ comment?.body }}<span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
  @Input() comment: Comment;
}
