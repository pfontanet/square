import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, DocumentSnapshot, getDoc, getDocs, getFirestore, onSnapshot, query, QueryConstraint, QuerySnapshot, setDoc, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { NoSqlInterface } from 'square-database';
import { ID } from '../util/id.type';

/**
 * Implémente l'interface CRUDInterface pour la base NoSQL Firestore. Les clés primaires sont de type 'string'.
 * @since 1.0.0
 * @author : Patrick Fontanet
 */
@Injectable({
  providedIn: 'root'
})
export class FirestoreService implements NoSqlInterface {
  private db = getFirestore();

  constructor() { }

  /** @see CRUDInterface.create */
  /** 
   * Le document en base ne contient pas forcément de clé primaire, c'est pourquoi pkName est optionnel. 
   * L'identifiant peut être forcé avec data[pkName]
   * Au retour, data[pkName] contient la nouvelle clé primaire (ou la clé forcée) 
   */
  create(name: string, data: any, pkName?: string): Promise<ID> {
    return new Promise((resolve, reject) => {
      // https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
      const key = !pkName ? undefined : (<any>data)[pkName];
      const newDoc = key ? doc(this.db, name, key) : doc(collection(this.db, name));
      if (pkName)
        (<any>data)[pkName] = newDoc.id;

      const anyData = Object.assign({}, data);
      setDoc(newDoc, anyData).then(
        () => resolve(newDoc.id),
        err => reject(err)
      )
    })
  }

  /** @see CRUDInterface.read */
  read<T>(name: string, key: ID): Promise<T> {
    return new Promise((resolve, reject) => {
      // https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
      const docRef = doc(this.db, name, key);
      getDoc(docRef).then(
        (docSnap: DocumentSnapshot) => resolve(<T>docSnap.data()),
        err => reject(err)
      )
    });
  }

  /** @see CRUDInterface.update */
  /** L'update d'un document inexistant produit une erreur : 'No document to update' */
  update(name: string, key: ID, data: any): Promise<void> {
    // cf. https://newbedev.com/function-documentreference-set-called-with-invalid-data-unsupported-field-value-a-custom-budget-object
    // Pour éviter l'ereur Function DocumentReference.set() called with invalid data. Data must be an object, but it was: a custom object
    const anyData = Object.assign({}, data);
    const docRef = doc(this.db, name, key);
    return new Promise((resolve, reject) => {
      updateDoc(docRef, anyData).then(
        () => resolve(),
        err => reject(err)
      )
    })
  }

  /** @see CRUDInterface.delete */
  /** La suppression d'une donnée inexistante ne produit aucune erreur */
  delete(name: string, key: ID): Promise<void> {
    const docRef = doc(this.db, name, key);
    return deleteDoc(docRef);
  }

  /** @see CRUDInterface.observe */
  observe<T>(name: string, key: ID): Observable<T> {
    return new Observable(subscriber => {
      // https://firebase.google.com/docs/firestore/query-data/listen
      const docRef = doc(this.db, name, key);
      onSnapshot(docRef,
        (docSnap: DocumentSnapshot) => subscriber.next(<T>docSnap.data()),
        err => subscriber.error(err)
      );
    });
  }

  select<T>(name: string, criteria = {}): Promise<T[]> {
    const colRef = collection(this.db, name);
    const constraints: QueryConstraint[] = [];
    for (let key of Object.keys(criteria)) {
      const value = (<any>criteria)[key];
      const constraint = where(key, "==", value)
      constraints.push(constraint);
    }
    const q = query(colRef, ...constraints);

    // https://firebase.google.com/docs/firestore/query-data/queries#simple_queries
    return new Promise((resolve, reject) => {
      getDocs(q).then(
        (querySnapshot: QuerySnapshot) => {
          const docs: any[] = [];
          querySnapshot.forEach(docSnap => docs.push(docSnap.data()));
          resolve(docs);
        },
        (error: Error) => reject(error)
      )
    })
  }

  // selectAll<T>(name: string): Promise<T[]> {
  //   // https://firebase.google.com/docs/firestore/query-data/get-data#get_all_documents_in_a_collection
  //   return new Promise((resolve, reject) => {
  //     const colRef = collection(this.db, name);
  //     getDocs(colRef).then(
  //       (querySnapshot: QuerySnapshot) => {
  //         const docs: any[] = [];
  //         querySnapshot.forEach(docSnap => docs.push(docSnap.data()));
  //         resolve(docs);
  //       },
  //       (error: Error) => reject(error)
  //     )
  //   })
  // }

}
