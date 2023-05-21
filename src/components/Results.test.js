import { getByRole, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Results from "./Results";

jest.mock('../effects/useTime', () => () => {
    return new Date(1684343513483);
})

jest.mock('../effects/useObjectiveResults', () => () => {
    return [[{id: 1, name: 'Test', result: true}], false]
})

jest.mock('../effects/useHighscores', () => () => {
    return [{name: 'Test', time: 12}, {name: 'Test2', time: 13}];
});

it("renders", () => {
    const placedObjectives = [];
    const image = {};
    const onTryAgain = jest.fn();
    const onSelectNewImage = jest.fn();
    const props = { placedObjectives, image, onTryAgain, onSelectNewImage };

    render(<Results {...props} />);
});

it("can click try again button", async () => {
    const placedObjectives = [];
    const image = {};
    const onTryAgain = jest.fn();
    const onSelectNewImage = jest.fn();
    const props = { placedObjectives, image, onTryAgain, onSelectNewImage };
    const user = userEvent.setup();

    render(<Results {...props} />);
    const tryAgainButton = screen.getByRole("button", {
        name: "try-again-button",
    });
    await user.click(tryAgainButton);
    expect(onTryAgain).toBeCalled();
});

it("can click select new image button", async () => {
    const placedObjectives = [];
    const image = {};
    const onTryAgain = jest.fn();
    const onSelectNewImage = jest.fn();
    const props = { placedObjectives, image, onTryAgain, onSelectNewImage };
    const user = userEvent.setup();

    render(<Results {...props} />);
    const selectNewImageButton = screen.getByRole("button", {
        name: "select-new-image-button",
    });
    await user.click(selectNewImageButton);
    expect(onSelectNewImage).toBeCalled();
});

it("displays time", () => {
    const placedObjectives = [];
    const image = {};
    const onTryAgain = jest.fn();
    const onSelectNewImage = jest.fn();
    const startTime = 1684343500358;
    const expectedTime = 13.125;
    const props = { placedObjectives, image, onTryAgain, onSelectNewImage, startTime };
    render(<Results {...props} />);

    screen.getByText(`Time elapsed: ${expectedTime}s`);
})

it("displays highscore input", async () => {
    const placedObjectives = [{id: 1, name: 'Test'}];
    const image = {};
    const onTryAgain = jest.fn();
    const onSelectNewImage = jest.fn();
    const startTime = 1684343500358;
    const user = userEvent.setup();
    const props = { placedObjectives, image, onTryAgain, onSelectNewImage, startTime };
    render(<Results {...props} />);

    const highscoreInput = screen.getByLabelText('highscore-name');
})

it('displays show scores button', () => {
    const placedObjectives = [{id: 1, name: 'Test'}];
    const image = {};
    const onTryAgain = jest.fn();
    const onSelectNewImage = jest.fn();
    const startTime = 1684343500358;
    const user = userEvent.setup();
    const props = { placedObjectives, image, onTryAgain, onSelectNewImage, startTime };
    render(<Results {...props} />);

    screen.getByRole('button', {name: 'show-scores-button'});
})
