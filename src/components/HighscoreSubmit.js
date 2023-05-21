import { useState } from "react";
import "../styles/HighscoreSubmit.css";

const HighscoreSubmit = ({ onSubmit, submitDisabled }) => {
    const [highscoreName, setHighscoreName] = useState("");

    return (
        <div className="highscore-entry">
            <label htmlFor="highscore-name" className="highscore-name-label">
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
                className="highscore-submit primary-button"
                disabled={highscoreName.length === 0 || submitDisabled === true}
                onClick={(e) => onSubmit(highscoreName)}
            >
                Submit
            </button>
        </div>
    );
};

export default HighscoreSubmit;
