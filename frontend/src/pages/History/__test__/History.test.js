import {render, screen, waitFor} from '@testing-library/react';
import React from "react";
import {setupServer} from "msw/node";
import { rest } from 'msw';
import History from "../index";

describe("History", () => {
  const mock = [
    {
      "id": 2,
      "date": "2022-02-20T12:57:40.248517",
      "order": {
        "cartItems": [
          {
            "type": "tour",
            "linksToImages": "https://554a875a-71dc-4f5f-b6bf-ae8967f137d5.selcdn.net/thumbs2/78d6134a-b1e0-11e9-af7d-025c4c6e7a28.800x600.jpg;https://554a875a-71dc-4f5f-b6bf-ae8967f137d5.selcdn.net/thumbs2/1530b90a-d136-11e8-a8e8-025c4c6e7a28.800x600.jpg",
            "name": "Ускользающий мир Петербургских дворов и парадных",
            "date": "2021-12-30T15:00:00",
            "items": [
              {
                "ticketCategory": "full",
                "quantity": 1,
                "price": 2500
              },
              {
                "ticketCategory": "seniors",
                "quantity": 0,
                "price": 1750
              },
              {
                "ticketCategory": "minors",
                "quantity": 0,
                "price": 1250
              }
            ],
            "fullPrice": 2500,
            "cartItemId": 1
          }
        ],
        "certificateDiscount": null,
        "totalPrice": 2500
      }
    },
    {
      "id": 3,
      "date": "2022-02-20T12:58:07.093342",
      "order": {
        "cartItems": [
          {
            "type": "certificate",
            "linksToImages": "https://amparus.ru/templates/yootheme/cache/20201217_125252_0000-87829d04.png",
            "name": "Сертификат на сумму 1000.00 рублей",
            "date": null,
            "items": null,
            "fullPrice": 1000,
            "cartItemId": 4
          }
        ],
        "certificateDiscount": null,
        "totalPrice": 1000
      }
    }
  ];

  it('load data', async () => {
    const server = setupServer(
      rest.get('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/history', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(mock))
      )
    );
    server.listen();

    render(<History />)

    await waitFor(() => {
      const items = screen.getAllByText(/Заказ №.*/);
      expect(items).toHaveLength(2);
    })

    server.close();
    server.resetHandlers();
  })
});
