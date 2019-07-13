import React from 'react';
import { db } from '../../firebase';
import styles from './styles.css';

const Home = () => {
    return (
        <div className={styles.root}>
            adsdfasdf
        </div>
    )
};

export default Home;

// function registerGame() {
//     const gameId = Math.random().toString(36).substring(7);
//     const initialGameState = {
//         players: [{
//             role: 'lead',
//             name: 'Name'
//         }],
//         isEnded: false,
//         isStarted: false,
//         target: '',
//         canvasData: ''
//     };
//
//     db.ref(`games/${gameId}`).set(initialGameState);
// }