import { useEffect, useState } from 'react';
import { db } from '../firebase';
import '../styles/ImageSelect.css';
import { collection, getDocs } from 'firebase/firestore';
import ImageSelector from './ImageSelector';

const ImageSelect = ({onConfirm}) => {
    const [images, setImages] = useState([]);

    const loadImages = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'images'));
            const imagesData = querySnapshot.docs.map(doc => doc.data());
            setImages(imagesData);
        } catch(error) {
            console.error('Error retrieving images', error);
        }
    }

    useEffect(() => {
        loadImages();
    }, []);

    return (
            <div className='image-select'>
            <h1>Select Image</h1>
                <ImageSelector onConfirm={onConfirm} images={images} />
            </div>
    )
}

export default ImageSelect;