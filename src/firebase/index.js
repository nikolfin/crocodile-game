import firebaseConfig from './firebase-config';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const auth = firebase.auth();
const signIn = () => {
    auth
        .signInAnonymously()
        .catch(error => {
            new Error(error);
        });
};

export {
    db,
    auth,
    signIn
}

export default firebase;