import { ID } from "./id.type";

/**
 * Represents an entity in a database or other (firebase, MongoDB, ...), an entity is identified by its 'id'.
 * @since 1.0.0
 * @author Patrick Fontanet
 */
export abstract class Entity {

  constructor(public id?: ID) { }

  /**
   * @returns Database table name or document name. 
   */
  abstract entityName(): string;

  setValue(key: string, value?: string | undefined): void {
    if (!value)
      delete this[<never>key];
    else
      this[<never>key] = <never>value;
  }
}