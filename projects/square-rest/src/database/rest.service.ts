import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CRUDInterface, ID } from 'square-database';

/**
 * Implémente l'interface CRUDInterface pour un service REST.
 * @since 1.0.0
 * @author : Patrick Fontanet
 */
@Injectable({
  providedIn: 'root'
})
export class RestService implements CRUDInterface {

  private baseUrl = 'rest'; // TODO

  constructor(private http: HttpClient) { }

  /** @see CRUDInterface.create */
  /** L'identifiant est obligatoire, son nom est 'id' par défaut */
  create(name: string, data: any, idName = 'id'): Promise<ID> {
    return new Promise((resolve, reject) => {
      const url = this.baseUrl + '/' + name;
      this.http.post<any>(url, data).subscribe(
        body => {
          const id = body[idName];
          data[idName] = id,
            resolve(id);
        },
        err => reject(err)
      )
    })
  }

  /** @see CRUDInterface.read */
  read<T>(name: string, id: ID): Promise<T> {
    return new Promise((resolve, reject) => {
      const url = this.baseUrl + '/' + name;
      const options = { params: new HttpParams().set('id', id) };
      this.http.get<T[]>(url, options).subscribe(
        body => resolve(body[0]), // unscribe ???
        err => reject(err)
      )
    });
  }

  /** @see CRUDInterface.update */
  update(name: string, id: ID, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = this.baseUrl + '/' + name;
      const options = { params: new HttpParams().set('id', id) };
      this.http.put(url, data, options).subscribe(
        () => resolve(), // unscribe ???
        err => reject(err)
      )
    });
  }

  /** @see CRUDInterface.delete */
  delete(name: string, id: ID): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}\/${name}\/${id}`;
      this.http.delete(url).subscribe(
        () => resolve(),
        err => reject(err)
      )
    });
  }

  /** @see CRUDInterface.observe */
  observe<T>(name: string, id: ID): Observable<T> {
    const url = this.baseUrl + '/' + name;
    const options = { params: new HttpParams().set('id', id) };
    return this.http.get<T>(url, options);
  }

  /** Sélection sur une table ou une collection */
  select<T>(name: string, criteria?: {}): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const url = this.baseUrl + '/' + name;
      const options = !criteria ? {} : { params: new HttpParams().appendAll(criteria) };
      this.http.get<T[]>(url, options).subscribe(
        elements => resolve(elements), // unscribe ???
        err => reject(err)
      )
    })
  }

}
