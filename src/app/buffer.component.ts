import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Tile } from './tiles';

@Component({
  selector: 'app-buffer',
  template: `
    <app-child 
      *ngFor="let tile of tiles" 
      [tile]="tile">
    </app-child>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class BufferComponent {
  @Input() tiles: Tile[];
}
