import { Observable } from "rxjs";
import { Class } from "square-basic";
import { Entity } from "./entity";
import { ID } from "./id.type";

/**
 * Un Repository redéfinit toutes les opérations de CRUDInterface pour des classes dérivant de Entity.
 * L'entité contient une clé primaire 'id' et définit le nom de l'enregistrement ou du document en base. 
 * @since 1.0.0
 * @uthor Patrick Fontanet
 */
export interface RepositoryInterface {

  /**
   * Crée une entité en base, met à jour son 'id' et retourne cet identifiant
   * @param entity Entité à insérer en base
   * @returns Identifiant de l'entité
   */
  create<T extends Entity>(entity: T): Promise<ID>;

  /**
   * Lecture d'une entité d'identifiant 'id'
   * @param clazz Classe de l'entité, par exemple 'Item'
   * @param id Id de l'entité
   * @returns Entité de type <T> ou undefined si elle n'existe pas en base
   */
  read<T extends Entity>(clazz: Class<T>, id: ID): Promise<T>;

  /**
   * Mise à jour d'une entité, son identifiant doit être défini
   * @param entity Entité à mettre à jour
   * @returns void
   */
  update<T extends Entity>(entity: T): Promise<void>;

  /**
   * Suppression d'une entité d'identifiant 'id'
   * @param clazz Classe de l'entité, par exemple 'Item'
   * @param id Id de l'entité
   * @returns void
   */
  delete<T extends Entity>(clazz: Class<T>, id: ID): Promise<void>;

  /**
   * Appel de update() ou create() si entity.id==undefined
   * Dans le cas d'une création l'id de l'entité est valorisé
   * @param entity Entité à mettre à jour ou à créer
   * @returns Identifiant de l'entité
   */
  save<T extends Entity>(entity: T): Promise<ID>;

  /**
   * Abonnement sur la modidification d'une entité
   * @param clazz Classe de l'entité, par exemple 'Item'
   * @param id Id de l'entité
   * @returns Observable avec l'entité ou undefined si celle-ci a été supprimée 
   */
  observe<T extends Entity>(clazz: Class<T>, id: ID): Observable<T>;

}