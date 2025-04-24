# BlogAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


blog-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   ├── home/
│   │   │   ├── post-list/
│   │   │   ├── post-detail/
│   │   │   ├── post-form/
│   │   │   ├── login/
│   │   │   └── comment-section/
│   │   ├── models/
│   │   │   ├── post.model.ts
│   │   │   ├── user.model.ts
│   │   │   └── comment.model.ts
│   │   ├── services/
│   │   │   ├── post.service.ts
│   │   │   ├── auth.service.ts
│   │   │   └── comment.service.ts
│   │   └── shared/
│   │       ├── pipes/
│   │       └── directives/
│   ├── assets/
│   │   └── images/
│   └── environments/
├── db.json           # Pour JSON Server
└── (autres fichiers Angular standard)
