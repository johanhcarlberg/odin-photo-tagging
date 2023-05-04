import { useEffect, useState } from "react";
import '../styles/ImageSelector.css';

import { collection, getDocs, where, query, doc } from 'firebase/firestore';
import { db } from '../firebase';
import ObjectivesList from "./ObjectivesList";

const ImageSelector = ({images, onConfirm}) => {
    const [currentImage, setCurrentImage] = useState(null);


    const nextImage = () => {
       if (images.length <= 1) {
        return;
       }

       if (currentImage.index === images.length - 1) {
        const nextIndex = 0;
        setCurrentImage(
            {
                ...images[nextIndex],
                index: nextIndex
            }
        )
       } else {
        const nextIndex = currentImage.index + 1;
        setCurrentImage(
            {
                ...images[nextIndex],
                index: nextIndex
            }
        )
       }
    }

    const prevImage = () => {
        if (images.length <= 1) {
            return;
        }

        if (currentImage.index === 0) {
            const nextIndex = images.length - 1;
            setCurrentImage(
                {
                    ...images[nextIndex],
                    index: nextIndex
                }
            )
        } else {
            const nextIndex = currentImage.index - 1;
            setCurrentImage(
                {
                    ...images[nextIndex],
                    index: nextIndex
                }
            )
        }
    }

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
            <button 
                onClick={prevImage}
                disabled={images.length <= 1}>Prev</button>
            <div className="current-image"
                style={{backgroundImage: currentImage && `url(images/${currentImage.imageName})`}} 
            ></div>
            <button 
            onClick={nextImage}
            disabled={images.length <= 1}>Next</button>
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