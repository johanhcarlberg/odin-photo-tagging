import { Children } from "react";
import "../styles/Modal.css";

const Modal = ({ children }) => {
    console.log(children);
    return (
        <div className="modal">
            <div className="modal-content">{children}</div>
        </div>
    );
};

export default Modal;
