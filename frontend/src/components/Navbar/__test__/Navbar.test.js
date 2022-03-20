import { render, screen } from '@testing-library/react';
import React from "react";
import {BrowserRouter} from "react-router-dom";
import Navbar from "../index";

describe("Navbar", () => {
  const categoriesMock = [
    {
      "id": 1,
      "englishName": "boat-trips",
      "russianName": "Водные прогулки"
    },
    {
      "id": 2,
      "englishName": "walking-tours",
      "russianName": "Пешие экскурсии"
    },
    {
      "id": 3,
      "englishName": "bus-tours",
      "russianName": "Автобусные экскурсии"
    },
    {
      "id": 4,
      "englishName": "museums",
      "russianName": "Музеи и выставки"
    },
    {
      "id": 5,
      "englishName": "mystical-tours",
      "russianName": "Мистические экскурсии"
    }
  ];

  const categoriesMockError = [
    {
      "id": 1,
      "englishName": "kek",
      "russianName": "кек"
    },
  ];

  const MockNavbar = (props) =>
    <BrowserRouter>
      <Navbar {...props} />
    </BrowserRouter>

  it('buttons for not authorized user', async () => {
    render(<MockNavbar categories={categoriesMock} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toEqual(7);
  })
  it('navbar categories test', async () => {
    render(<MockNavbar categories={[]} />);
    const links = screen.queryAllByRole('link');
    expect(links.length).toEqual(0);
  })

  it('navbar to be in document test', async () => {
    render(<MockNavbar categories={[]} />);
    const element = screen.getByTestId('navbar');
    expect(element).toBeInTheDocument();
  })

  it('navbar default test', async () => {
    render(<MockNavbar categories={categoriesMockError} />);
    const el = screen.getByTestId("icon");
    expect(el).toHaveClass("icon fas fa-map-marker-alt");
  })
  it('navbar to be in document test 2', async () => {
    render(<MockNavbar />);
    const element = screen.getByTestId('navbar');
    expect(element).toBeInTheDocument();
  })
});