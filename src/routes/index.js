import React from 'react';
import Home from '../components/home/home';
import Game from '../components/game/game';

export default {
    '/': () => <Home />,
    '/game/:gameId': ({ gameId }) => <Game gameId={gameId} />
};