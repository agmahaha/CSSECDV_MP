import LogForm from "./pages/loginPage"
import Home from './pages/homePage'
import About from './pages/aboutPage'
import PageNotFound from './pages/pageNotFound'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/login" element={<LogForm/>}/>
        <Route path = "/about" element={<About/>}/>
        <Route path = "/pageNotFound" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
