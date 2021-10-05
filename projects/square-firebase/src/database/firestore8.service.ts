import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Observable } from 'rxjs';
import { CRUDInterface } from 'square-basic';
import { ID } from '../util/id.type';

@Injectable({
  providedIn: 'root'
})
export class Firestore8Service implements CRUDInterface<string> {
  private db = firebase.firestore();

  constructor() { }

  /** @see CRUDInterface.create */
  create(entityName: string, data: any, pkName?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const newRef = this.db.collection(entityName).doc();
      if (pkName)
        data[pkName] = newRef.id;
      newRef.set(Object.assign({}, data)).then(
        () => resolve(newRef.id),
        (error: Error) => reject(error)
      )
    })
  }

  /** @see CRUDInterface.read */
  read(entityName: string, key: ID): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(entityName).doc(key).get(/*options*/).then(
        doc => resolve(doc.data()),
        (error: Error) => reject(error)
      )
    });
  }

  /** @see CRUDInterface.update */
  update(entityName: string, key: ID, data: any): Promise<void> {
    // cf. https://newbedev.com/function-documentreference-set-called-with-invalid-data-unsupported-field-value-a-custom-budget-object
    // Pour éviter l'ereur Function DocumentReference.set() called with invalid data. Data must be an object, but it was: a custom object
    const doc = Object.assign({}, data);
    return this.db.collection(entityName).doc(key).set(doc);
  }

  /** @see CRUDInterface.delete */
  delete(entityName: string, key: ID): Promise<void> {
    return this.db.collection(entityName).doc(key).delete();
  }

  /** @see CRUDInterface.observe */
  observe(entityName: string, key: ID): Observable<any> {
    return new Observable(subscriber => {
      /* const unscribe = */
      this.db.collection(entityName).doc(key).onSnapshot(
        doc => subscriber.next(doc.data()),
        (error: Error) => subscriber.error(error)
      );
    });
  }

}
