import { Observable } from "rxjs";
import { Class, ClassFactory } from "square-basic";
import { CRUDInterface } from "./crud-interface";
import { Entity } from "./entity";
import { ID } from "./id.type";
import { RepositoryInterface } from "./repository-interface";

/**
 * Implements a generic entity management service. The service is based on a CRUD service.
 * @since 1.0.0
 * @author Patrick Fontanet
 */
export class RepositoryService implements RepositoryInterface {

  constructor(private crudService: CRUDInterface) { };

  /** @see RepositoryInterface.create */
  create<T extends Entity>(entity: T): Promise<ID> {
    const entityName = entity.entityName();
    return this.crudService.create(entityName, entity, 'id');
  }

  /** @see RepositoryInterface.read */
  read<T extends Entity>(clazz: Class<T>, id: ID): Promise<T> {
    return new Promise((resolve, reject) => {
      const entityName = this.entityName(clazz);
      this.crudService.read<T>(entityName, id).then(
        (data: T) => {
          let entity = data;
          if (data) {
            entity = ClassFactory.create(clazz, data);
            entity = this.postRead(entity);
          }
          resolve(entity);
        },
        (error: Error) => reject(error)
      )
    });
  }

  /** @see RepositoryInterface.update */
  update<T extends Entity>(entity: T): Promise<void> {
    const entityName = entity.entityName();
    if (!entity.id)
      throw new Error(`The entity ${entityName} cannot be updated because its id is undefined`);

    const id: ID = entity.id;
    return new Promise((resolve, reject) => {
      this.crudService.update(entityName, id, entity).then(
        data => resolve(),
        err => reject(err)
      )
    });
  }

  /** @see RepositoryInterface.delete */
  delete<T extends Entity>(clazz: Class<T>, id: ID): Promise<void> {
    const entityName = this.entityName(clazz);
    return this.crudService.delete(entityName, id);
  }

  /** @see RepositoryInterface.save */
  save<T extends Entity>(entity: T): Promise<ID> {
    if (!entity.id)
      return this.create<T>(entity);

    return new Promise((resolve, reject) => {
      this.update<T>(entity).then(
        () => resolve(<ID>entity.id),
        err => reject(err)
      );
    })
  }

  /** @see RepositoryInterface.observe */
  observe<T extends Entity>(clazz: Class<T>, id: ID): Observable<T> {
    return new Observable(subsriber => {
      const entityName = this.entityName(clazz);
      this.crudService.observe<T>(entityName, id).subscribe({
        next: (data: T) => {
          // En cas de suppression, data==null
          let entity = undefined;
          if (data) {
            entity = ClassFactory.create(clazz, data);
            entity = this.postRead(entity);
          };
          subsriber.next(entity)
        },
        error: (error: Error) => subsriber.error(error)
      });
    })
  }

  /**
   * This method can be reimplemented. It is called after the reading (or observation) and creation of an entity.
   * @param entity read or observed
   * @returns Entity possibly modified, the original entity by default
   */
  protected postRead<T extends Entity>(entity: T): T {
    return entity;
  }

  private entityName<T extends Entity>(clazz: Class<T>): string {
    return new clazz().entityName();
  }

}
