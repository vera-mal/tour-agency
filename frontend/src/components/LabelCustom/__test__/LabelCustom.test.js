import { render, screen } from '@testing-library/react';
import LabelCustom from '../index'
import React from "react";

describe("LabelCustom", () => {
  it('label custom test in document', async () => {
    render(<LabelCustom />);    
    const labelCustomElement = screen.getByTitle("custom label title");
    expect(labelCustomElement).toBeInTheDocument();
  })
});
