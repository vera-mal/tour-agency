import {render, screen} from '@testing-library/react';
import React from "react";
import {BrowserRouter} from "react-router-dom";
import ScrollToTop from "../index";

window.scrollTo = jest.fn();
afterAll(() => {
  jest.clearAllMocks();
});

describe('ScrollToTop', () => {
  const MockScrollToTop = ({children}) =>
    <BrowserRouter>
      <ScrollToTop>
        {children}
      </ScrollToTop>
    </BrowserRouter>

  it('render test', async () => {
    render(<MockScrollToTop><div style={{ width: '100vw', height: '200vh' }}>Test</div></MockScrollToTop>);
    const button = screen.getByText('Test');
    expect(button).toBeInTheDocument();
  })
});
