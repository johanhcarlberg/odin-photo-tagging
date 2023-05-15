import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ObjectivePicker from "./ObjectivePicker";

it('renders', () => {
    const objectives = [{name: 'Test'}];
    const position = {x: 100, y: 100};
    const onObjectivePick = jest.fn();
    const props = {objectives, position, onObjectivePick};
    render(<ObjectivePicker {...props}/>);
})

it('displays objectives', () => {
    const objectives = [{name: 'Test'}, {name: 'Test2'}];
    const position = {x: 100, y: 100};
    const onObjectivePick = jest.fn();
    const props = {objectives, position, onObjectivePick};
    render(<ObjectivePicker {...props}/>);

    screen.getByText(objectives[0].name);
    screen.getByText(objectives[1].name);
})

it('can click on objective', async () => {
    const objectives = [{name: 'Test'}, {name: 'Test2'}];
    const position = {x: 100, y: 100};
    const onObjectivePick = jest.fn();
    const user = userEvent.setup();
    const props = {objectives, position, onObjectivePick};
    render(<ObjectivePicker {...props}/>);

    const objective = screen.getByText(objectives[0].name);
    await user.click(objective);
    expect(onObjectivePick).toBeCalled();
})