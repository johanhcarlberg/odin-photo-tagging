import "../styles/Results.css";
import ObjectiveResult from "./ObjectiveResult";
import useTime from "../effects/useTime";
import useObjectiveResults from "../effects/useObjectiveResults";
import HighscoreSubmit from "./HighscoreSubmit";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import useHighscores from "../effects/useHighscores";
import Highscores from "./Highscores";

const Results = ({
    placedObjectives,
    image,
    onTryAgain,
    onSelectNewImage,
    startTime,
}) => {
    const endTime = useTime();
    const timeToDisplay = (endTime - startTime) / 1000;
    const [objectiveResults, isLoading] = useObjectiveResults(
        image,
        placedObjectives
    );
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [showHighscores, setShowHighscores] = useState(false);

    const onHighscoreSubmit = async (name) => {
        console.log(name);
        if (!isTimeTopTen()) {
            return;
        }
        setSubmitDisabled(true);
        const path = `images/${image.name}/highscores`;
        const docRef = await addDoc(collection(db, path), {
            name: name || "Unknown",
            time: timeToDisplay,
        });
    };

    const highscores = useHighscores(image);

    const isTimeTopTen = () => {
        if (highscores.length < 10) {
            return true;
        }

        return highscores[highscores.length - 1] > timeToDisplay;
    };
    return (
        <div className="results-wrapper">
            <div className="results-modal">
                {showHighscores ? (
                    <Highscores
                        image={image}
                        onClose={() => setShowHighscores(false)}
                    />
                ) : (
                    <div>
                        <h1>Results</h1>
                        <h3 className="time-elapsed">
                            Time elapsed: {timeToDisplay}s
                        </h3>
                        <div className="results-content">
                            {isLoading === false &&
                                objectiveResults.map((objective) => {
                                    return (
                                        <ObjectiveResult
                                            key={objective.id}
                                            objective={objective}
                                        />
                                    );
                                })}
                        </div>
                        {objectiveResults.filter((obj) => obj.result === true)
                            .length === placedObjectives.length &&
                            placedObjectives.length > 0 &&
                            isTimeTopTen() && (
                                <HighscoreSubmit
                                    onSubmit={onHighscoreSubmit}
                                    submitDisabled={submitDisabled}
                                />
                            )}
                        <div className="results-buttons">
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
                            <button
                                className="show-scores-button primary-button"
                                aria-label="show-scores-button"
                                onClick={() => setShowHighscores(true)}
                            >
                                Show High Scores
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Results;
