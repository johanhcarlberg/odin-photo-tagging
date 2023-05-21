import "../styles/ObjectiveResult.css";
import { FaCheck, FaTimes } from "react-icons/fa";

const ObjectiveResult = ({ objective }) => {
    return (
        <div className="objective-result">
            <p className="objective-result-name">{objective.name}</p>
            <p className="objective-result-check">
                {objective.result === true ? (
                    <FaCheck className="objective-result-true" />
                ) : (
                    <FaTimes className="objective-result-false" />
                )}
            </p>
        </div>
    );
};

export default ObjectiveResult;
