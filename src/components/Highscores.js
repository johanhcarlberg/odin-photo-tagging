import useHighscores from "../effects/useHighscores";
import "../styles/Highscores.css";

const Highscores = ({ image, onClose }) => {
    const highscores = useHighscores(image);
    return (
        <div className="highscores">
            <h2>High Scores</h2>
            <button
                onClick={onClose}
                className="close-button-corner"
                aria-label="close-button-corner"
            >
                Close
            </button>
            <div className="highscores-header">
                <p className="highscore-name-header">Name</p>
                <p className="highscore-time-header">Time</p>
            </div>
            {highscores.map((score) => {
                return (
                    <div className="highscores-item" key={score.id}>
                        <p className="highscore-item-name">
                            {score.name || "Unknown"}
                        </p>
                        <p className="highscore-item-time">
                            {score.time + "s"}
                        </p>
                    </div>
                );
            })}
            <button
                onClick={onClose}
                className="close-button primary-button"
                aria-label="close-button"
            >
                Close
            </button>
        </div>
    );
};

export default Highscores;
