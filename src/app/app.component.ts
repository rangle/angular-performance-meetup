import { Component } from '@angular/core';

import { Tile, tiles } from './tiles';

@Component({
  selector: 'app-root',
  template: `
    <h1>My App</h1>
    <button (click)="changeOne()">Change One</button>

    <div>
      <app-child 
        *ngFor="let tile of tiles" 
        [tile]="tile">
      </app-child>
    <div>
  `
})
export class AppComponent {
  tiles: Tile[] = tiles;
  changeOne() {
    this.tiles[1].id = 100000;
  }
}
