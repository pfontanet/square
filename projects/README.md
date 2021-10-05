Ce projet est constitué d'un ensemble de librairies qui ont pour objectif de me faciliter la vie dans mes développements TypeScript. Ce n’est pas la pierre angulaire de toute chose, mais cela se veut assez *carré* pour pouvoir être utilisé facilement.
* **square-basic** ne fait référence à aucune autre bibliothèque et contient des utilitaires de base, en particulier :
  * `SortedArray` qui permet de manipuler facilement des tableaux triés
  * `ClassFactory` pour créer une instance de classe à partir de propriétés
* **square-database** est essentiellement constitué d’interfaces décrivant des opérations d’accès aux données :
	* `CRUDInterface` décrit des opérations de base et manipule des données d’un type quelconque
	* `RepositoryService` manipule la classe `Entity` et implémente des opérations d’accès aux données en déléguant les traitement à une classe implémentant `CRUDInterface`
* **square-firebase** fournit une implémentation de `CRUDInterface` pour accéder à *firestore*, ainsi qu’une classe pour l’authentification.