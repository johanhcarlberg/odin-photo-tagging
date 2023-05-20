import { useState } from "react";

const HighscoreSubmit = ({onSubmit}) => {
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
                className="highscore-submit"
                disabled={highscoreName.length === 0}
                onClick={onSubmit}
            >
                Submit
            </button>
        </div>
    );
};

export default HighscoreSubmit;
