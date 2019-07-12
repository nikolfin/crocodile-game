const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const serviceAccount = require('../crocodile-a6a06-firebase-adminsdk-ead69-174d716cbf.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://crocodile-a6a06.firebaseio.com'
});

const app = express();

app.get('/test', (req, res) => {
    admin.firestore().collection('/users').get()
        .then(data => {
            const result = [];

            data.forEach(doc => {
                result.push(doc.data())
            });

            return res.json(result);
        })
        .catch(error => {
            console.log(2, error);
            return res.status(500).json({ error })
        })
});

exports.api = functions.region('europe-west2').https.onRequest(app);
