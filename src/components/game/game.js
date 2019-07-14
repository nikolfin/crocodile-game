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
    const [players, setPlayers] = useState(null);

    // фетчим список игроков с бд
    useEffect(() => {
        dbPlayersRef.on('value', fetchPlayers);
        return () => {
            dbPlayersRef.off('value', fetchPlayers);
        }
    }, []);

    // записываем в стейт id пользователя
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            user && setUid(user.uid);
        });
    }, []);

    // Проверяем есть ли такой пользователь в бд,
    // если нет, то добавляем и назначем ему статус isLead = false
    useEffect(() => {
        if (uid && players && !players[uid]) {
            dbPlayersRef.
            child(uid).
            set(regularPlayer);
        }
    }, [uid, players]);

    function fetchPlayers(snap) {
        snap.val() && setPlayers(snap.val());
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
