import { useEffect, useRef } from 'react';
import '../styles/PlacedObjective.css';

const PlacedObjective = ({objective}) => {
    const ref = useRef();
    useEffect(() => {
        if (ref.current) {
            ref.current.style.left = objective.x + 'px';
            ref.current.style.top = objective.y + 'px';
        }
    }, [objective])

    return (
        <div ref={ref} className="placed-objective"></div>
    )
}