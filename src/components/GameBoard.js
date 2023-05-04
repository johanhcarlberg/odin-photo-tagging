import { useEffect, useState } from "react";
import "../styles/GameBoard.css";

const GameBoard = ({ image }) => {
    const [mousePos, setMousePos] = useState(null);

    useEffect(() => {
        const loadImage = () => {
            const tempImg = new Image();
            tempImg.src = `images/${image.imageName}`;
        };

        loadImage();
    }, [image]);

    const updateMousePos = (e) => {
        setMousePos({x: e.clientX, y: e.clientY});
    }

    return (
        <div className="game-board">
            <div
                className="game-board-image"
                style={{
                    backgroundImage: image && `url(images/${image.imageName})`,
                }}
                onMouseMove={updateMousePos}
            >
            </div>
        </div>
    );
};

export default GameBoard;
