import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyBZ9F-YWByMZ0ftT-y_zmj615ksvAcX-5o",
  authDomain: "crwn-db-e5f51.firebaseapp.com",
  databaseURL: "https://crwn-db-e5f51.firebaseio.com",
  projectId: "crwn-db-e5f51",
  storageBucket: "crwn-db-e5f51.appspot.com",
  messagingSenderId: "992568784190",
  appId: "1:992568784190:web:e3e27224f746d03ad0e86f",
  measurementId: "G-7N13WDZPY2"
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
