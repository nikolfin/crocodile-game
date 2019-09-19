import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

export const useAuth = () => {
    const [uid, setUid] = useState(null);
    const signInAnonymously = () => {
        return firebase.signInAnonymously();
    };

    // записываем в стейт id игрока
    useEffect(() => {
        firebase.onPlayerRegistered(player => {
            player && setUid(player.uid);
        });
    }, []);

    return [
        uid,
        signInAnonymously
    ];
};
