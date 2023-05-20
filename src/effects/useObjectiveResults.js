import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useObjectiveResults = (image, placedObjectives) => {
    const [objectiveResults, setObjectiveResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const isWithinBounds = (bounds, objective) => {
        if (!bounds || !bounds.left) {
            return false;
        }

        if (objective.x < bounds.left || objective.x > bounds.right) {
            return false;
        }

        if (objective.y < bounds.top || objective.y > bounds.bottom) {
            return false;
        }

        return true;
    };

    const loadBounds = async (objective) => {
        try {
            const path = `images/${image.name}/objectives/${objective.id}/bounds`;
            const querySnapshot = await getDocs(collection(db, path));
            if (querySnapshot.docs.length === 0) {
                return;
            }
            const boundsData = querySnapshot.docs.map((doc) => {
                const obj = {};
                const key = doc.id;
                obj[key] = doc.data()["value"];
                return obj;
            });
            const boundsObj = Object.assign(...boundsData);
            return boundsObj;
        } catch (error) {
            console.error("Error retrieving objective bounds", error);
        }
    };

    useEffect(() => {
        const loadObjectiveResults = async () => {
            setIsLoading(true);
            const newObjectiveResults = [];
            for (const placedObjective of placedObjectives) {
                const bounds = await loadBounds(placedObjective);
                const resultObj = {...placedObjective, result: isWithinBounds(bounds, placedObjective)};
                newObjectiveResults.push(resultObj);
            }
            setObjectiveResults(newObjectiveResults);
            setIsLoading(false);
        }
        
        loadObjectiveResults();
    }, []);

    return [objectiveResults, isLoading];
}

export default useObjectiveResults;