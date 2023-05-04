import { useEffect, useState } from "react";
import "../styles/GameBoard.css";
import Reticle from "./Reticle";

const GameBoard = ({ image }) => {
    const [showReticle, setShowReticle] = useState(true);
    const [mousePos, setMousePos] = useState({x: 0, y: 0});

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

    const hideReticle = () => {
        console.log('hide reticle');
        setShowReticle(false);
    }

    const unhideReticle = () => {
        setShowReticle(true);
    }

    return (
        <div className="game-board">
            <div
                className="game-board-image"
                style={{
                    backgroundImage: image && `url(images/${image.imageName})`,
                }}
                onMouseMove={updateMousePos}
                onMouseLeave={hideReticle}
                onMouseEnter={unhideReticle}
            >
                {showReticle && <Reticle x={mousePos.x} y={mousePos.y}/>}
            </div>
            </div>
        </div>
    );
};

export default GameBoard;
