import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import firebase from '../../firebase';
import PlayersList from './players-list';
import styles from './styles.css';

const regularPlayer = {
    isLead: false
};

const Game = ({ gameId }) => {
    const dbPlayersRef = firebase.db.ref(`games/${gameId}/players`);
    const [uid, setUid] = useState(null);
    const [players, setPlayers] = useState(null);

    // регистрируем игрока
    firebase.registerPlayer();

    // фетчим список игроков с бд
    useEffect(() => {
        dbPlayersRef.on('value', fetchPlayers);
        return () => {
            dbPlayersRef.off('value', fetchPlayers);
        }
    }, []);

    // записываем в стейт id игрока
    useEffect(() => {
        firebase.onPlayerRegistered(user => {
            user && setUid(user.uid);
        });
    }, []);

    // Проверяем есть ли такой пользователь в бд,
    // если нет, то добавляем и назначем ему статус isLead = false
    useEffect(() => {
        if (uid && players && !players[uid]) {
            dbPlayersRef.child(uid).set(regularPlayer, () => {
                console.log('player was added');
            });
        }
    }, [uid, players]);

    function fetchPlayers(snap) {
        snap.val() && setPlayers(snap.val());
    }

    function handleSetPlayerName(name) {
        dbPlayersRef.child(uid).update({ name });
    }

    if (!(players && players[uid])) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.root}>
            <PlayersList
                players={players}
                uid={uid}
                onSetPlayerName={handleSetPlayerName}
            />
        </div>
    )
};

Game.propTypes = {
    gameId: string
};

export default Game;
