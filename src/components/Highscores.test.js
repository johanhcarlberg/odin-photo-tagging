import { getByRole, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Highscores from "./Highscores";

jest.mock("../effects/useHighscores", () => () => {
    const highscoresData = [
        { id: 1, name: "Test", time: 12 },
        { id: 2, name: "Test2", time: 13 },
        { id: 3, name: "Test3", time: 11 },
        { id: 4, name: "Test4", time: 14 },
        { id: 5, name: "Test5", time: 15 },
        { id: 6, name: "Test6", time: 16 },
        { id: 7, name: "Test7", time: 17 },
        { id: 8, name: "Test8", time: 18 },
        { id: 9, name: "Test9", time: 19 },
        { id: 10, name: "Test10", time: 20 },
        { id: 11, name: "Test11", time: 21 },
    ];
    highscoresData.sort();
    if (highscoresData.length > 10) {
        highscoresData.splice(10);
    }

    return highscoresData;
});

it("renders", () => {
    render(<Highscores />);
});

it("shows highscores", () => {
    render(<Highscores />);
    screen.getByText("Test");
    screen.getByText("12s");

    screen.getByText("Test2");
    screen.getByText("13s");
});

it("can close", async () => {
    const onCloseMock = jest.fn();
    const user = userEvent.setup();
    render(<Highscores onClose={onCloseMock} />);

    const closeButtonCorner = screen.getByRole("button", {
        name: "close-button-corner",
    });
    await user.click(closeButtonCorner);
    expect(onCloseMock).toBeCalledTimes(1);
    const closeButton = screen.getByRole("button", { name: "close-button" });
    await user.click(closeButton);
    expect(onCloseMock).toBeCalledTimes(2);
});

it("only shows 10 scores", () => {
    render(<Highscores />);

    const highscoreItems = screen.getAllByText(/Test*/);
    expect(highscoreItems.length).toBe(10);
});
