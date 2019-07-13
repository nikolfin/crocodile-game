import React from 'react';
import Home from '../components/home/home';

const index = {
    '/': () => <Home />,
    '/game/:gameId': ({ gameId }) => <div>{gameId}</div>
};

export default index;