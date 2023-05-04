import { useState } from "react";
import ImageSelect from "./ImageSelect";
import '../styles/Game.css';

const Game = () => {
    const [gameState, setGameState] = useState('gameStart');

    const onImageConfirm = (image) => {
        console.log(image);
        setGameState('gamePlaying')
    }
    return (
        <div className="game-main">
            {gameState === 'gameStart' &&
                <ImageSelect onConfirm={onImageConfirm}/>
            }
        </div>
    )
}

export default Game;