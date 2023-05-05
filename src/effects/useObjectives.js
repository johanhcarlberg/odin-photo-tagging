import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useObjectives = (image) => {
    const [objectives, setObjectives] = useState([]);

    useEffect(() => {
        const getObjectives = async () => {
            try {
                const objectivesRef = collection(db, 'images', image.name, 'objectives');
                const querySnapshot = await getDocs(objectivesRef);
                const objectivesData = querySnapshot.docs.map(doc => doc.data());
                setObjectives(objectivesData);
                
            } catch (error) {
                console.error('Error retrieving objectives', error);
            }
        }

        if (image) {
            getObjectives();
        }
    }, [image])

    return objectives;
}

export default useObjectives;