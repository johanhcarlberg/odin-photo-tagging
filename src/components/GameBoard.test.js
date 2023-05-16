import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameBoard from "./GameBoard";

jest.mock('./ObjectivePicker', () => ({onObjectivePick}) => {
    const objectives = [{id: 1, name: 'Test Objective'}]
    return (
        <ul className="objective-picker" data-testid='objective-picker'>
        {objectives.map((objective) => (
            <li
                key={objective.name}
                data-testid={objective.id}
                onClick={() => onObjectivePick(objective)}
            >
                {objective.name}
            </li>
        ))}
    </ul>
    )
})

jest.mock('./PlacedObjective', () => () => {
    return (
        <div data-testid='placed-objective'></div>
    )
})

jest.mock('./Results', () => () => {
    return (
        <div data-testid='results'></div>
    )
})

jest.mock('firebase/firestore', () => {
    return {
        getFirestore: jest.fn()
    }
})

jest.mock("../effects/useObjectives", () => {
    return function DummyUseObjectives(props) {
        return [{id: 1, name: 'Test Objective'}];
    };
});

it('renders', () => {
    const image = {name: 'Beach', imageName: 'beach.png'};
    const onSelectNewImage = jest.fn();

    render(<GameBoard image={image} onSelectNewImage={onSelectNewImage} />);
})

it('shows objective picker when clicking gameboard', async () => {
    const image = {name: 'Beach', imageName: 'beach.png'};
    const onSelectNewImage = jest.fn();
    const user = userEvent.setup();

    render(<GameBoard image={image} onSelectNewImage={onSelectNewImage} />);
    const gameBoard = screen.getByLabelText('game-board-image');

    expect(screen.getAllByText('Test Objective').length).toBe(1);
    await user.click(gameBoard);
    screen.getByTestId('objective-picker');
    expect(screen.getAllByText('Test Objective').length).toBe(2);
})

it ('can click objective', async () => {
    const image = {name: 'Beach', imageName: 'beach.png'};
    const onSelectNewImage = jest.fn();
    const user = userEvent.setup();

    render(<GameBoard image={image} onSelectNewImage={onSelectNewImage} />);
    const gameBoard = screen.getByLabelText('game-board-image');

    await user.click(gameBoard);
    const objective = screen.getByTestId('1');

    await user.click(objective);
    expect(screen.queryByTestId('objective-picker')).toBeNull();

    screen.getByTestId('placed-objective');
})

it('shows results button', async () => {
    const image = {name: 'Beach', imageName: 'beach.png'};
    const onSelectNewImage = jest.fn();
    const user = userEvent.setup();

    render(<GameBoard image={image} onSelectNewImage={onSelectNewImage} />);
    const gameBoard = screen.getByLabelText('game-board-image');

    await user.click(gameBoard);
    const objective = screen.getByTestId('1');

    await user.click(objective);
    
    screen.getByRole('button', {name: 'show-results-button'});
})

it('can click results button', async () => {
    const image = {name: 'Beach', imageName: 'beach.png'};
    const onSelectNewImage = jest.fn();
    const user = userEvent.setup();

    render(<GameBoard image={image} onSelectNewImage={onSelectNewImage} />);
    const gameBoard = screen.getByLabelText('game-board-image');

    await user.click(gameBoard);
    const objective = screen.getByTestId('1');

    await user.click(objective);
    
    const resultsButton = screen.getByRole('button', {name: 'show-results-button'});
    await user.click(resultsButton);

    screen.getByTestId('results');
})