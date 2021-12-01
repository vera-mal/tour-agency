import './App.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import UiKit from "./pages/UiKit";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import PageHeading from "./components/PageHeading";
import HelpPage from "./pages/Help";
import HelpButton from "./components/HelpButton";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />
        <div className='layout'>
          <Routes>
            <Route path='/' element={<PageHeading>Главная</PageHeading>} />
            <Route path='/certificates' element={<PageHeading>Сертификаты</PageHeading>} />
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
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
