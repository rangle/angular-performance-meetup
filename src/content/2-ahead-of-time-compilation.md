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

## JiT vs AoT in Demo App (Prod + Gzip)

CSS files are included in the "other js files"

| File                 | Size (JiT) |   Size (AoT) |
| ---                  |       ---: |         ---: | 
| main.bundle.js       |     6.4 KB |  **23.9 KB** |
| vendor.bundle.js     |     255 KB |       158 KB |
| other js files       |    48.7 KB |      49.6 KB |
| **Total Download**   |     306 KB | **231.5 KB** |

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
| DOM Content Loaded |     5.44 s |     3.25 s |
| Load               |     5.46 s |     3.27 s |
| FMP                |     5.49 s | **3.30 s** |

DOM Content Loaded:

- The browser has finished parsing the DOM
- jQuery nostalgia => `$(document).ready()`

Load: All the assets has been downloaded

First Meaningful Paint (FMP):

- When the user is able to see the app "live" for the first time

(Show browser profile for both modes)
