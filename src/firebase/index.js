import firebaseConfig from './firebase-config';
import * as firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export {
    db
}

export default firebase;