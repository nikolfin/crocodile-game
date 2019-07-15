import React, { useState, Fragment } from 'react';
import { bool, shape, string, func } from 'prop-types';

const PlayersList = ({ players }) => {
    const [reply, setReply] = useState('');

    function renderPlayerReply(player) {
        if (player.isLead) {
            return <div>{player.reply}</div>
        }

        return (
            <input type='text' placeholder='Пишите сюда предполагаемое слово' value={reply}  onChange={handlePlayerReplyChange} />
        )
    }

    function handlePlayerReplyChange(e) {
        setReply(e.target.value);
    }

    return Object.keys(players).map((player, i) => {
        const { name, isLead } = players[player];

        if (isLead) return null;

        return (
            <Fragment key={i}>
                <div>{name}</div>
                {renderPlayerReply(player)}
            </Fragment>
        )
    });
};

PlayersList.propTypes = {
    players: shape({
        uid: shape({
            isLead: bool.isRequired,
            name: string,
            reply: string
        })
    }).isRequired
};

export default PlayersList;