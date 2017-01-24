# Ahead of Time Compilation (AoT)

# Rangle.io

---

## Compilation Modes

Just in Time Compilation (JiT):

- Compilation performed in the browser at run time
- Bigger bundle size (includes the compiler)
- Takes longer to boot the app

```sh
$ ng serve --prod
```

Ahead of Time Compilation (AoT):

- Compilation performed in the server at build time
- Smaller bundle size (doesn't include the compiler)
- The app boots faster

```sh
$ ng serve --prod --aot
```


---

![JiT Packages](content/images/packages-prod-no-sourcemap.png)

---

![AoT Packages](content/images/packages-prod-aot-no-sourcemap.png)

---

## JiT vs AoT in Demo App (LL + Prod)

| File                 | Size (JiT) | Size (AoT) |
| ---                  |       ---: |       ---: | 
| main.bundle.js       | 5.4 KB     | 17.4 KB    |
| vendor.bundle.js     | 254 KB     | 157 KB     |
| other js files       | 49.5 KB    | 49.5 KB    |
| **Initial Download** | 309 KB     | **224 KB** |     
| 0.chunk.js           | 3 KB       | **9.1 KB** |
| **Total Download**   | 312 KB     | 233 KB     |    

AoT goals (from the [docs](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html)):

- Faster rendering => Components already compiled
- Fewer async request => Inline external HTML and CSS
- Smaller bundle size => No compiler shipped
- Detect template errors => Because they can
- Better security => Prevents script injection attack

---

## Boot Time Comparison

| Event              | Time (JiT) | Time (AoT) |
| ---                |       ---: |       ---: | 
| DOM Content Loaded | 769 ms     | 370 ms     |
| Load               | 888 ms     | 401 ms     |
| FMP                | ~1000 ms   | **~500 ms** |

DOM Content Loaded:

- The browser has finished parsing the DOM
- jQuery nostalgia => `$(document).ready()`

Load: All the assets has been downloaded

First Meaningful Paint (FMP):

- When the user is able to see the app "live" for the first time

(Show browser profile for both modes)
