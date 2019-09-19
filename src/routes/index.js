import React from 'react';
import Start from '../components/start';
import Game from '../components/game';

export default {
    '/': () => <Start />,
    '/game/:gameId': ({ gameId }) => <Game gameId={gameId} />
};
