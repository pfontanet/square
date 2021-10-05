import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  upload(file: File, progress: (transferred: number, total: number) => void): Promise<string> {
    return new Promise((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;
      if (!currentUser)
        reject(new Error("Unauthenticated user"));

      else if (!file)
        reject(new Error("File undefined"));

      else {
        const uid = currentUser.uid;
        const almostUniqueFileName = Date.now().toString();
        const path = uid + '/' + almostUniqueFileName + file.name;
        const upload = firebase.storage().ref(path).put(file); /* firebase.storage.UploadTask */

        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot: firebase.storage.UploadTaskSnapshot) => {
            progress(snapshot.bytesTransferred, snapshot.totalBytes)
          },
          (error) => reject(error),
          () => upload.snapshot.ref.getDownloadURL().then(
            (url: string) => resolve(url)
          )
        );
      }
    });
  }

  delete(url: string): Promise<void> {
    const storageRef = firebase.storage().refFromURL(url);
    return storageRef.delete();
  }

}
