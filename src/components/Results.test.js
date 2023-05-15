import { getByRole, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Results from "./Results";

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
