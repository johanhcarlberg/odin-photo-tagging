import { getByRole, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HighscoreSubmit from "./HighscoreSubmit";

it("renders", () => {
    render(<HighscoreSubmit />)
})

it("can change input", async () => {
    const user = userEvent.setup();
    render(<HighscoreSubmit />);
    const highscoreInput = screen.getByLabelText('highscore-name');
    await user.type(highscoreInput, 'Test');
    expect(highscoreInput.value).toBe('Test');
})

it('displays submit button', () => {
    render(<HighscoreSubmit />);
    const submitButton = screen.getByRole('button', {name: 'Submit'});
})

it('submit button disabled when input is empty', async () => {
    const user = userEvent.setup();
    render(<HighscoreSubmit />);
    const submitButton = screen.getByRole('button', {name: 'Submit'});
    expect(submitButton.disabled).toBe(true);

    const highscoreInput = screen.getByLabelText('highscore-name');
    await user.type(highscoreInput, 'Test');
    expect(submitButton.disabled).toBe(false);
})

it('can submit', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<HighscoreSubmit onSubmit={onSubmit}/>);
    const submitButton = screen.getByRole('button', {name: 'Submit'});
    const highscoreInput = screen.getByLabelText('highscore-name');
    await user.type(highscoreInput, 'Test');

    await user.click(submitButton);
    expect(onSubmit).toBeCalled();
})