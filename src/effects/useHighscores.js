import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useHighscores = (image) => {
    const [highscores, setHighscores] = useState([]);
    useEffect(() => {
        const loadHighscores = async () => {
            try {
                const path = `images/${image.name}/highscores`;
                const querySnapshot = await getDocs(collection(db, path));
                if (querySnapshot.docs.length === 0) {
                    return;
                }
                const highscoresData = querySnapshot.docs.map((doc) =>
                    {
                        const data = doc.data();
                        return {id: doc.id, ...data};
                    }
                );
                highscoresData.sort();
                if (highscoresData.length > 10) {
                    highscoresData.splice(9);
                }
                setHighscores(highscoresData);
            } catch (error) {
                console.error("Error when loading highscores", error);
            }
        };
        loadHighscores();
    }, [image]);

    return highscores;
}

export default useHighscores;