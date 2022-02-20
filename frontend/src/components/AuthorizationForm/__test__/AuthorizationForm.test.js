import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import React from "react";
import AuthorizationForm from "../index";
import {setupServer} from "msw/node";
import { rest } from 'msw';

describe("AuthorizationForm", () => {
  it('authorization form close button test', async () => {
    const mockOnClick = jest.fn();
    render(<AuthorizationForm OnCloseButtonClick={mockOnClick} />);
    const closingButton = screen.getByTestId("closing-button");
    expect(closingButton).toBeInTheDocument();
  })

  it('authorization form close button click test', async () => {
    const mockOnClick = jest.fn();
    render(<AuthorizationForm OnCloseButtonClick={mockOnClick} />);
    const closingButton = screen.getByTestId("closing-button");
    fireEvent.click(closingButton)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
});
