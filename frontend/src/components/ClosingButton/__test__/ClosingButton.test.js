import { render, screen, fireEvent } from '@testing-library/react';
import ClosingButton from '../index'
import React from "react";

describe("ClosingButton", () => {
  it('closing button test in document', async () => {
    render(<ClosingButton />);    
    const сlosingButtonElement = screen.getByRole('button');
    expect(сlosingButtonElement).toBeInTheDocument();
  })

  it('closing button click test', async () => {
    const mockOnClick = jest.fn();
    render(<ClosingButton onClick={mockOnClick} />);
    const сlosingButtonElement = screen.getByRole('button');
    fireEvent.click(сlosingButtonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  })

  it('closing button classname test', async () => {
    render(<ClosingButton />);    
    const сlosingButtonElement = screen.getByTitle("closing button title");
    fireEvent.click(сlosingButtonElement);
    expect(сlosingButtonElement).toHaveClass("close-button");
  })
});