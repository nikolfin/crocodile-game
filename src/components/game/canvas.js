import React, { useEffect, useState, useRef } from 'react';
import { string, bool } from 'prop-types';
import firebase from '../../firebase';
import styles from './styles.css';

const Canvas = ({ gameId, isTheDrawingPlayerLead }) => {
    const dbCanvasRef = firebase.db.ref(`games/${gameId}/canvasData`);
    const [localCanvasData, setLocalCanvasData] = useState({});
    const [isPressed, setIsPressed] = useState(false);
    const [isCleared, setIsCleared] = useState(true);
    const cnv = useRef(null);

    useEffect(() => {
        dbCanvasRef.on('value', listenCanvasDataFromDb);

        return () => {
            dbCanvasRef.off('value', listenCanvasDataFromDb);
        }
    }, []);

    useEffect(() => {
        dbCanvasRef.set({
            coordinates: localCanvasData,
            pressed: isPressed,
            cleared: isCleared
        });
    }, [isPressed, localCanvasData, isCleared]);

    function listenCanvasDataFromDb(snap) {
        const { coordinates, pressed, cleared } = snap.val();
        const ctx = cnv.current.getContext('2d');

        if (coordinates && pressed) {
            const { x, y } = coordinates;

            ctx.lineWidth = 10;
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        if (!pressed) {
            ctx.beginPath();
        }

        if (!cleared) {
            ctx.clearRect(0, 0, cnv.current.width, cnv.current.height);
            setIsCleared(true);
        }
    }

    function handleMouseMove(e) {
        if (!isTheDrawingPlayerLead) return;
        setLocalCanvasData({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY
        });
    }

    return (
        <div style={{ background: '#f0f0f0' }}>
            {isTheDrawingPlayerLead ?
                <div onClick={() => {setIsCleared(false)}}>clear</div> : null}
            <canvas
                ref={cnv}
                width={500}
                height={500}
                className={styles.canvas}
                onMouseMove={handleMouseMove}
                onMouseDown={() => {setIsPressed(true)}}
                onMouseUp={() => {
                    setIsPressed(false);
                    const ctx = cnv.current.getContext('2d');
                }}
            />
        </div>
    );
};

Canvas.propTypes = {
    gameId: string.isRequired,
    isTheDrawingPlayerLead: bool.isRequired
};

export default Canvas;
