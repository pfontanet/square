import { Comparable } from "../util/comparable.interface";
import { SortedArray } from "./sorted-array";

class Personne implements Comparable<Personne> {
  constructor(public nom = '') { }
  compareTo(other: Personne) { return this.nom.localeCompare(other.nom) }
}

describe('Testing the SortedArray class', () => {
  it("SortedArray<string> tests", () => {
    const arr = new SortedArray<string>();
    arr.push('b', 'c', 'a', 'a');
    expect(arr).toEqual(['a', 'b', 'c']);
  })

  it("SortedArray<String> tests", () => {
    const arr = new SortedArray<String>();
    arr.push('b', 'c', 'a', 'a');
    expect(arr).toEqual(['a', 'b', 'c']);
  })

  it("SortedArray<number> tests", () => {
    const arr = new SortedArray<number>();
    arr.push(2, 3, 1, 1);
    expect(arr).toEqual([1, 2, 3]);
  })

  it("SortedArray<Number> tests", () => {
    const arr = new SortedArray<Number>();
    arr.push(2, 3, 1, new Number(1));
    expect(arr).toEqual([1, 2, 3]);
  })

  it("SortedArray<Comparable> tests", () => {
    const arr = new SortedArray<Comparable<Personne>>();
    const stendhal = new Personne("Stendhal");
    const abelard = new Personne("Abélard");
    const proust = new Personne("Proust");
    arr.push(stendhal, abelard, proust, new Personne("Proust"));
    expect(arr).toEqual([abelard, proust, stendhal]);
    
    expect(arr.indexOf(abelard)).toEqual(0);
    expect(arr.indexOf(proust)).toEqual(1);
    expect(arr.indexOf(stendhal)).toEqual(2);
  })

  it("clear() tests", () => {
    const arr = new SortedArray<Number>();
    arr.push(2, 3, 1, new Number(1));
    arr.clear();
    expect(arr.length).toEqual(0);
  })

  it("remove() tests", () => {
    const arr = new SortedArray<Number>();
    arr.push(2, 3, 1, new Number(1));
    arr.remove(2);
    expect(arr).toEqual([1, 3]);
  })

});
