import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import '../styles/ObjectivesList.css';

const ObjectivesList = ({objectives}) => {

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