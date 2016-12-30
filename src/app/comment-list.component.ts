import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Comment } from './comment.model';

@Component({
  selector: 'app-comment-list',
  template: `
    <app-comment
      *ngFor="let comment of comments; trackBy: trackById"
      [comment]="comment">
    </app-comment>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent {
  @Input() comments: Comment[] = [];

  trackById(index: number, comment: Comment) {
    return comment.id;
  }
}
