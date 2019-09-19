import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import { navigate } from 'hookrouter';
import { useAuth } from '../../hooks';
import styles from './styles.css';

const Start = () => {
    const gameId = Math.random().toString(36).substring(7);
    const [word, setWord] = useState(null);
    const [uid, signInAnonymously] = useAuth();

    // Авторизуем игрока и получаем его uid
    signInAnonymously();

    // регистрирует новую игру и добавляет в бд
    // если игрок регистрирует новую игру, то он является ведущим
    function registerGame() {
        firebase.db.
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

export default Start;
