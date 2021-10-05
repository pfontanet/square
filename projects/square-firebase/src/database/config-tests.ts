import { FirebaseApp, initializeApp } from 'firebase/app';

export class ConfigTests {
  private static firebaseConfig = {
    apiKey: "AIzaSyD-AmLVU4lUHR1yZdW6vTkMBDy6B4Dbmm8",
    authDomain: "tests-dd7cc.firebaseapp.com",
    projectId: "tests-dd7cc",
    storageBucket: "tests-dd7cc.appspot.com",
    messagingSenderId: "495771999779",
    appId: "1:495771999779:web:d4cb031d6c37e8481a1b96",
    measurementId: "G-76WMN91T0P"
  };

  private static firebaseApp: FirebaseApp | undefined;

  static init(): FirebaseApp {
    if (!ConfigTests.firebaseApp)
      ConfigTests.firebaseApp = initializeApp(ConfigTests.firebaseConfig);
    return ConfigTests.firebaseApp;
  }
}