import {fireEvent, getByText, render, screen, waitFor} from '@testing-library/react';
import React from "react";
import {setupServer} from "msw/node";
import { rest } from 'msw';
import Cart from "../index";

describe('Cart', () => {
  const path = 'https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/cart';

  const mock = {
    "cartItems": [
      {
        "type": "tour",
        "linksToImages": "https://www.fiesta.ru/uploads/slider_image/image/17507/v880_mustafina_9.jpg;https://grandgames.net/puzzle/source/piter_5_uglov.jpg",
        "name": "Мифы и легенды Петербурга",
        "date": "2021-12-30T15:00:00",
        "items": [
          {
            "ticketCategory": "full",
            "quantity": 1,
            "price": 2000
          },
          {
            "ticketCategory": "seniors",
            "quantity": 0,
            "price": 1400
          },
          {
            "ticketCategory": "minors",
            "quantity": 0,
            "price": 1000
          }
        ],
        "fullPrice": 2000,
        "cartItemId": 2
      },
      {
        "type": "certificate",
        "linksToImages": "https://amparus.ru/templates/yootheme/cache/20201217_125252_0000-87829d04.png",
        "name": "Сертификат на сумму 1000.00 рублей",
        "date": null,
        "items": null,
        "fullPrice": 1000,
        "cartItemId": 1
      }
    ],
    "certificateDiscount": null,
    "totalPrice": 3000
  };

  it('empty cart', async () => {
    const server = setupServer(
      rest.get(path, (req, res, ctx) =>
        res(ctx.status(200), ctx.json({ cartItems: [] }))
      )
    );
    server.listen();

    render(<Cart />)

    await waitFor(() => {
      const label = screen.getByText('Корзина пуста');
      expect(label).toBeInTheDocument();
    })

    server.close();
    server.resetHandlers();
  });

  it('load data', async () => {
    const server = setupServer(
      rest.get(path, (req, res, ctx) =>
        res(ctx.status(200), ctx.json(mock))
      )
    );
    server.listen();

    render(<Cart />)

    await waitFor(() => {
      const products = screen.getAllByTestId('product');
      expect(products.length).toEqual(2);
      const input = screen.getByPlaceholderText('Промокод');
      expect(input).toBeInTheDocument();
      const button = screen.getByText('Оформить заказ');
      expect(button).not.toBeDisabled();
    })

    server.close();
    server.resetHandlers();
  });

  it('delete', async () => {
    const server = setupServer(
      rest.get(path, (req, res, ctx) =>
        res(ctx.status(200), ctx.json(mock))
      ),
      rest.delete(path + '/2', (req, res, ctx) =>
        res(ctx.status(200), ctx.json({}))
      ),
    );
    server.listen();

    render(<Cart />)

    await waitFor(() => {
      const button = screen.getAllByText('Удалить')[0];
      fireEvent.click(button);
    })

    await waitFor(() => {
      const products = screen.getAllByTestId('product');
      expect(products).toHaveLength(1);
    })

    server.close();
    server.resetHandlers();
  });

  it('apply code', async () => {
    const server = setupServer(
      rest.get(path, (req, res, ctx) =>
        res(ctx.status(200), ctx.json(mock))
      ),
      rest.put(path + '/promocode/1', (req, res, ctx) =>
        res(ctx.status(200), ctx.json({ certificateDiscount: 1000, totalPrice: 2000 }))
      ),
    );

    server.listen();
    render(<Cart />)

    let input;
    await waitFor(() => {
      input = screen.getByPlaceholderText('Промокод');
    })

    fireEvent.change(input, { target: { value: '1' } });
    const button = screen.getByText('Применить');
    fireEvent.click(button);
    await waitFor(() => {
      const label = screen.getByText('Применен промокод на сумму 1000 рублей');
      expect(label).toBeInTheDocument();
    })

    server.close();
    server.resetHandlers();
  });

  it('apply code warning', async () => {
    const server = setupServer(
      rest.get(path, (req, res, ctx) =>
        res(ctx.status(200), ctx.json(mock))
      ),
      rest.put(path + '/promocode/1', (req, res, ctx) =>
        res(ctx.status(200), ctx.json({ certificateDiscount: 3000, totalPrice: 0 }))
      ),
    );

    server.listen();
    render(<Cart />)

    let input;
    await waitFor(() => {
      input = screen.getByPlaceholderText('Промокод');
    })

    fireEvent.change(input, { target: { value: '1' } });
    const button = screen.getByText('Применить');
    fireEvent.click(button);
    await waitFor(() => {
      const label = screen.getByText('Сумма сертификата превышает сумму заказа. Неиспользованная часть сертификата сгорит.');
      expect(label).toBeInTheDocument();
    })

    server.close();
    server.resetHandlers();
  });

  it('change value', async () => {
    const server = setupServer(
      rest.get(path, (req, res, ctx) =>
        res(ctx.status(200), ctx.json(mock))
      ),
      rest.put(path, (req, res, ctx) =>
        res(ctx.status(200), ctx.json({ totalPrice: 5000}))
      ),
    );

    server.listen();
    render(<Cart />)

    let buttons;
    await waitFor(() => {
      buttons = screen.getAllByTestId('button-plus');
    })

    fireEvent.click(buttons[0]);
    await waitFor(() => {
      const totalPriceChanged = screen.getByText(/Сумма заказа:.*5000/);
      expect(totalPriceChanged).toBeInTheDocument();
    })

    server.close();
    server.resetHandlers();
  });
});
