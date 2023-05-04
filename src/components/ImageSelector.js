import { useEffect, useState } from "react";
import '../styles/ImageSelector.css';

import { collection, getDocs, where, query, doc } from 'firebase/firestore';
import { db } from '../firebase';
import ObjectivesList from "./ObjectivesList";

const ImageSelector = ({images, onConfirm}) => {
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        for (let image of images) {
            const img = new Image();
            img.src = `/images/${image.imageName}`;
        }

        if (images.length > 0) {
            setCurrentImage(images[0]);
        }
    });
    return (
        <div className="image-selector">
            <button>Prev</button>
            <div className="current-image"
                style={{backgroundImage: currentImage && `url(images/${currentImage.imageName})`}} 
            ></div>
            <button>Next</button>
            {currentImage && 
                <ObjectivesList image={currentImage} />
            }
            <button
                className="confirm-button"
                disabled={!currentImage}
                onClick={() => onConfirm(currentImage)}>
                Confirm
            </button>
        </div>
    )
}

export default ImageSelector;