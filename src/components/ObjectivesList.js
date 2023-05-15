import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import '../styles/ObjectivesList.css';

const ObjectivesList = ({objectives}) => {

    return (
        <div className="objectives">
        <h3>Objectives</h3>
            <div className="objectives-list">
            {objectives.map(objective => {
                return <p key={objective.id}>{objective.name}</p>
            })}
            </div>
        </div>
    )
}

export default ObjectivesList;