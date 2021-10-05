# square-basic

Ce module ne fait référence à aucune autre bibliothèque et contient des utilitaires de base.

* Package `util` :
  * `Class<T>`     : Type de la classe d'un type (équivalent de `java.lang.Class<T>`)
  * `ClassFactory` : Permet de créer une instance de classe à partir de propriétés
  * `Comparable`   : Interface de comparaison entre objets

* Package `arrays` :
  * `SortedArray`  : Tableau trié de `string`, `String`, `number`, `Number` ou `classes` implémentant `Comparable`

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0.

## Code scaffolding

Run `ng generate component component-name --project square-basic` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project square-basic`.
> Note: Don't forget to add `--project square-basic` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build square-basic` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build square-basic`, go to the dist folder `cd dist/square-basic` and run `npm publish`.

## Running unit tests

Run `ng test square-basic` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
