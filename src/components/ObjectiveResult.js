import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const ObjectiveResult = ({image, objective}) => {
    const [bounds, setBounds] = useState([]);
    useEffect(() => {
        const loadBounds = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, `images/${image.name}/objectives/${objective.id}/bounds`));
                const boundsData = querySnapshot.docs.map(doc => doc.data());
                console.log(boundsData);
                setBounds(boundsData);
            } catch (error) {
                console.error('Error retrieving objective bounds', error);
            }

            loadBounds();
        }
    }, [objective, image])

    return (
        <div className="objective-result"></div>
    )
}

export default ObjectiveResult;