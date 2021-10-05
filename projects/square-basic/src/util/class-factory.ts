import { Class } from "./class.type";

/**
 * Creation of an object of a given class.
 * @since 1.0.0
 * @author Patrick Fontanet
 */
export class ClassFactory {

  private constructor() { }

  /**
   * Create a new object
   * @param clazz Class, for example Item
   * @param properties Object data
   * @returns A new object of type clazz
   */
  static create<T>(clazz: Class<T>, properties: any): T {
    // return Object.assign(c, properties);
    // Contrairement à Object.assign(), le code ci-dessous permet d'affecter une propriété name.
    let obj = new clazz();
    if (properties) {
      for (const [key, value] of Object.entries(properties)) {
        (<any>obj)[key] = value;
      }
    }
    return obj;
  }
}