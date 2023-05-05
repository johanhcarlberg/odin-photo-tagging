import { useEffect, useState } from "react";
import "../styles/GameBoard.css";
import Reticle from "./Reticle";
import ObjectivesList from "./ObjectivesList";
import useObjectives from "../effects/useObjectives";
import ObjectivePicker from "./ObjectivePicker";

const GameBoard = ({ image }) => {
    const [showReticle, setShowReticle] = useState(true);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [showObjectivePicker, setShowObjectivePicker] = useState(false);

    useEffect(() => {
        const loadImage = () => {
            const tempImg = new Image();
            tempImg.src = `images/${image.imageName}`;
        };

        loadImage();
    }, [image]);

    const updateMousePos = (e) => {
        if (!showObjectivePicker) {
            setMousePos({ x: e.clientX, y: e.clientY });
        }
    };

    const hideReticle = () => {
        console.log("hide reticle");
        setShowReticle(false);
    };

    const unhideReticle = () => {
        setShowReticle(true);
    };

    const onObjectivePick = (objective) => {
        console.log(objective);
    };

    const objectives = useObjectives(image);

    return (
        <div className="game-board">
            <div
                className="game-board-image"
                style={{
                    backgroundImage: image && `url(images/${image.imageName})`,
                    cursor: showObjectivePicker && "default",
                }}
                onMouseMove={updateMousePos}
                onMouseLeave={hideReticle}
                onMouseEnter={unhideReticle}
                onClick={() => setShowObjectivePicker(!showObjectivePicker)}
            >
                {showReticle && <Reticle x={mousePos.x} y={mousePos.y} />}
                {showObjectivePicker && (
                    <ObjectivePicker
                        objectives={objectives}
                        position={mousePos}
                        onObjectivePick={onObjectivePick}
                    />
                )}
            </div>
            <div className="game-board-objectives">
                <ObjectivesList objectives={objectives} />
            </div>
        </div>
    );
};

export default GameBoard;
