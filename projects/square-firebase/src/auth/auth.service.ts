import { Injectable } from "@angular/core";
import { getAuth, onAuthStateChanged, updateProfile, User } from 'firebase/auth';
import { Observable } from "rxjs";
import { ID } from "../util/id.type";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  onAuthStateChanged(): Observable<User | null> {
    // https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user
    return new Observable(subscriber => {
      const auth = getAuth();
      onAuthStateChanged(auth,
        user => subscriber.next(user),
        error => subscriber.error(error)
      );
    })
  }

  isAuth(): boolean {
    return getAuth().currentUser != null;
  }

  signOut(): Promise<void> {
    return getAuth().signOut();
  }

  user(): User | null {
    return getAuth().currentUser;
  }

  uid(): ID | undefined {
    const user = getAuth().currentUser;
    return user ? user.uid : undefined;
  }

  updateProfile(profile: { displayName?: string | null; photoURL?: string | null; }): Promise<void> {
    // https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
    const user = getAuth().currentUser;
    if (!user)
      throw (new Error("User not defined"));
    return updateProfile(user, profile);
  }

}
