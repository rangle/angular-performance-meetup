import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Tile, tiles } from './tiles';

@Component({
  selector: 'app-root',
  template: `
    <h1>My App</h1>
    <button (click)="deactivateAll()">Deactivate All</button>
    <button (click)="changeOne()">Change One</button>

    <div>
      <app-child 
        *ngFor="let tile of tiles; trackBy: trackById" 
        [id]="tile.id"
        [ngClass]="{
          active: tile.isActive,
          checked: tile.wasChecked
        }"
        (activate)="tile.isActive = true"
        (checked)="wasChecked(tile)"
        >
      </app-child>
    <div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  tiles: Tile[] = tiles;

  trackById(index, tile) {
    console.log('track');
    return tile.id;
  }

  wasChecked(tile: Tile) {
    tile.wasChecked = true;
  }

  changeOne() {
    this.tiles[5].isActive = true;
  }

  deactivateAll() {
    this.tiles = this.tiles.map((tile: Tile) => {
      return Object.assign({}, tile, {isActive: false, wasChecked: false});
    });
  }
}
