import './App.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import UiKit from "./pages/UiKit";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import PageHeading from "./components/PageHeading";
import HelpPage from "./pages/Help";
import HelpButton from "./components/HelpButton";
import React, {useCallback, useEffect, useState} from "react";
import {Backdrop, CircularProgress} from "@mui/material";
import Certificates from "./pages/Certificates";

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
      <div className="App">
        <Header />
        <Navbar categories={categories}/>
        <div className='layout'>
          <Routes>
            <Route path='/' element={<PageHeading>Главная</PageHeading>} />
            <Route path='/certificates' element={<Certificates />} />
            <Route path='/help' element={<HelpPage />} />
            <Route path='*' element={<></>} />
            <Route path='/ui-kit' element={<UiKit />} />
          </Routes>
        </div>
        <div className='app-upper-layer'>
          <div className='app-help-button'>
            <HelpButton />
          </div>
        </div>
      <Footer categories={categories}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
