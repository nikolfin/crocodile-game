import React, { useState, useEffect } from 'react';

export const usePlayers = (ref) => {
    const [players, setPlayers] = useState(null);

    // фетчим список игроков с бд
    useEffect(() => {
        ref.on('value', fetchPlayers);

        return () => {
            ref.off('value', fetchPlayers);
        }
    }, []);

    function fetchPlayers(snap) {
        snap.val() && setPlayers(snap.val());
    }

    // добавляем нового игрока после того как он указал имя
    function addNewPlayer(uid, playerName) {
        if (!playerName) {
            throw Error('Игрок должен ввести имя');
        }

        ref.child(uid).set({
            isLead: false,
            name: playerName
        }, () => {
            console.log('player was added');
        });
    }

    // записваем ответы игроков
    function setPlayerReply(playerUid, reply) {
        ref.child(playerUid).update({
            reply
        });
    }

    return [
        players,
        addNewPlayer,
        setPlayerReply
    ]
};
