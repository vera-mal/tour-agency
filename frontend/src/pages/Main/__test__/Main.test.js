import {render, screen, waitFor} from '@testing-library/react';
import React from "react";
import {setupServer} from "msw/node";
import { rest } from 'msw';
import Main from "../index";
import {BrowserRouter} from "react-router-dom";

describe('Main', () => {
  const MockMain = () =>
    <BrowserRouter>
      <Main />
    </BrowserRouter>;

  const mock = [
    {
      "id": 1,
      "images": "https://ic.pics.livejournal.com/la_ra_fa/64614718/181254/181254_900.jpg;https://shareslide.ru/img/thumbs/be426a0d349c804bbbf786402fa8ce26-800x.jpg",
      "name": "Экскурсия под Аничковым мостом",
      "nearestDate": "2021-12-30T15:00:00",
      "price": 1000
    },
    {
      "id": 2,
      "images": "https://554a875a-71dc-4f5f-b6bf-ae8967f137d5.selcdn.net/thumbs2/78d6134a-b1e0-11e9-af7d-025c4c6e7a28.800x600.jpg;https://554a875a-71dc-4f5f-b6bf-ae8967f137d5.selcdn.net/thumbs2/1530b90a-d136-11e8-a8e8-025c4c6e7a28.800x600.jpg",
      "name": "Ускользающий мир Петербургских дворов и парадных",
      "nearestDate": "2021-12-30T15:00:00",
      "price": 2500
    },
    {
      "id": 3,
      "images": "http://images.myshared.ru/19/1238834/slide_20.jpg;http://orbitaart.ru/img/petergof-big.jpg",
      "name": "Индивидуальная экскурсия в Петергоф",
      "nearestDate": "2021-12-30T15:00:00",
      "price": 3500
    },
  ];

  it('load data', async () => {
    const server = setupServer(
      rest.get('https://bellissimo-tour-agency.herokuapp.com/bellissimo/tours', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(mock))
      )
    );
    server.listen();

    render(<MockMain />)

    await waitFor(() => {
      const products = screen.getAllByTestId('product');
      expect(products.length).toEqual(3);
    })

    server.close();
    server.resetHandlers();
  });
});