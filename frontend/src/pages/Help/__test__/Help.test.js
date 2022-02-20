import {render, screen, waitFor} from '@testing-library/react';
import React from "react";
import {setupServer} from "msw/node";
import { rest } from 'msw';
import HelpPage from "../index";

describe("Help", () => {
  const helpMock = {
    "help": [
      {
        "label": "Оплата экскурсии",
        "text": "На нашем сайте вы можете забронировать место и узнать цену экскурсии."
      },
      {
        "label": "Скидки",
        "text": "Вы можете приобрести билеты со скидкой для детей или для пенсионеров."
      },
      {
        "label": "История заказов",
        "text": "В данном разделе отображается информация о всех ваших экскурсиях."
      },
    ]
  };

  it('load data', async () => {
    const server = setupServer(
      rest.get('https://bellissimo-tour-agency.herokuapp.com/bellissimo/help', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(helpMock))
      )
    );
    server.listen();

    render(<HelpPage />)

    await waitFor(() => {
      const heading = screen.getAllByRole('heading');
      expect(heading.length).toEqual(4);
    })

    server.close();
    server.resetHandlers();
  })

  it('error while loading', async () => {
    const server = setupServer(
      rest.get('https://bellissimo-tour-agency.herokuapp.com/bellissimo/help', (req, res, ctx) =>
        res(ctx.status(500), ctx.json({}))
      )
    );
    server.listen();

    render(<HelpPage />)

    await waitFor(() => {
      const heading = screen.getAllByRole('heading');
      expect(heading.length).toEqual(1);
    })

    server.close();
    server.resetHandlers();
  })
});
