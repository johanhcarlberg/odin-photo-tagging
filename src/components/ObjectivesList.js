import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import '../styles/ObjectivesList.css';

const ObjectivesList = ({image}) => {
    const [objectives, setObjectives] = useState([]);
    
    const getObjectives = async () => {
        try {
            const objectivesRef = collection(db, 'images', image.name, 'objectives');
            const querySnapshot = await getDocs(objectivesRef);
            const objectivesData = querySnapshot.docs.map(doc => doc.data());
            setObjectives(objectivesData);
            console.log(objectivesData);
            
        } catch (error) {
            console.error('Error retrieving objectives', error);
        }
    }

    useEffect(() => {
        getObjectives();
    }, [image]);

    return (
        <div className="objectives">
        <h3>Objectives</h3>
            {objectives.map(objective => {
                return <p key={objective.name}>{objective.name}</p>
            })}
        </div>
    )
}

export default ObjectivesList;