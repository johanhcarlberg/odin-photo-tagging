import { useEffect, useRef } from 'react';
import '../styles/PlacedObjective.css';

const PlacedObjective = ({objective}) => {
    const ref = useRef();
    useEffect(() => {
        if (ref.current) {
            const width = ref.current.offsetWidth;
            const height = ref.current.offsetHeight;
            ref.current.style.left = objective.x - width / 2 + 'px';
            ref.current.style.top = objective.y - height / 2 + 'px';
        }
    }, [objective])

    return (
        <div ref={ref} className="placed-objective"></div>
    )
}

export default PlacedObjective;