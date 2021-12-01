import './App.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import UiKit from "./pages/UiKit";
import {Routes, Route, BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />
        <Routes>
          <Route path='/' element={<>Главная</>} />
          <Route path='/certificates' element={<>Сертификаты</>} />
          <Route path='/help' element={<>Помощь</>} />
          <Route path='*' element={<></>} />
          <Route path='/ui-kit' element={<UiKit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
