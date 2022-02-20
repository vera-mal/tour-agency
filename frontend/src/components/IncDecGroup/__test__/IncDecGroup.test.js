import { render, screen, fireEvent } from '@testing-library/react';
import IncDecGroup from '../index'
import React from "react";

describe("IncDecGroup", () => {
  it('IncDecGroup test in document', async () => {
    render(<IncDecGroup />);    
    const incDecGroupElement = screen.getByTestId('increment-decrement-group');
    expect(incDecGroupElement).toBeInTheDocument();
  })
});
