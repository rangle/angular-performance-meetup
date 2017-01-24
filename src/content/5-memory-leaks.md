# Memory Leaks

# Rangle.io

---

## What's Memory Leak?

The increase of memory usage over time

![Memory Leak](content/images/memory-leak.png)
<!-- .element: style="width: 1000px" -->

---

## What Causes Memory Leaks in Angular?

Main Source => Subscriptions to observables never closed

```ts
@Injectable()
export class WorkshopService {
  getAll(): Observable<Workshop[]> { ... }
}
```

```ts
@Component({
  selector: 'rio-workshop-list',
  template: `
    <div *ngFor="let workshop of workshops">
      {{ workshop.title }}
    </div>`
})
export class WorkshopListComponent implements OnInit {
  ...
  ngOnInit() {
    this.service.getAll().subscribe(workshops => this.workshops = workshops);
  }
}
```

---

## Manually Closing Connections

Before the element is destroyed, close the connection

```ts
@Component({
  selector: 'rio-workshop-list',
  template: `
    <div *ngFor="let workshop of workshops">
      {{ workshop.title }}
    </div>`
})
export class WorkshopListComponent implements OnInit, OnDestroy {
  ...
  ngOnInit() {
    this.subscription = this.service.getAll()
      .subscribe(workshops => this.workshops = workshops);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

---

## The `async` Pipe

It closes the connection automatically when the component is destroyed

```ts
@Component({
  selector: 'rio-workshop-list',
  template: `
    <div *ngFor="let workshop of workshops$ | async">
      {{ workshop.title }}
    </div>`
})
export class WorkshopListComponent implements OnInit {
  ngOnInit() {
    this.workshops$ = this.service.getAll();
  }
}
```

This is the recommended way of dealing with Observables in your template!

---

## The `Http` Service

- Every method of the `http` services (`get`, `post`, etc.) returns an observable
- Those observables emit only one value and the connection is closed automatically
- They won't cause memory leak issues

```ts
@Component({
  selector: 'rio-workshop-list',
  template: `
    <div *ngFor="let workshop of workshops">
      {{ workshop.title }}
    </div>`
})
export class WorkshopListComponent implements OnInit {
  ...
  ngOnInit() {
    this.http.get('some-url')
      .map(data => data.json())
      .subscribe(workshops => this.workshops = workshops);
  }
}
```

---

## Emit a Limited Number of Values

- RxJs provides operators to close the connection automatically
- Examples: `first()` and `take(n)`

This won't cause memory leak issues even if `getAll` emits multiple values

```ts
@Component({
  selector: 'rio-workshop-list',
  template: `
    <div *ngFor="let workshop of workshops">
      {{ workshop.title }}
    </div>`
})
export class WorkshopListComponent implements OnInit {
  ngOnInit() {
    this.service.getAll().first()
      .subscribe(workshops => this.workshops = workshops);
  }
}
```