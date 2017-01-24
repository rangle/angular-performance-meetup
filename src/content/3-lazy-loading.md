# Lazy Loading

# Rangle.io

---

## What is Lazy Loading?

Ability to load modules on demand => Useful to reduce the app startup time

![Lazy Loading](content/images/lazy-loading.jpg)

(Compare branches `no-lazy-loading` vs `normal-lazy-loading`)

---

## Bundle Sizes Comparison (Prod + AoT)

| File                 | Size (No LL) |   Size (LL) |
| ---                  |         ---: |        ---: | 
| main.bundle.js       |      23.9 KB | **17.4 KB** |
| vendor.bundle.js     |       158 KB |      158 KB |
| other js files       |      49.6 KB |     49.6 KB |
| **Initial Download** |     231.5 KB |      225 KB |     
| 0.chunk.js           |            - |  **9.1 KB** |
| **Total Download**   |     231.5 KB |    234.1 KB |

- Webpack creates a "chunk" for every lazy loaded module
- The file `0.chunk.js` is loaded when the user navigates to `admin`
- The initial download size is smaller with LL
- The total size _over time_ is bigger with LL because of Webpack async loading
- The effect of LL start to be noticeable when the app grows

---

## Boot Time Comparison (Prod + AoT)

| Event              | Time (No LL) |   Time (LL) |
| ---                |         ---: |        ---: | 
| DOM Content Loaded |       486 ms |      474 ms |
| Load               |       533 ms |      526 ms |
| FMP                |      ~550 ms | **~550 ms** |

---

## How to Enable Lazy Loading? (1/4)

Step 1: Organize your code into modules

```sh
$ tree src/app -L 1

src/app
├── admin/
├── app-routing.module.ts
├── app.component.ts
├── app.module.ts
├── core/
├── public/
└── shared/
```

- `CoreModule` provides all the services and the Redux store
- `SharedModule` provides all the reusable components, directives or pipes
- `PublicModule` provides the components and routing of the public section of the app
- `AdminModule` provides the components and routing of the private section of the app
- `AppModule` root module

(Show modules in the IDE)

---

## How to Enable Lazy Loading (2/4)

Step 2: Create a routing module for lazy loaded module

```ts
const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: WorkshopListComponent },
    { path: 'new', component: WorkshopEditorComponent },
    { path: 'edit/:id', component: WorkshopEditorComponent },
  ]
}];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AdminRoutingModule {}
```

- Always use the method `forChild` when importing the `RouterModule`
- Avoids duplication of services in the child injector

---

## How to Enable Lazy Loading (3/4)

Step 3: Define a child `<router-outlet>` to render child routes

```ts
@Component({
  selector: 'rio-admin',
  template: `
    <nav>
      <a routerLink="./list">List Workshops</a>
      <a routerLink="./new">Create Workshop</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AdminComponent {}
```

---

## How to Enable Lazy Loading (4/4)

Step 4: Use the property `loadChildren` to lazy load the module

```ts
export const routes: Routes = [{
  path: 'admin',
  loadChildren: 'app/admin/admin.module#AdminModule',
  canActivate: [ AuthGuardService ],
}];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
```

- Only in the root module use the `forRoot` method of `RouterModule`
- Never `import` a lazy loaded in this file, use a string as reference
- The path of `loadChildren` is not relative to the file, but to the `index.html` file

(Show routes in the IDE and URL structure of the app)

---

## Preloading

As soon as the app is ready, we can download the lazy loaded module

![Lazy Loading](content/images/lazy-loading-with-preloading.jpg)

(Compare branches `normal-lazy-loading` vs `master`)

---

## Enable Preloading

Define the property `preloadingStrategy` in the root module routing

```ts
import { PreloadAllModules } from '@angular/router';

export const routes: Routes = [ ... ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
```