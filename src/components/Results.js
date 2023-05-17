import "../styles/Results.css";
import ObjectiveResult from "./ObjectiveResult";
import useTime from "../effects/useTime";

const Results = ({
    placedObjectives,
    image,
    onTryAgain,
    onSelectNewImage,
    startTime,
}) => {
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
