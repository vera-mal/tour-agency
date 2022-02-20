import {render, screen, waitFor} from '@testing-library/react';
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
});