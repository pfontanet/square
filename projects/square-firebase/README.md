# SquareFirebase

Cette library encapsule différentes technologies de firebase : l'authentification, le stockage de données dans **firestore**, le stockage de fichiers.

* Package `util` :
  * `ID` : Type des identifiants ou clés primaires dans Firebase : `string`.
  
* Package `auth` :
  * `AutService` : Opérations liées à l'authentification. L'authentification elle-même est en principe faite avec `firebaseui`.

* Package `database` :
  * `FirebaseService` : Implémente l'interface `square-database::NoSqlInterface`

* Package `storage` :
  * `StorageService` : Permet d'enregistrer / supprimer des fichiers dans la partie storage de Firebase.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0.

## Code scaffolding

Run `ng generate component component-name --project square-firebase` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project square-firebase`.
> Note: Don't forget to add `--project square-firebase` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build square-firebase` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build square-firebase`, go to the dist folder `cd dist/square-firebase` and run `npm publish`.

## Running unit tests

Run `ng test square-firebase` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
