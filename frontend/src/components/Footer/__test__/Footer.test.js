import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../index'
import {BrowserRouter} from "react-router-dom";
import React from "react";

describe("Footer", () => {
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

  const MockFooter = (props) =>
    <BrowserRouter>
      <Footer {...props} />
    </BrowserRouter>


  it('footer test in the document', async () => {
    render(<Footer />);
    const element = screen.getByTestId('footer');
    expect(element).toBeInTheDocument();
  })

  it('footer links', async () => {
    render(<MockFooter categories={categoriesMock} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toEqual(12);
  })

  it('footer categories test', async () => {
    render(<MockFooter categories={[]} />);
    const links = screen.queryAllByRole('link');
    expect(links.length).toEqual(0);
  })
});
