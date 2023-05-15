import "../styles/Results.css";
import ObjectiveResult from "./ObjectiveResult";

const Results = ({ placedObjectives, image, onTryAgain, onSelectNewImage }) => {
    return (
        <div className="results-wrapper">
            <div className="results-modal">
                <h1>Results</h1>
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
