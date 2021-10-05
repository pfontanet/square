import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { Observable } from 'rxjs';
import { CRUDInterface } from 'square-database';
import { ID } from '../util/id.type';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService implements CRUDInterface {
  // cf. https://firebase.google.com/docs/web/modular-upgrade pour la migration vers la version 9
  private db = firebase.database();

  constructor() { }

  /** @see CRUDInterface.create */
  create(entityName: string, data: any, pkName?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.newKey(entityName).then(
        (key: ID) => {
          if (pkName)
            data[pkName] = key;
          this.db.ref(entityName).child(key).set(data).then(
            () => resolve(key),
            (error: Error) => reject(error)
          )
        },
        (error: Error) => reject(error)
      )
    });
  }

  /** @see CRUDInterface.read */
  read(entityName: string, key: ID): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.ref(entityName).child(key).once('value',
        (snapshot: firebase.database.DataSnapshot) => resolve(snapshot.val()),
        (error: Error) => reject(error),
      )
    });
  }

  /** @see CRUDInterface.update */
  update(entityName: string, key: ID, data: any): Promise<any> {
    return this.db.ref(entityName).child(key).set(data);
  }

  /** @see CRUDInterface.delete */
  delete(entityName: string, key: ID): Promise<any> {
    return this.db.ref(entityName).child(key).remove();
  }

  /** @see CRUDInterface.observe */
  observe(entityName: string, key: ID): Observable<any> {
    return new Observable(subscriber => {
      this.db.ref(entityName).child(key).on('value',
        (snapshot: firebase.database.DataSnapshot) => subscriber.next(snapshot.val()),
        (error: Error) => subscriber.error(error)
      );
    })
  }

  /* UNSUBSCRIBE */
  // unsubscribe(entityName: string, key: ID): void {
  //   this.db.ref(entityName).child(key).off('value');
  // }

  /* P R I V A T E */
  /* ------------- */

  private newKey(entityName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.ref(entityName).push().then(
        (ref: firebase.database.Reference) => resolve(<string>ref.key),
        (error: Error) => reject(error)
      )
    });
  }

}
