import { useEffect, useState } from "react";

const useTime = () => {
    const [endTime, setEndTime] = useState(null);
    useEffect(() => {
        const date = new Date();
        setEndTime(date.getTime());
    }, []);
    return endTime;
}

export default useTime;