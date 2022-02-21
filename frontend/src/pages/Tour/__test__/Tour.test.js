import {fireEvent, render, screen, waitFor, within} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from "react";
import {setupServer} from "msw/node";
import { rest } from 'msw';
import Tour from "../index";

describe('Tour', () => {
  const path = 'https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1';

  const tourMock = {
    "imagesPath": "http://www.hiddenside.ru/photos/industrial/lo/zabroshennyy_detskiy_lager_leninets_roshchino_2015/37.JPG;http://www.hiddenside.ru/photos/industrial/lo/zabroshennyy_detskiy_lager_leninets_roshchino_2015/41.JPG",
    "name": "Меняем музеи на заброшки под Петербургом!",
    "description": "Вас ждет индустриальный маршрут по Ленинградской области!Вместо парадных зданий — окутанные флером загадочностизаброшенные объекты, дивная природа, дух исследований.Мы проедем по старым детским лагерям, получим дозуадреналина, сделаем яркие фото. А чтобы отдохнуть от«фильмов ужасов», погуляем по Линдуловской роще иполюбуемся Ладожским озером.Мы обсудим, что еще можно делать в покинутых местах.Например, нестандартные фото для ленты на фоне фактур и внутристроений. После поедем в Линдуловскую рощу — это словно сладкая пилюляпосле знакомства с жутковатыми заброшками. В завершениеустроим пикник на берегу Ладожского озера!",
    "isLiked": true,
    "dates": [
      {
        "date": "2022-03-20",
        "ticketAmount": 10
      },
      {
        "date": "2022-03-27",
        "ticketAmount": 10
      }
    ],
    "time": "15:00:00",
    "prices": {
      "full": 3500,
      "seniors": 2450,
      "minors": 1750
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

  it('allow to add', async () => {
    const server = setupServer(
      rest.get(path + '/tours', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(tourMock))
      )
    );
    server.listen();

    render(<Tour token='1' />);

    let buttons;
    await waitFor(() => {
      buttons = screen.getAllByTestId('button-plus');
    });

    const selectLabel = 'Дата';
    const selectEl = await screen.findByLabelText(selectLabel);

    expect(selectEl).toBeInTheDocument();

    userEvent.click(selectEl);

    const optionsPopupEl = await screen.findByRole("listbox");

    const opt = within(optionsPopupEl).getByText("2022-03-20");
    userEvent.click(opt);
    fireEvent.click(buttons[0]);

    const button = screen.getByText('Добавить в корзину');
    expect(button).not.toBeDisabled();

    server.close();
    server.resetHandlers();
  });

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

  it('add to favs', async () => {
    let server = setupServer(
      rest.get(path + '/tours', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(tourMock))
      ),
      rest.delete('https://bellissimo-tour-agency.herokuapp.com/bellissimo/users/1/favorite/', (req, res, ctx) =>
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

  it('add to cart', async () => {
    let server = setupServer(
      rest.get(path + '/tours', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(tourMock))
      ),
      rest.post(path + '/cart', (req, res, ctx) =>
        res(ctx.status(200), ctx.json({}))
      )
    );
    server.listen();

    render(<Tour token='1' />);

    let buttons;
    await waitFor(() => {
      buttons = screen.getAllByTestId('button-plus');
    });

    const selectLabel = 'Дата';
    const selectEl = await screen.findByLabelText(selectLabel);

    userEvent.click(selectEl);

    const optionsPopupEl = await screen.findByRole("listbox");

    const opt = within(optionsPopupEl).getByText("2022-03-20");
    userEvent.click(opt);
    fireEvent.click(buttons[0]);

    const button = screen.getByText('Добавить в корзину');
    fireEvent.click(button);

    await waitFor(() => {
      const date = screen.queryByText("2022-03-20");
      expect(date).not.toBeInTheDocument();
    });

    server.close();
    server.resetHandlers();
  });

  it('fail add to cart', async () => {
    let server = setupServer(
      rest.get(path + '/tours', (req, res, ctx) =>
        res(ctx.status(200), ctx.json(tourMock))
      ),
      rest.post(path + '/cart', (req, res, ctx) =>
        res(ctx.status(200), ctx.json({}))
      )
    );
    server.listen();

    render(<Tour token='1' />);

    let buttons;
    await waitFor(() => {
      buttons = screen.getAllByTestId('button-plus');
    });

    const selectLabel = 'Дата';
    const selectEl = await screen.findByLabelText(selectLabel);

    userEvent.click(selectEl);

    const optionsPopupEl = await screen.findByRole("listbox");

    const opt = within(optionsPopupEl).getByText("2022-03-20");
    userEvent.click(opt);

    for (let i = 0; i < 11; i++ ) {
      fireEvent.click(buttons[0]);
    }

    const button = screen.getByText('Добавить в корзину');
    fireEvent.click(button);

    const date = screen.queryByText("Пожалуйста, выберите другое количество билетов");
    expect(date).toBeInTheDocument();

    server.close();
    server.resetHandlers();
  });
});
