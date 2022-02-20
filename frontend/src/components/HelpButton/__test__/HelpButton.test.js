import { render, screen } from '@testing-library/react';
import HelpButton from '../index'
import {BrowserRouter} from "react-router-dom";
import React from "react";

describe("HelpButton", () => {
  const MockHelpButton = () =>
    <BrowserRouter>
      <HelpButton />
    </BrowserRouter>

  it('help button test in document', async () => {
    render(<MockHelpButton />);    
    const helpButtonElement = screen.getByTitle("help button title");
    expect(helpButtonElement).toBeInTheDocument();
  })
});