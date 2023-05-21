import { getByRole, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Highscores from "./Highscores";

jest.mock("../effects/useHighscores", () => () => {
    return [
        { id: 1, name: "Test", time: 12 },
        { id: 2, name: "Test2", time: 13 },
    ];
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
