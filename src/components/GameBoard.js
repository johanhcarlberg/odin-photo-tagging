import { useEffect } from "react";
import "../styles/GameBoard.css";

const GameBoard = ({ image }) => {
    useEffect(() => {
        const loadImage = () => {
            const tempImg = new Image();
            tempImg.src = `images/${image.imageName}`;
        };

        loadImage();
    }, [image]);

    return (
        <div className="game-board">
            <div
                className="game-board-image"
                style={{
                    backgroundImage: image && `url(images/${image.imageName})`,
                }}
            ></div>
        </div>
    );
};

export default GameBoard;
