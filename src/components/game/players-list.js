import React, { useState, Fragment } from 'react';
import { bool, shape, string, func } from 'prop-types';

const PlayersList = ({ players, uid, onSetPlayerName }) => {
    const [playerName, setPlayerName] = useState('');

    function introduceForm() {
        return (
            <>
                <input type='text' placeholder='имя игрока' onChange={handlePlayerNameTyping} />
                <button onClick={() => {onSetPlayerName(playerName)}}>Представьтесь</button>
            </>
        );
    }

    function renderPlayerReply(player) {
        if (player.isLead) {
            return <div>{player.reply}</div>
        }

        return (
            <input type='text' placeholder='Пишите сюда предполагаемое слово'  onChange={handlePlayerReplyChange} />
        )
    }

    function handlePlayerReplyChange(e) {
        console.log(e.target.value);
    }

    function handlePlayerNameTyping(e) {
        setPlayerName(e.target.value);
    }

    if (!players[uid].isLead && !players[uid].name) {
        return introduceForm()
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
    }).isRequired,
    uid: string.isRequired,
    onSetPlayerName: func.isRequired
};

export default PlayersList;