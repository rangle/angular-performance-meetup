# Server Side Rendering

# Rangle.io

---

## Angular Universal

Provides the ability to pre-render your application on the server

Much faster time to first paint

Enables better SEO

Enables content preview on social networks

Fallback support for older browsers

Use the [`universal-starter`](https://github.com/angular/universal-starter) as the base of your application

---

## What's Included

- Suite of polyfills for the server

- Server rendering layer

- Preboot - replays your user's interactions after Angular has bootstrapped

- State Rehydration - Don't lose your place when the application loads

---

## Boot Time Comparison (Client vs Server)

Both environments include previous AoT and Lazy Loading enhancements

| Event              | Time (Client) | Time (Server) |
| ---                |          ---: |          ---: |
| DOM Content Loaded |        3.11 s |        411 ms |
| Load               |        3.25 s |        2.88 s |
| FMP                |        3.16 s |   **~440 ms** |

*Times are on mobile over 3G

---

## Universal Caveats

- Cannot directly access the DOM

```ts
constructor(element: ElementRef, renderer: Renderer) {
  renderer.setElementStyle(element.nativeElement, ‘font-size’, ‘x-large’);
}
```

- Current solutions only cover Express and ASP.NET servers

- Project will be migrated into the core Angular repo for v4
