# SquareDatabase

Ce module décrit une interface commune de lecture et d'écriture de données en base SQL ou NoSQL.

* Package `database` :
  * `CRUDInterface`       : Opérations de base des opérations CRUD (Create, Retrieve, Update, Delete) et d'abonnement
  * `NoSqlInterface`      : Etend `CRUDInterface` et permet de typer les bases NoSQL
  * `ID`                  : Identifiant pour les clés primaires, `string` ou `number`
  * `Entity`              : Classe possédant un `id` et retournant le nom de table ou du document en base
  * `RepositoryInterface` : Mêmes opérations de `CRUDInterface` pour des objets de type `Entity`
  * `RepositoryService`   : Une implémentation de `RepositoryInterface` basée sur une classe implémentant `CRUDInterface`

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0.

## Code scaffolding

Run `ng generate component component-name --project square-database` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project square-database`.
> Note: Don't forget to add `--project square-database` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build square-database` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build square-database`, go to the dist folder `cd dist/square-database` and run `npm publish`.

## Running unit tests

Run `ng test square-database` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
