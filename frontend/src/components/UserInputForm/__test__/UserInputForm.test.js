import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import React from "react";
import UserInputForm from "../index";
import {setupServer} from "msw/node";
import { rest } from 'msw';

describe("UserInputForm", () => {
  it('close form', async () => {
    const mockOnClick = jest.fn();
    render(<UserInputForm OnCloseButtonClick={mockOnClick} />);
    const closingButton = screen.getByTestId("closing-button");
    expect(closingButton).toBeInTheDocument();

    fireEvent.click(closingButton)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('button initial render', async () => {
    render(<UserInputForm />);
    const button = screen.getByText('Зарегистрироваться');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  })

  /*it('not showing password validation fail', async () => {
    render(<UserInputForm />);
    const inputElements = screen.getAllByPlaceholderText('Пароль');
    expect(inputElements.length).toEqual(2);

    fireEvent.change(inputElements[0], { target: { value: '123' } });
    // fireEvent.change(inputElements[1], { target: { value: '12' } });

    const warning = screen.queryByText('Пароли не совпадают');
    expect(warning).not.toBeInTheDocument();
  })*/

  it('password validation fail', async () => {
    render(<UserInputForm />);
    const inputElements = screen.getAllByPlaceholderText('Пароль');
    expect(inputElements.length).toEqual(2);

    fireEvent.change(inputElements[0], { target: { value: '123' } });
    fireEvent.change(inputElements[1], { target: { value: '12' } });

    const warning = screen.getByText('Пароли не совпадают');
    expect(warning).toBeInTheDocument();
  })

  /*it('short password', async () => {
    render(<UserInputForm />);
    const inputElements = screen.getAllByPlaceholderText('Пароль');

    fireEvent.change(inputElements[0], { target: { value: '12345' } });
    fireEvent.change(inputElements[1], { target: { value: '12345' } });

    const warning = screen.getByText('Длина пароля должна быть не менее 6 символов');
    expect(warning).toBeInTheDocument();
  })*/

  it('password validation success', async () => {
    render(<UserInputForm />);
    const inputElements = screen.getAllByPlaceholderText('Пароль');

    fireEvent.change(inputElements[0], { target: { value: '123456' } });
    fireEvent.change(inputElements[1], { target: { value: '123456' } });

    let warning = screen.queryByText('Пароли не совпадают');
    expect(warning).not.toBeInTheDocument();

    warning = screen.queryByText('Длина пароля должна быть не менее 6 символов');
    expect(warning).not.toBeInTheDocument();
  })

  it('correct user input', async () => {
    render(<UserInputForm />);
    let inputElements = screen.getAllByRole('textbox');
    inputElements.forEach((element) => {
      fireEvent.change(element, { target: { value: 'name' } });
    })

    inputElements = screen.getAllByPlaceholderText('Пароль');
    inputElements.forEach((element) => {
      fireEvent.change(element, { target: { value: '123456' } });
    })

    const button = screen.getByText('Зарегистрироваться');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  })

  const register = () => {
    render(<UserInputForm />);
    let inputElements = screen.getAllByRole('textbox');
    inputElements.forEach((element) => {
      fireEvent.change(element, { target: { value: 'name' } });
    })

    inputElements = screen.getAllByPlaceholderText('Пароль');
    inputElements.forEach((element) => {
      fireEvent.change(element, { target: { value: '123456' } });
    })

    const button = screen.getByText('Зарегистрироваться');
    fireEvent.click(button)
  }

  it('successful registration', async () => {
    const server = setupServer(
      rest.post('https://bellissimo-tour-agency.herokuapp.com/bellissimo/user', (req, res, ctx) =>
        res(ctx.status(200), ctx.json({}))
      )
    );

    server.listen();

    register();

    await waitFor(() => {
      let message = screen.getByText('Вы успешно зарегистрированы, можете авторизоваться');
      expect(message).toBeInTheDocument();
    })

    server.close();
    server.resetHandlers();
  })

  it('fail registration', async () => {
    const server = setupServer(
      rest.post('https://bellissimo-tour-agency.herokuapp.com/bellissimo/user', (req, res, ctx) =>
        res(ctx.status(400), ctx.json({ message: 'error' }))
      )
    );
    server.listen();

    register();

    await waitFor(() => {
      let message = screen.getByText('Логин уже занят');
      expect(message).toBeInTheDocument();
    })

    server.close();
    server.resetHandlers();
  })
});
