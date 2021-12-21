import './App.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import UiKit from "./pages/UiKit";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import HelpPage from "./pages/Help";
import HelpButton from "./components/HelpButton";
import React, {useCallback, useEffect, useState} from "react";
import Certificates from "./pages/Certificates";
import Favourites from "./pages/Favourites";
import Main from "./pages/Main";
import Tour from "./pages/Tour";
import Cart from "./pages/Cart";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = useCallback(() => {
    fetch('https://bellissimo-tour-agency.herokuapp.com/bellissimo/categories')
      .then(res => res.json())
      .then((result) => {
          setCategories(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
        })
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <BrowserRouter>
      <ScrollToTop>
        <div className="App">
          <Header />
          <Navbar categories={categories} />
          <div className='layout'>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/category/:alias' element={<Main />} />
              <Route path='/certificates' element={<Certificates />} />
              <Route path='/help' element={<HelpPage />} />
              <Route path='*' element={<></>} />
              <Route path='/ui-kit' element={<UiKit />} />
              <Route path='/favourites' element={<Favourites />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/tour/:id' element={<Tour />} />
            </Routes>
          </div>
          <div className='app-upper-layer'>
            <div className='app-help-button'>
              <HelpButton />
            </div>
          </div>
        <Footer categories={categories}/>
        </div>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
