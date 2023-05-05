import { useEffect, useRef, useState } from 'react';
import '../styles/PlacedObjective.css';

const PlacedObjective = ({objective, gameBoardImageRef}) => {
    const ref = useRef();
    const [bounds, setBounds] = useState({});
    useEffect(() => {
        const updateBounds = () => {
            setBounds(gameBoardImageRef.current.getBoundingClientRect());
        }

        window.addEventListener('resize', updateBounds);
        updateBounds();
        return () => window.removeEventListener('resize', updateBounds);
    }, [gameBoardImageRef])
    
    useEffect(() => {
        if (ref.current && gameBoardImageRef.current) {
            const width = ref.current.offsetWidth;
            const height = ref.current.offsetHeight;
            ref.current.style.left = (objective.x + bounds.left) - width / 2 + 'px';
            ref.current.style.top = (objective.y + bounds.top) - height / 2 + 'px';
        }
    }, [objective, bounds])

    return (
        <div ref={ref} className="placed-objective"></div>
    )
}

export default PlacedObjective;