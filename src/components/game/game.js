import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { auth, db, signIn } from '../../firebase';
import styles from './styles.css';

const regularPlayer = {
    isLead: false
};

signIn();

const Game = ({ gameId }) => {
    const dbPlayersRef = db.ref(`games/${gameId}/players`);
    const [uid, setUid] = useState(null);
    const [shouldBePlayerAdded, setShouldBePlayerAdded] = useState(false);

    useEffect(() => {
        if (shouldBePlayerAdded) {
            dbPlayersRef.
            child(uid).
            set(regularPlayer);
        }
        if (uid) {
            checkShouldBePlayerAdded(uid);
        }
    }, [shouldBePlayerAdded, uid]);

    auth.
    onAuthStateChanged(user => {
        if (user) {
            setUid(user.uid);
        }
    });

    function checkShouldBePlayerAdded(uid) {
        dbPlayersRef.
        on('value', snapshot => {
            const players = Object.keys(snapshot.val());

            setShouldBePlayerAdded(!players.some(item => item === uid));
        });
    }

    return (
        <div className={styles.root}>
            {gameId}
        </div>
    )
};

Game.propTypes = {
    gameId: string
};

export default Game;
