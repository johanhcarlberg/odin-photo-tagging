import '../styles/ObjectivePicker.css';

const ObjectivePicker = ({objectives, position}) => {
    return (
        <ul className="objective-picker" style={{left: position.x, top: position.y}}>
            {objectives.map(objective => <li key={objective.name}>{objective.name}</li>)}
        </ul>
    )
}

export default ObjectivePicker;