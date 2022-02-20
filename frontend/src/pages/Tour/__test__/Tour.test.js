import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import React from "react";
import {setupServer} from "msw/node";
import { rest } from 'msw';
import Tour from "../index";

describe('Tour', () => {
  const path = 'https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1';

  const tourMock = {
    "imagesPath": "https://ic.pics.livejournal.com/la_ra_fa/64614718/181254/181254_900.jpg;https://shareslide.ru/img/thumbs/be426a0d349c804bbbf786402fa8ce26-800x.jpg",
    "name": "Экскурсия под Аничковым мостом",
    "description": "Санкт-Петербург известен большим количеством мостов, соединяющих берега рек и каналов, протекающих по городу.Одним из наиболее популярных в городе и всей Россиисчитается Аничков мост. Он переброшен через Фонтанку, входит в число трех переправ, пересекающих Невский проспект.Общая длина моста — 54,6 м, ширина — 37,9 м.Аничков мост имеет три полосы движения, а также пешеходные тротуары.Официальное его название «Невский мост» не прижилось. Название «Аничков» пошло от имени подполковника-инженера Михаила Аничкова, рабочий батальон которого отстроил слободу,находившуюся неподалеку. Он же принимал  участие в строительстве моста.Истории же, возводящие название моста к некоей Аничке или Ане, — просто городские легенды.",
    "isLiked": false,
    "dates": [
      "2021-12-30",
      "2022-01-07"
    ],
    "time": "15:00:00",
    "prices": {
      "full": 1000,
      "seniors": 700,
      "minors": 500
    }
  };

  it('load data', async () => {
    const server = setupServer(
      rest.get(path + '/tours', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(tourMock))
      )
    );
    server.listen();

    render(<Tour />)

    await waitFor(() => {
      const images = screen.getAllByRole('img');
      const button = screen.getByText('Добавить в корзину');
      expect(images.length).toEqual(2);
      expect(button).toBeDisabled();
    })

    server.close();
    server.resetHandlers();
  });

  /*it('allow to add', async () => {
    const server = setupServer(
      rest.get(path + '/tours', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(tourMock))
      )
    );
    server.listen();

    render(<Tour token='1' />);

    await waitFor(() => {
      const buttons = screen.getAllByTestId('button-plus');
      fireEvent.click(buttons[0]);
    });
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    const date = screen.getByText('2021-12-30');
    expect(date).toBeInTheDocument();

    /!*const button = screen.getByText('Добавить в корзину');
    expect(button).not.toBeDisabled();*!/

    server.close();
    server.resetHandlers();
  });*/

  it('add to cart', async () => {
    let server = setupServer(
      rest.get(path + '/tours', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(tourMock))
      )
    );
    server.listen();

    render(<Tour token='1' />)

    await waitFor(() => {
      const buttons = screen.getAllByTestId('button-plus');
      fireEvent.click(buttons[0])
    })

    server.close();
    server.resetHandlers();

    server = setupServer(
      rest.get(path + '/cart', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(tourMock))
      )
    );

    server.listen();
    const button = screen.getByText('Добавить в корзину');
    fireEvent.click(button);
    expect(button).toBeDisabled();

    server.close();
    server.resetHandlers();
  });
})
