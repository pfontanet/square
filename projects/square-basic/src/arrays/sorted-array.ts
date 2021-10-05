import { Comparable } from "../util/comparable.interface";

/**
 * SortedArray provides a simple way to handle an ordered array of strings, numbers, or type elements implementing the Comparable interface. The table is WITHOUT duplicate. Two objects a and b are considered identical if a==b for numbers, a.localeCompare(b)==0 for strings or a.compareTo(b)= 0 for others.
 * @since 1.0.0
 * @author Patrick Fontanet
 */
export class SortedArray<T extends Comparable<T> | string | String | number | Number> extends Array {

  /**
   * The indexOf() method searches for an element in the array and returns its position or -1 if the element is not found. Research is dichotomous. The first element of the array has position 0.
   * @param item : The item to search for.
   * @returns A Number, representing the position of the specified item, otherwise -1.
   */
  indexOf(item: T): number {
    const index = this.searchInsertIndex(item);
    const equals = (index < this.length) && this.equals(this[index], item);
    return equals ? index : -1;
  }

  /**
   * This method inserts an element into the array in order. If the element already exists, the array is not modified.
   * @param item : element to insert.
   * @returns index of the inserted or existing element.
   */
  insert(item: T): number {
    const index = this.searchInsertIndex(item);
    const equals = (index < this.length) && this.equals(this[index], item);
    if (!equals)
      this.splice(index, 0, item);
    return index;
  }

  /**
   * The push() method inserts one or more elements into an array according to the order of the elements and returns the new length of the array.
   * @param elementN The element(s) to add to the end of the array.
   * @returns The new length property of the object upon which the method was called.
   */
  push(...elementN: T[]): number {
    elementN.forEach(element => this.insert(element));
    return this.length;
  }

  /**
   * Removes the specified element from this aray if it is present.
   * @param element: object to be removed from this set, if present
   * @returns true if this set contained the specified element
   */
  remove(element: T): boolean {
    const index = this.indexOf(element);
    if (index != -1)
      this.splice(index, 1);
    return index != -1;
  }

  /**
   * Removes all elements from the array
   */
  clear(): void {
    this.splice(0, this.length);
  }

  /* P R I V A T E */
  /* ------------- */

  /**
   * Comparison method according to generic type T.
   * @param a : object T
   * @param b : object T
   * @returns a negative integer, zero, or a positive integer as this object is less than, equal to, or greater than the specified object.
   */
  private compare(a: T, b: T): number {
    if ((<any>a).compareTo)
      return (<Comparable<T>>a).compareTo(b);
    if ((<any>a).localeCompare)
      return (<string>a).localeCompare(<string>b);
    // on considère que new Number(1) est égal à 1
    return <Number>a == <Number>b ? 0 : <Number>a < <Number>b ? -1 : 1;
  }

  /**
   * Equality of 2 objects of type T.
   * @param a : object T
   * @param b : object T
   * @returns true if compare(a, b) == 0, false otherwise
   */
  private equals(a: T, b: T): boolean {
    return this.compare(a, b) == 0;
  }

  /**
   * Finding the insertion index of an Element.
   * @param item : element to insert.
   * @returns insert index or the index of the element if it exists. 0 to insert as the first element, length as the last element.
   */
  private searchInsertIndex(item: T): number {
    let inf = 0
    let sup = this.length - 1;
    while (inf <= sup) {
      const m = Math.trunc((inf + sup) / 2);
      const comp = this.compare(this[m], item);
      if (comp < 0)
        inf = m + 1;
      else
        sup = m - 1;
    }
    return inf;
  }

}
