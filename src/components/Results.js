import "../styles/Results.css";

const Results = ({ placedObjectives }) => {
    return (
        <div class="results-wrapper">
            <div className="results">
                <h1>Results</h1>
                <button className="primary-button">Try Again</button>
                <button className="primary-button">Select new image</button>
            </div>
        </div>
    );
};

export default Results;
