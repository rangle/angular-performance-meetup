import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Tile, tiles } from './tiles';

@Component({
  selector: 'app-root',
  template: `
    <h1>My App</h1>
    <button (click)="changeOne()">Change One</button>
    <p>Now: {{ now | date:'medium' }}</p>
    <app-buffer [tiles]="tiles"></app-buffer>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  tiles: Tile[] = tiles;
  now = new Date();

  ngOnInit() {
    setInterval(() => {
      this.now = new Date();
    }, 100);
  }

  changeOne() {
    // let index = 5;
    // let tile = this.tiles[index];

    // this.tiles = [
    //   ...this.tiles.slice(0, index),
    //   Object.assign({}, tile, {id: 1000}),
    //   ...this.tiles.slice(index + 1)
    // ];

    this.tiles[5].id = 5000;
  }
}
