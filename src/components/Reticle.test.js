import { getByRole, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Reticle from "./Reticle";

it('renders', () => {
    render(<Reticle x={0} y={0}/>);
    screen.getByLabelText('reticle');
})

it('changes style depending on x,y', () => {
    const {rerender} = render(<Reticle x={0} y={0}/>);
    const reticle = screen.getByLabelText('reticle');
    let initialTop = reticle.style.top;
    let initialLeft = reticle.style.left;
    rerender(<Reticle x={2} y={2} />);
    expect(reticle.style.top).not.toEqual(initialTop);
    expect(reticle.style.left).not.toEqual(initialLeft);
})