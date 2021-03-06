import firebaseConfig from './firebase-config';
import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database();
    }

    signInAnonymously() {
        this.auth.setPersistence(app.auth.Auth.Persistence.SESSION)
            .then(() => this.auth.signInAnonymously())
            .catch(error => {
                alert(error.message);
            })
    }

    onAuthStateChanged(callback) {
        return this.auth.onAuthStateChanged(callback);
    }
}

export default new Firebase();
