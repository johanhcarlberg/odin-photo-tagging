import { useEffect, useRef, useState } from "react";
import "../styles/GameBoard.css";
import Reticle from "./Reticle";
import ObjectivesList from "./ObjectivesList";
import useObjectives from "../effects/useObjectives";
import ObjectivePicker from "./ObjectivePicker";
import PlacedObjective from "./PlacedObjective";
import Results from "./Results";

const GameBoard = ({ image, onSelectNewImage }) => {
    const [showReticle, setShowReticle] = useState(true);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [showObjectivePicker, setShowObjectivePicker] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [placedObjectives, setPlacedObjectives] = useState([]);

    useEffect(() => {
        const loadImage = () => {
            const tempImg = new Image();
            tempImg.src = `images/${image.imageName}`;
        };

        loadImage();
    }, [image]);

    const updateMousePos = (e) => {
        if (!showObjectivePicker) {
            let x = e.clientX;
            let y = e.clientY;
            setMousePos({ x: x, y: y });
        }
    };

    const hideReticle = () => {
        setShowReticle(false);
    };

    const unhideReticle = () => {
        setShowReticle(true);
    };

    const onObjectivePick = (objective) => {
        if (!gameBoardImageRef.current) {
            return;
        }
        const bounds = gameBoardImageRef.current.getBoundingClientRect();
        const xOffset = mousePos.x - bounds.left;
        const yOffset = mousePos.y - bounds.top;
        const placedObjective = { ...objective, x: xOffset, y: yOffset };
        if (placedObjectives.find((obj) => obj.name === placedObjective.name)) {
            const filteredObjectives = placedObjectives.filter(
                (obj) => obj.name != placedObjective.name
            );
            setPlacedObjectives([...filteredObjectives, placedObjective]);
        } else {
            setPlacedObjectives((prevState) => [...prevState, placedObjective]);
        }
    };

    const objectives = useObjectives(image);

    const gameBoardImageRef = useRef();

    const allObjectivesPlaced = () => {
        return objectives.length === placedObjectives.length;
    };

    const onShowResults = () => {
        setShowResults(true);
    };

    const onTryAgain = () => {
        setPlacedObjectives([]);
        setShowResults(false);
    };

    return (
        <div className="game-board">
            <div
                className="game-board-image"
                aria-label="game-board-image"
                ref={gameBoardImageRef}
                style={{
                    backgroundImage: image && `url(images/${image.imageName})`,
                    cursor: showObjectivePicker && "default",
                }}
                onMouseMove={updateMousePos}
                onMouseLeave={hideReticle}
                onMouseEnter={unhideReticle}
                onClick={(e) => {
                    if (
                        e.target === e.currentTarget ||
                        e.target.className === "placed-objective"
                    ) {
                        setShowObjectivePicker(!showObjectivePicker);
                    } else {
                        setShowObjectivePicker(false);
                    }
                }}
            >
                {showReticle && <Reticle x={mousePos.x} y={mousePos.y} />}
                {showObjectivePicker && (
                    <ObjectivePicker
                        objectives={objectives}
                        position={mousePos}
                        onObjectivePick={onObjectivePick}
                    />
                )}
                {placedObjectives.length > 0 &&
                    placedObjectives.map((objective) => {
                        return (
                            <PlacedObjective
                                key={objective.name}
                                objective={objective}
                                gameBoardImageRef={gameBoardImageRef}
                            />
                        );
                    })}
                {allObjectivesPlaced() && (
                    <button
                        onMouseEnter={hideReticle}
                        onMouseLeave={unhideReticle}
                        aria-label="show-results-button"
                        onClick={() => onShowResults()}
                        className="show-results-button primary-button"
                    >
                        Show Results
                    </button>
                )}
            </div>
            {showResults && (
                <Results
                    placedObjectives={placedObjectives}
                    image={image}
                    onTryAgain={onTryAgain}
                    onSelectNewImage={onSelectNewImage}
                />
            )}
            <div className="game-board-objectives">
                <ObjectivesList objectives={objectives} />
            </div>
        </div>
    );
};

export default GameBoard;
