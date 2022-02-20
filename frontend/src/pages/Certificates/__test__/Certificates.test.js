import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import React from "react";
import {setupServer} from "msw/node";
import { rest } from 'msw';
import Certificates from "../index";

describe('Certificates', () => {
  const mock = [
    {
      "id": 1,
      "price": 1000,
      "imagePath": "https://amparus.ru/templates/yootheme/cache/20201217_125252_0000-87829d04.png"
    },
    {
      "id": 2,
      "price": 3000,
      "imagePath": "https://amparus.ru/templates/yootheme/cache/20201217_125252_0000-87829d04.png"
    },
    {
      "id": 3,
      "price": 5000,
      "imagePath": "https://amparus.ru/templates/yootheme/cache/20201217_125252_0000-87829d04.png"
    }
  ];

  it('load data', async () => {
    const server = setupServer(
      rest.get('https://bellissimo-tour-agency.herokuapp.com/bellissimo/certificates', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(mock))
      )
    );
    server.listen();

    render(<Certificates />)

    await waitFor(() => {
      const products = screen.getAllByTestId('product');
      expect(products.length).toEqual(3);
    })

    server.close();
    server.resetHandlers();
  })

  it('fail to load data', async () => {
    const server = setupServer(
      rest.get('https://bellissimo-tour-agency.herokuapp.com/bellissimo/certificates', (req, res, ctx) =>
        res(ctx.status(500), ctx.json({ message: 'error' }))
      )
    );
    server.listen();

    render(<Certificates />)

    await waitFor(() => {
      const products = screen.queryAllByTestId('product');
      expect(products.length).toBeFalsy();
    })

    server.close();
    server.resetHandlers();
  })

  it('page for not auth user', async () => {
    const server = setupServer(
      rest.get('https://bellissimo-tour-agency.herokuapp.com/bellissimo/certificates', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(mock))
      )
    );
    server.listen();

    render(<Certificates />)

    await waitFor(() => {
      const products = screen.queryAllByText('Добавить в корзину');
      expect(products.length).toBeFalsy();
    })

    server.close();
    server.resetHandlers();
  })

  it('page for auth user', async () => {
    const server = setupServer(
      rest.get('https://bellissimo-tour-agency.herokuapp.com/bellissimo/certificates', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(mock))
      )
    );
    server.listen();

    render(<Certificates token='1' />)

    await waitFor(() => {
      const products = screen.queryAllByText('Добавить в корзину');
      expect(products.length).toBeTruthy();
    })

    server.close();
    server.resetHandlers();
  })

  it('add to cart', async () => {
    const server = setupServer(
      rest.get('https://bellissimo-tour-agency.herokuapp.com/bellissimo/certificates', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(mock))
      ),
      rest.post('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/cart/certificate/1/1', (req, res, ctx) =>
        res(ctx.status(200), ctx.json({}))
      )
    );
    server.listen();

    render(<Certificates token='1' />)

    let buttons;
    await waitFor(() => {
      buttons = screen.queryAllByText('Добавить в корзину');
      expect(buttons.length).toBeTruthy();
    })

    fireEvent.click(buttons[0]);

    await waitFor(() => {
      const warning = screen.queryByText('Ошибка. Пожалуйста, повторите попытку позже');
      expect(warning).not.toBeInTheDocument();
    });

    server.close();
    server.resetHandlers();
  })

  it('fail to add', async () => {
    const server = setupServer(
      rest.get('https://bellissimo-tour-agency.herokuapp.com/bellissimo/certificates', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(mock))
      ),
      rest.post('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/cart/certificate/1/1', (req, res, ctx) =>
        res(ctx.status(500), ctx.json({ message: 'error' }))
      )
    );
    server.listen();

    render(<Certificates token='1' />)

    let buttons;
    await waitFor(() => {
      buttons = screen.queryAllByText('Добавить в корзину');
      expect(buttons.length).toBeTruthy();
    })

    fireEvent.click(buttons[0]);

    await waitFor(() => {
      const warning = screen.getByText('Ошибка. Пожалуйста, повторите попытку позже');
      expect(warning).toBeInTheDocument();
    })

    server.close();
    server.resetHandlers();
  })
});