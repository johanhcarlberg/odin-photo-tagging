import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageSelector from "./ImageSelector";

jest.mock('../effects/useObjectives', () => {
    return function DummyUseObjectives(props) {
        return [];
    }
})

test("renders", async () => {
    const images = [];
    const onConfirm = jest.fn();

    render(<ImageSelector images={images} onConfirm={onConfirm} />);
});

test("can click confirm button", async () => {
    const images = [{ imageName: "beach.png", name: "Beach" }];
    const onConfirm = jest.fn();
    const user = userEvent.setup();

    render(<ImageSelector images={images} onConfirm={onConfirm} />);
    const confirmButton = screen.getByRole("button", {
        name: "confirm-button",
    });
    await user.click(confirmButton);
    expect(onConfirm).toBeCalled();
});

test("displays image name", async () => {
    const images = [{ imageName: "beach.png", name: "Beach" }];
    const onConfirm = jest.fn();

    render(<ImageSelector images={images} onConfirm={onConfirm} />);
    const imageName = screen.getByText(images[0].name);
});

test("displays image", async () => {
    const images = [{ imageName: "beach.png", name: "Beach" }];
    const onConfirm = jest.fn();

    render(<ImageSelector images={images} onConfirm={onConfirm} />);
    const image = screen.getByLabelText('current-image');
    expect(image.style.backgroundImage).toContain(images[0].imageName);
})

test("can change image", async () => {
    const images = [
        { imageName: "beach.png", name: "Beach" },
        { imageName: "park.png", name: "Park" },
    ];
    const onConfirm = jest.fn();
    const user = userEvent.setup();

    render(<ImageSelector images={images} onConfirm={onConfirm} />);

    const nextButton = screen.getByRole("button", {
        name: "next-image-button",
    });
    const prevButton = screen.getByRole("button", {
        name: "previous-image-button",
    });
    const image = screen.getByLabelText('current-image');
    screen.getByText(images[0].name);
    expect(image.style.backgroundImage).toContain(images[0].imageName);
    await user.click(nextButton);
    screen.getByText(images[1].name);
    expect(image.style.backgroundImage).toContain(images[1].imageName);
    await user.click(prevButton);
    screen.getByText(images[0].name);
    expect(image.style.backgroundImage).toContain(images[0].imageName);
});
