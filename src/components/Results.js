import "../styles/Results.css";
import ObjectiveResult from "./ObjectiveResult";
import useTime from "../effects/useTime";
import { useState } from "react";

const Results = ({
    placedObjectives,
    image,
    onTryAgain,
    onSelectNewImage,
    startTime,
}) => {
    const [highscoreName, setHighscoreName] = useState("");
    const endTime = useTime();
    const timeToDisplay = (endTime - startTime) / 1000;

    return (
        <div className="results-wrapper">
            <div className="results-modal">
                <h1>Results</h1>
                <h3 className="time-elapsed">Time elapsed: {timeToDisplay}s</h3>
                <div className="results-content">
                    {placedObjectives.map((objective) => (
                        <ObjectiveResult
                            key={objective.id}
                            objective={objective}
                            image={image}
                        />
                    ))}
                </div>
                <label
                    htmlFor="highscore-name"
                    className="highscore-name-label"
                >
                    Highscore name
                </label>
                <input
                    name="highscore-name"
                    aria-label="highscore-name"
                    className="highscore-name"
                    value={highscoreName}
                    onChange={(e) => setHighscoreName(e.target.value)}
                />
                <button
                    className="primary-button"
                    aria-label="try-again-button"
                    onClick={onTryAgain}
                >
                    Try Again
                </button>
                <button
                    className="primary-button"
                    aria-label="select-new-image-button"
                    onClick={onSelectNewImage}
                >
                    Select new image
                </button>
            </div>
        </div>
    );
};

export default Results;
