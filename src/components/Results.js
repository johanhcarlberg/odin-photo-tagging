import "../styles/Results.css";
import ObjectiveResult from "./ObjectiveResult";
import useTime from "../effects/useTime";
import useObjectiveResults from "../effects/useObjectiveResults";
import HighscoreSubmit from "./HighscoreSubmit";

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
    const onHighscoreSubmit = () => {
        console.log('submit highscore');
    }

    return (
        <div className="results-wrapper">
            <div className="results-modal">
                <h1>Results</h1>
                <h3 className="time-elapsed">Time elapsed: {timeToDisplay}s</h3>
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
                
                {(objectiveResults.filter((obj) => obj.result === true)
                    .length === placedObjectives.length && placedObjectives.length > 0) && (
                    <HighscoreSubmit onSubmit={onHighscoreSubmit}/>
                )}

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
