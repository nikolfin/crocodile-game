import React, { useState } from 'react';
import { db, auth, signIn } from '../../firebase';
import { navigate } from 'hookrouter';
import styles from './styles.css';

const gameId = Math.random().toString(36).substring(7);

signIn();

const Home = () => {
    const [word, setWord] = useState(null);
    const [uid, setUid] = useState(null);

    function registerGame() {
        db.
        ref(`games/${gameId}`).
        set({
            players: {
                [uid]: {
                    isLead: true
                }
            },
            isEnded: false,
            isStarted: false,
            targetWord: word,
            canvasData: ''
        }, () => {
            navigate(`/game/${gameId}`)
        });
    }

    auth.onAuthStateChanged(user => {
        user && setUid(user.uid);
    });

    return (
        <div className={styles.root}>
            <div>
                <input type='text' onChange={e => setWord(e.target.value)} placeholder='Придумайте слово' />
            </div>
            <button onClick={registerGame}>Играть</button>
        </div>
    )
};

export default Home;