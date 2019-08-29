import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import firebase from '../../firebase';
import PlayersList from './players-list';
import Canvas from './canvas';
import styles from './styles.css';

const Game = ({ gameId }) => {
    const dbPlayersRef = firebase.db.ref(`games/${gameId}/players`);
    const [uid, setUid] = useState(null);
    const [players, setPlayers] = useState(null);
    const [showIntroduceForm, setShowIntroduceForm] = useState(false);
    const [playerName, setPlayerName] = useState('');

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
        if (players && !players[uid]) {
            setShowIntroduceForm(true);
        }
    }, [uid, players]);

    function fetchPlayers(snap) {
        snap.val() && setPlayers(snap.val());
    }

    function handlePlayerNameTyping(e) {
        setPlayerName(e.target.value);
    }

    function addNewPlayer() {
        dbPlayersRef.child(uid).set({
            isLead: false,
            name: playerName
        }, () => {
            console.log('player was added');
        });
    }

    if (!players) {
        return <div>Loading...</div>
    }

    if (showIntroduceForm && !players[uid]) {
        return (
            <>
                <input type='text' placeholder='имя игрока' value={playerName} onChange={handlePlayerNameTyping} />
                <button onClick={addNewPlayer}>Представьтесь</button>
            </>
        );
    }

    return (
        <div className={styles.root}>
            <PlayersList
                players={players}
                uid={uid}
            />
            <Canvas gameId={gameId} />
        </div>
    )
};

Game.propTypes = {
    gameId: string
};

export default Game;

// компонент холста для рисования