import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import React from "react";
import {setupServer} from "msw/node";
import { rest } from 'msw';
import Favourites from "../../Favourites";

describe("Favourites", () => {
  const favsMock = [
    {
      "id": 2,
      "images": "https://554a875a-71dc-4f5f-b6bf-ae8967f137d5.selcdn.net/thumbs2/78d6134a-b1e0-11e9-af7d-025c4c6e7a28.800x600.jpg;https://554a875a-71dc-4f5f-b6bf-ae8967f137d5.selcdn.net/thumbs2/1530b90a-d136-11e8-a8e8-025c4c6e7a28.800x600.jpg",
      "name": "Ускользающий мир Петербургских дворов и парадных",
      "price": 2500
    },
    {
      "id": 9,
      "images": "http://www.hiddenside.ru/photos/industrial/lo/zabroshennyy_detskiy_lager_leninets_roshchino_2015/37.JPG;http://www.hiddenside.ru/photos/industrial/lo/zabroshennyy_detskiy_lager_leninets_roshchino_2015/41.JPG",
      "name": "Меняем музеи на заброшки под Петербургом!",
      "price": 3500
    }
  ];

  it('load data', async () => {
    const server = setupServer(
      rest.get('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/favorite', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(favsMock))
      )
    );
    server.listen();

    render(<Favourites />)

    await waitFor(() => {
      const products = screen.getAllByTestId('product');
      expect(products.length).toEqual(2);
    })

    server.close();
    server.resetHandlers();
  })

  /*it('fail load', async () => {
    const server = setupServer(
      rest.get('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/favorite', (req, res, ctx) =>
        res(ctx.status(500), ctx.json({}))
      )
    );
    server.listen();

    render(<Favourites />)

    await waitFor(() => {
      const products = screen.queryAllByTestId('product');
      expect(products.length).toBeFalsy();
    })

    server.close();
    server.resetHandlers();
  })*/

  it('empty favs', async () => {
    const server = setupServer(
      rest.get('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/favorite', (req, res, ctx) =>
        res(ctx.status(200), ctx.json([]))
      )
    );
    server.listen();

    render(<Favourites />)

    await waitFor(() => {
      const label = screen.getByText('Избранных экскурсий нет');
      expect(label).toBeInTheDocument();
    })

    server.close();
    server.resetHandlers();
  })

  it('delete item', async () => {
    let server = setupServer(
      rest.get('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/favorite', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(favsMock))
      ),

      rest.delete('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/favorite/2', (req, res, ctx) =>
        res(ctx.status(200), ctx.json([]))
      ),

      rest.delete('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/favorite/9', (req, res, ctx) =>
        res(ctx.status(200), ctx.json([]))
      ),
    );
    server.listen();

    render(<Favourites token='1' />)

    await waitFor(() => {
      const products = screen.getAllByTestId('product');
    })

    await waitFor(() => {
      const button = screen.getAllByText('Удалить')[0];
      fireEvent.click(button);
      const products = screen.getAllByTestId('product');
      expect(products.length).toEqual(1);
    })

    server.close();
    server.resetHandlers();
  })
});
