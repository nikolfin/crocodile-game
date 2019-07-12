import * as firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyA5KeexPOc5fxz-A8673U-wgphf_yZjJJQ",
    authDomain: "crocodile-a6a06.firebaseapp.com",
    databaseURL: "https://crocodile-a6a06.firebaseio.com",
    projectId: "crocodile-a6a06",
    storageBucket: "crocodile-a6a06.appspot.com",
    messagingSenderId: "122629435748",
    appId: "1:122629435748:web:9182cc71e13f5165"
};

firebase.initializeApp(firebaseConfig);

console.log(firebase);
