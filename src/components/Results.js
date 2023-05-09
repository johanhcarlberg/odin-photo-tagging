import "../styles/Results.css";

const Results = ({ placedObjectives }) => {
    return (
        <div class="results-wrapper">
            <div className="results-modal">
                <h1>Results</h1>
                <div className="results-content"></div>
                <button className="primary-button">Try Again</button>
                <button className="primary-button">Select new image</button>
            </div>
        </div>
    );
};

export default Results;
