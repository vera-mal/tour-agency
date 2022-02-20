import { render, screen, fireEvent } from '@testing-library/react';
import IncDec from '../index'
import React from "react";

describe("IncDec", () => {
  it('IncDec plus button test in document', async () => {
    render(<IncDec />);    
    const incDecPlusButtonElement = screen.getByTitle("button plus title");
    expect(incDecPlusButtonElement).toBeInTheDocument();
  })  

  it('IncDec minus button test in document', async () => {
    render(<IncDec />);    
    const incDecMinusButtonElement = screen.getByTitle("button minus title");
    expect(incDecMinusButtonElement).toBeInTheDocument();
  })  

  it('IncDec value test in document', async () => {
    render(<IncDec />);    
    const incDecValueElement = screen.getByTitle("incdec value title");
    expect(incDecValueElement).toBeInTheDocument();
  })  

  it('IncDec default value test', async () => {
    render(<IncDec />);
    const incDecValueElement = screen.getByText(0);
    expect(incDecValueElement).toBeInTheDocument();
  })

  it('IncDec plus button click test', async () => {
    render(<IncDec />); 
    const incDecPlusButtonElement = screen.getByTitle("button plus title");
    fireEvent.click(incDecPlusButtonElement);
    const incDecValueElement = screen.getByText(1);
    expect(incDecValueElement).toBeInTheDocument();
  })

  it('IncDec minus button click test', async () => {
    render(<IncDec />); 
    const incDecPlusButtonElement = screen.getByTitle("button plus title");
    fireEvent.click(incDecPlusButtonElement);
    const incDecMinusButtonElement = screen.getByTitle("button minus title");
    fireEvent.click(incDecMinusButtonElement);
    const incDecValueElement = screen.getByText(0);
    expect(incDecValueElement).toBeInTheDocument();
  })

  it('IncDec minus button click test when value < 0', async () => {
    render(<IncDec />); 
    const incDecMinusButtonElement = screen.getByTitle("button minus title");
    fireEvent.click(incDecMinusButtonElement);
    const incDecValueElement = screen.getByText(0);
    expect(incDecValueElement).toBeInTheDocument();
  })
});
