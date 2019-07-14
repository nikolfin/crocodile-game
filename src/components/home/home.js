import React, { useState, useEffect } from 'react';
import { db, auth, signIn } from '../../firebase';
import { navigate } from 'hookrouter';
import styles from './styles.css';

const gameId = Math.random().toString(36).substring(7);

// Атвторизуемся анонимным пользователем
signIn();

const Home = () => {
    const [word, setWord] = useState(null);
    const [uid, setUid] = useState(null);

    // записываем в стейт id пользователя
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            user && setUid(user.uid);
        });
    }, []);

    // регистрирует новую игру и добавляет в бд
    // если игрок регистрирует новую игру, то он является ведущим
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
            // после успешного добавления игры в бд редиректим на стр игры
            navigate(`/game/${gameId}`)
        });
    }

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
