import useHighscores from "../effects/useHighscores";

const Highscores = ({image}) => {
    const highscores = useHighscores(image);
    return (
        <div className="highscores">
            {highscores.map(score => {
                return (
                    <div className="highscores-item" key={score.id}>
                        <p className="highscore-name">{score.name}</p>
                        <p className="highscore-time">{score.time + 's'}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Highscores;