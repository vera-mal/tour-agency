import { render, screen, fireEvent } from '@testing-library/react';
import FavouritesButton from '../index'
import React from "react";

describe("FavouritesButton", () => {
  it('favourites button test in document', async () => {
    render(<FavouritesButton />);    
    const favouritesButtonElement = screen.getByTitle("favourites button title");
    expect(favouritesButtonElement).toBeInTheDocument();
  })

  it('favourites button default state false', async () => {
    render(<FavouritesButton />);    
    const favouritesButtonElement = screen.getByTitle("favourites button title");
    expect(favouritesButtonElement).toHaveClass("far fa-heart fa-lg");
  })

  it('favourites button change state', async () => {
    render(<FavouritesButton />);    
    const favouritesButtonElement = screen.getByTitle("favourites button title");
    fireEvent.click(favouritesButtonElement);
    expect(favouritesButtonElement).toHaveClass("fas fa-heart fa-lg");
  })
});
