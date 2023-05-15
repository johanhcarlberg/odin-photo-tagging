import { useEffect, useState } from "react";
import "../styles/ImageSelector.css";

import { collection, getDocs, where, query, doc } from "firebase/firestore";
import { db } from "../firebase";
import ObjectivesList from "./ObjectivesList";
import useObjectives from "../effects/useObjectives";

const ImageSelector = ({ images, onConfirm }) => {
    const [currentImage, setCurrentImage] = useState(null);

    const nextImage = () => {
        if (images.length <= 1) {
            return;
        }

        if (currentImage.index === images.length - 1) {
            const nextIndex = 0;
            setCurrentImage({
                ...images[nextIndex],
                index: nextIndex,
            });
        } else {
            const nextIndex = currentImage.index + 1;
            setCurrentImage({
                ...images[nextIndex],
                index: nextIndex,
            });
        }
    };

    const prevImage = () => {
        if (images.length <= 1) {
            return;
        }

        if (currentImage.index === 0) {
            const nextIndex = images.length - 1;
            setCurrentImage({
                ...images[nextIndex],
                index: nextIndex,
            });
        } else {
            const nextIndex = currentImage.index - 1;
            setCurrentImage({
                ...images[nextIndex],
                index: nextIndex,
            });
        }
    };

    useEffect(() => {
        for (let image of images) {
            const img = new Image();
            img.src = `/images/${image.imageName}`;
        }

        if (images.length > 0) {
            setCurrentImage({
                ...images[0],
                index: 0,
            });
        }
    }, [images]);

    const objectives = useObjectives(currentImage);

    return (
        <div className="image-selector">
            {currentImage && (
                <h3 className="current-image-name">{currentImage.name}</h3>
            )}
            <button
                className="previous-image-button"
                onClick={prevImage}
                disabled={images.length <= 1}
            >
                Prev
            </button>
            <div
                className="current-image"
                style={{
                    backgroundImage:
                        currentImage && `url(images/${currentImage.imageName})`,
                }}
            ></div>
            <button
                className="next-image-button"
                onClick={nextImage}
                disabled={images.length <= 1}
            >
                Next
            </button>
            {objectives.length > 0 && (
                <ObjectivesList objectives={objectives} />
            )}
            <button
                className="confirm-button primary-button"
                disabled={!currentImage}
                onClick={() => onConfirm(currentImage)}
            >
                Confirm
            </button>
        </div>
    );
};

export default ImageSelector;
