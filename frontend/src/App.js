import './App.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
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
import History from "./pages/History";
import FormBackdrop from "./components/FormBackdrop";
import AuthorizationForm from "./components/AuthorizationForm";
import UserInputForm from "./components/UserInputForm";

function App() {
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpenAuth, setIsOpenAuth] = useState(false);
  const [isOpenReg, setIsOpenReg] = useState(false);
  const [token, setToken] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

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

  useEffect(() => {
    setToken(window.sessionStorage.getItem("token"));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    setCurrentUserId(window.sessionStorage.getItem("currentUserId"));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("currentUserId", currentUserId);
  }, [currentUserId]);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <div key={currentUserId} className="App">
          {isOpenAuth &&
            <FormBackdrop>
              <AuthorizationForm
                OnCloseButtonClick={() => setIsOpenAuth(false)}
                onRegClick={() => {
                  setIsOpenAuth(false);
                  setIsOpenReg(true);
                }}
              onSubmit={(accessToken, userId) => {
                setToken(accessToken);
                setCurrentUserId(userId);
              }}/>
            </FormBackdrop>
          }
          {isOpenReg &&
            <FormBackdrop>
              <UserInputForm OnCloseButtonClick={() => setIsOpenReg(false)}/>
            </FormBackdrop>
          }
          <Header
            isAuth={!!token}
            onLogInClick={() => setIsOpenAuth(true)}
            onLogOutClick={() => {
              setToken(null);
              setCurrentUserId(null);
            }}
          />
          <Navbar categories={categories} />
          <div className='layout'>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/category/:alias' element={<Main />} />
              <Route path='/certificates' element={<Certificates token={token} userId={currentUserId} />} />
              <Route path='/help' element={<HelpPage />} />
              <Route path='*' element={<></>} />
              <Route path='/favourites' element={<Favourites token={token} userId={currentUserId} />} />
              <Route path='/cart' element={<Cart token={token} userId={currentUserId} />} />
              <Route path='/history' element={<History token={token} userId={currentUserId} />} />
              <Route path='/tour/:id' element={<Tour token={token} userId={currentUserId} />} />
            </Routes>
          </div>
          <div className='app-help-button'>
            <HelpButton />
          </div>
        <Footer categories={categories}/>
        </div>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
