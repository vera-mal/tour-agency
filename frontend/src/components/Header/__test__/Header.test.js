import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../index'
import {BrowserRouter} from "react-router-dom";
import React from "react";

describe("Header", () => {
  const MockHeader = (props) =>
    <BrowserRouter>
      <Header {...props} />
    </BrowserRouter>

  it('buttons for not authorized user', async () => {
    render(<MockHeader />);
    const logInButton = screen.getByText(/Вход/i);
    expect(logInButton).toBeInTheDocument();

    const logOutButton = screen.queryByText(/Выход/i);
    expect(logOutButton).not.toBeInTheDocument();
  })

  it('buttons for authorized user', async () => {
    render(<MockHeader isAuth />);
    const logInButton = screen.queryByText(/Вход/i);
    expect(logInButton).not.toBeInTheDocument();

    const logOutButton = screen.getByText(/Выход/i);
    expect(logOutButton).toBeInTheDocument();
  })

  it('links for authorized user', async () => {
    render(<MockHeader isAuth/>);
    let link = screen.getByRole('link', {name: /История заказов/i});
    expect(link).toBeInTheDocument();
    link = screen.getByRole('link', {name: /Избранное/i});
    expect(link).toBeInTheDocument();
    link = screen.getByRole('link', {name: /Корзина/i});
    expect(link).toBeInTheDocument();

  })

  it('log in for not authorized user', async () => {
    const mockOnClick = jest.fn();
    render(<MockHeader onLogInClick={mockOnClick} />);
    const logInButton = screen.getByRole('button', {name: /Вход/i});
    fireEvent.click(logInButton)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('log in for authorized user', async () => {
    const mockOnClick = jest.fn();
    render(<MockHeader isAuth onLogOutClick={mockOnClick} />);
    const logInButton = screen.getByRole('button', {name: /Выход/i});
    fireEvent.click(logInButton)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
});
