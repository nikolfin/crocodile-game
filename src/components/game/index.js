import React, { useState } from 'react';
import { string } from 'prop-types';
import firebase from '../../firebase';
import Canvas from './canvas';
import { useAuth, usePlayers } from '../../hooks';
import styles from './styles.css';

const Game = ({ gameId }) => {
    const dbPlayersRef = firebase.db.ref(`games/${gameId}/players`);
    const [uid, signInAnonymously] = useAuth();
    const [players, addNewPlayer, setPlayerReply] = usePlayers(dbPlayersRef);
    const [playerName, setPlayerName] = useState('');

    // Авторизуем игрока и получаем его uid
    signInAnonymously();

    function handlePlayerNameTyping(e) {
        setPlayerName(e.target.value);
    }

    if (!(players && uid)) {
        return <div>Loading...</div>
    }

    // если игрока нет в общем списке
    // показываем форму ввода имени
    if (!players[uid]) {
        return (
            <>
                <input type='text' placeholder='имя игрока' value={playerName} onChange={handlePlayerNameTyping} />
                <button onClick={() => {addNewPlayer(uid, playerName)}}>Представьтесь</button>
            </>
        );
    }

    return (
        <div className={styles.root}>
            {(Object.keys(players).map((playerUid, i) => {
                const { name, reply, isLead } = players[playerUid];
                const canReply = playerUid === uid;

                if (isLead) {
                    return null;
                }

                return (
                    <div key={i}>
                        <div>{name}</div>
                        {canReply ?
                            <input
                                type='text'
                                placeholder='Пишите сюда предполагаемое слово'
                                value={reply}
                                onChange={e => {
                                    setPlayerReply(playerUid, e.target.value);
                                }}
                            /> :
                            <div className={styles.reply}>{reply || '...'}</div>
                        }
                    </div>
                )
            }))}
            <Canvas gameId={gameId} isTheDrawingPlayerLead={players[uid].isLead} />
        </div>
    )
};

Game.propTypes = {
    gameId: string
};

export default Game;
