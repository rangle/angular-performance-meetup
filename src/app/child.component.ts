import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
  OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy  } from '@angular/core';

import { Tile } from './tiles';

@Component({
  selector: 'app-child',
  template: `
    <button (click)="change()">{{ tile.id }}</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() tile: Tile;

  change() {
    this.tile.id = 2000;
  }

  ngOnChanges() {
    console.log(`${this.tile.id} ngOnChanges`);
  }

  ngOnInit() {
    console.log(`${this.tile.id} ngOnInit`);
  }

  ngDoCheck() {
    console.log(`${this.tile.id} was checked`);
  }

  ngAfterContentInit() {
    console.log(`${this.tile.id} ngAfterContentInit`);
  }

  ngAfterContentChecked() {
    console.log(`${this.tile.id} ngAfterContentChecked`);
  }

  ngAfterViewInit() {
    console.log(`${this.tile.id} ngAfterViewInit`);
  }

  ngAfterViewChecked() {
    console.log(`${this.tile.id} ngAfterViewChecked`);
  }

  ngOnDestroy() {
    console.log(`${this.tile.id} ngOnDestroy`);
  }
}
