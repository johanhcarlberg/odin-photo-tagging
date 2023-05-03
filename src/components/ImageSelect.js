import { useEffect, useState } from 'react';
import { db } from '../firebase';
import '../styles/ImageSelector.css';
import { collection, getDocs } from 'firebase/firestore';

const ImageSelect = () => {
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
    });

    return (
        <div className='image-selector-wrapper'>
            <div className='image-selector'>
            <h1>Images</h1>
            
            </div>
        </div>
    )
}

export default ImageSelect;