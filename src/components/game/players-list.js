import React from 'react';
import { bool, shape } from 'prop-types';

// import styles from './styles.css';

const PlayersList = ({ players, isCurrentPlayerLead }) => {
    {console.log(isCurrentPlayerLead)}
    return Object.keys(players).map(item => <div key={item}>{item}</div>);
};

PlayersList.propTypes = {
    players: shape({
        isLead: bool
    }).isRequired,
    isCurrentPlayerLead: bool.isRequired
};

export default PlayersList;