# Change Detection

# Rangle.io

---

## What's Change Detection (CD)?

It's a mechanism to keep our "models" in sync with our "views"

Change detection is fired when...

- The user interacts with the app (click, submit, etc.)
- An async event is completed (setTimeout, setInterval, observable)

When CD is fired, Angular will check every component starting from the top.

