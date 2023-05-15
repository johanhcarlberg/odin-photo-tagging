import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ObjectivesList from "./ObjectivesList";

it('renders', () => {
    const objectives = [{id: 1, name: 'Test'}]
    render(<ObjectivesList objectives={objectives} />);
    screen.getByText(objectives[0].name);
})

it('renders multiple objectives', () => {
    const objectives = [{id: 1, name: 'Test'}, {id: 2, name: 'Test2'}]
    render(<ObjectivesList objectives={objectives} />);
    screen.getByText(objectives[0].name);
    screen.getByText(objectives[1].name);
})