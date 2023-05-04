import { useEffect, useRef, useState } from 'react';
import '../styles/Reticle.css';

const Reticle = ({x, y}) => {
    const [dimensions, setDimensions] = useState({width: 0, heigth: 0});
    const reticleRef = useRef();

    useEffect(() => {
        if (reticleRef.current) {
            setDimensions({
                width: reticleRef.current.offsetWidth,
                heigth: reticleRef.current.offsetHeight
            });
        }
    }, [])
    return (
        <div 
        ref={reticleRef}
        className="reticle"
        style={{top: `${y - dimensions.heigth / 2}px`, left: `${x - dimensions.width / 2}px`}}
        >
            <div className='reticle-inner'></div>
        </div>
    )
}

export default Reticle;