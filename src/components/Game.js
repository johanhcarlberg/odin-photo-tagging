import { useState } from "react";
import ImageSelect from "./ImageSelect";
import '../styles/Game.css';
import GameBoard from "./GameBoard";

const Game = () => {
    const [gameState, setGameState] = useState('gameStart');
    const [selectedImage, setSelectedImage] = useState(null);

    const onImageConfirm = (image) => {
        console.log(image);
        setGameState('gamePlaying')
        setSelectedImage(image);
    }
    return (
        <div className="game-main">
            {gameState === 'gameStart' &&
                <ImageSelect onConfirm={onImageConfirm}/>
            }

            {gameState === 'gamePlaying' &&
                <GameBoard image={selectedImage}/>
            }
        </div>
    )
}

export default Game;