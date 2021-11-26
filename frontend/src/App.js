import './App.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import FavouritesButton from "./components/FavouritesButton";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />
        <FavouritesButton />
        <Routes>
          <Route path='/' element={<>Главная</>} />
          <Route path='/certificates' element={<>Сертификаты</>} />
          <Route path='/help' element={<>Помощь</>} />
          <Route path='*' element={<></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
