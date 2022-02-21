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

  it('button disabled', async () => {
    const mockOnClick = jest.fn();
    render(<AuthorizationForm OnCloseButtonClick={mockOnClick} />);
    const button = screen.getByText('Войти');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  })

  it('button enabled', async () => {
    render(<AuthorizationForm />);

    const pwdInput = screen.getByPlaceholderText('Пароль');
    fireEvent.change(pwdInput, { target: { value: '123' } });

    const loginInput = screen.getByPlaceholderText('Логин');
    fireEvent.change(loginInput, { target: { value: '123' } });

    const button = screen.getByText('Войти');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  })

  const login = (mockOnClick) => {
    render(<AuthorizationForm OnCloseButtonClick={mockOnClick} />);

    const pwdInput = screen.getByPlaceholderText('Пароль');
    fireEvent.change(pwdInput, { target: { value: '123' } });

    const loginInput = screen.getByPlaceholderText('Логин');
    fireEvent.change(loginInput, { target: { value: '123' } });

    const button = screen.getByText('Войти');
    fireEvent.click(button);
  }

  /*it('login success', async () => {
    const mockOnClick = jest.fn();
    const server = setupServer(
      rest.post('https://enigmatic-journey-19735.herokuapp.com/https://bellissimo-tour-agency.herokuapp.com/bellissimo/login', (req, res, ctx) =>
        res(ctx.status(200), ctx.json({ id: '1', access_token: '1' }))
      )
    );

    server.listen();

    login(mockOnClick);

    await waitFor(() => {
      // expect(mockOnClick).toHaveBeenCalledTimes(1)
      expect(screen.getByText('Неверный логин и/или пароль')).not.toBeInTheDocument();
    });

    server.close();
    server.resetHandlers();
  })*/

  it('login fail', async () => {
    const mockOnClick = jest.fn();
    const server = setupServer(
      rest.post('https://enigmatic-journey-19735.herokuapp.com/https://bellissimo-tour-agency.herokuapp.com/bellissimo/login', (req, res, ctx) =>
        res(ctx.status(200), ctx.json({ error: '1' }))
      )
    );

    server.listen();

    login(mockOnClick);

    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalledTimes(0);
    });


    server.close();
    server.resetHandlers();
  })
});
