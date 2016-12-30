import { Component, Input, Output, EventEmitter, OnChanges, DoCheck, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <button (click)="signalActivation()">{{ id }}</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements DoCheck, AfterViewInit {
  @Input() id: number;
  @Output() activate = new EventEmitter<void>();
  @Output() checked = new EventEmitter<void>();

  private isReady = false;

  ngDoCheck() {
    console.log(`${this.id} was checked: ${this.isReady}`);
    if (this.isReady) {
      this.checked.emit();
    }
  }
  ngAfterViewInit() {
    this.isReady = true;
  }
  signalActivation() {
    this.activate.emit();
  }
}
