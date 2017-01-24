# Change Detection

# Rangle.io

---

## What's Change Detection (CD)?

It's a mechanism to keep our "models" in sync with our "views"

Change detection is fired when...

- The user interacts with the app (click, submit, etc.)
- An async event is completed (setTimeout, promise, observable)

When CD is fired, Angular will check every component starting from the top once.

---

## Change Detection Strategy: OnPush

Angular offers 2 strategies:

- **Default:** Check the entire component when CD is fired
- **OnPush:** Check only relevant subtrees when CD is fired

OnPush Requirements:

Component inputs (`@Input`) need to be immutable objects

```ts
@Component({
  selector: 'rio-workshop',
  templateUrl: './workshop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopComponent {
  @Input() workshop: Workshop;
  @Input() isSummary = false;
}
```

[View Example](https://plnkr.co/edit/?p=preview)

---

## Example: The Component Tree

![Lazy Loading](content/images/component-tree.svg)
<!-- .element: style="width: 1000px" -->

---

## Default Change Detection

![Lazy Loading](content/images/default-change-detection-1.svg)
<!-- .element: style="width: 1000px" -->

![Lazy Loading](content/images/default-change-detection-2.svg)
<!-- .element: style="width: 1000px" -->

---

## OnPush Change Detection

![Lazy Loading](content/images/default-change-detection-1.svg)
<!-- .element: style="width: 1000px" -->

![Lazy Loading](content/images/onpush-change-detection.svg)
<!-- .element: style="width: 1000px" -->

---

## Summary

What to do?

- Apply the `OnPush` change detection on every component*
- Never mutate an object or array, always create a a new reference ([blog](http://david-barreto.com/immutable-array-operations-in-typescript/))

```ts
// Don't
let addPerson = (person: Person): void => {
  people.push(person);
};
// Do
let addPerson = (people: Person[], person: Person): Person[] => {
  return [ ...people, person ];
};
```

Benefits:

- Fewer checks of your components during Change Detection
- Improved overall app performance