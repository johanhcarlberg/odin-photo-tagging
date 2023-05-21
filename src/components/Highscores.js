import useHighscores from "../effects/useHighscores";

const Highscores = ({ image, onClose }) => {
    const highscores = useHighscores(image);
    return (
        <div className="highscores">
            <h3>High Scores</h3>
            <button onClick={onClose} aria-label="close-button-corner">
                Close
            </button>
            {highscores.map((score) => {
                return (
                    <div className="highscores-item" key={score.id}>
                        <p className="highscore-name">{score.name}</p>
                        <p className="highscore-time">{score.time + "s"}</p>
                    </div>
                );
            })}
            <button onClick={onClose} aria-label="close-button">
                Close
            </button>
        </div>
    );
};

export default Highscores;
