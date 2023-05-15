import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ObjectiveResult from "./ObjectiveResult";

it('renders', () => {
    const image = {name: 'Beach', imageName: 'beach.png'};
    const objective = {id: 1, name: 'Beach Ball'};
    const props = {image, objective};
    render(<ObjectiveResult {...props}/>);
    screen.getByText(objective.name);
})