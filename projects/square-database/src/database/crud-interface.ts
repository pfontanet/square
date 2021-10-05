import { Observable } from "rxjs";
import { ID } from "./id.type";

/**
 * CRUDInterface décrit les opérations de base pour gérer une donnée de type <T> ou any.
 * Une donnée est un enregistrement d'une base de données SQL ou un document dans une base NoSQL (Firestore, MongoDB, ...).
 * En principe, une donnée possède une clé primaire de type 'ID' ('string' ou 'number'), mais ce n'est pas obligatoire.
 * Les opérations sont Créer, Retrouver, Mettre à jour ou Supprimer (CRUD) ainsi des opérations d'abonnement et de sélection.
 * Toutes les opérations sont asynchrones.
 * Pour chaque opération, le type générique <T> peut être omis ; par défaut, il correspond à 'any'.
 * @since 1.0.0
 * @author Patrick Fontanet
 */
export interface CRUDInterface {

  /**
   * Crée une donnée en base et retourne son identifiant
   * Si 'data' contient contient un identifiant 'idName', celui doit être mis à jour et enregistré dans la base.
   * @param name Nom de l'enregistrement ou du document
   * @param data Données au format JSON
   * @param idName Nom  de l'identifiant de data, optionnel dans certains cas
   * @return Identifiant de la donnée
   */
  create(name: string, data: any, idName?: string): Promise<ID>;

  /**
   * Lecture d'une donnée d'identifiant 'id'
   * @param name Nom de l'enregistrement ou du document
   * @param id Clé primaire
   * @returns Donnée de type <T> ou undefined si la donnée n'existe pas en base
   */
  read<T>(name: string, id: ID): Promise<T>;

  /**
   * Mise à jour d'une donnée d'identifiant 'id'
   * Généralement, produit une erreur si la donnée 'id' n'existe pas en base 
   * @param name : Nom de l'enregistrement ou du document
   * @param id Clé primaire
   * @param data : JSON new Data of entity
   * @return void
   */
  update(name: string, id: ID, data: any): Promise<void>;

  /**
   * Suppression d'une donnée d'identifiant 'id' 
   * @param name : Nom de l'enregistrement ou du document
   * @param id Clé primaire
   * @returns void
   */
  delete(name: string, id: ID): Promise<void>;

  /**
   * Abonnement sur la modidification d'une donnée
   * @param name : Nom de l'enregistrement ou du document
   * @param id Clé primaire
   * @returns Observable avec la donnée ou undefined si celle-ci a été supprimée
   */
  observe<T>(name: string, id: ID): Observable<T>;

}