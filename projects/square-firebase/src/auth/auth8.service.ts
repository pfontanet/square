import { Injectable } from "@angular/core";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Observable } from "rxjs";

@Injectable()
export class AuthService {

  constructor() {
    this.onAuthStateChanged();
  }

  onAuthStateChanged(): Observable<firebase.User | null> {
    return new Observable(subscriber => {
      firebase.auth().onAuthStateChanged(
        user => {
          console.log("Utilisateur " + (user ? "connecté" : "déconnecté"));
          subscriber.next(user);
        },
        error => subscriber.error(error)
      );
    })
  }

  isAuth(): boolean {
    return firebase.auth().currentUser != null;
  }

  signOut(): Promise<void> {
    return firebase.auth().signOut();
  }

  user(): firebase.User | null {
    return firebase.auth().currentUser;
  }
}
