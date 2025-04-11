import LogForm from "./pages/loginPage"
import Home from './pages/homePage'
import About from './pages/aboutPage'
import Profile from './pages/profilePage'
import Logs from './pages/logPages'
import ManageUsers from './pages/manageUsersPage'
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
        <Route path = "/profile" element={<Profile/>}/>
        <Route path = "/logs" element={<Logs/>}/>
        <Route path = "/manageUser" element={<ManageUsers/>}/>
        <Route path="*" element={<Navigate to="/pageNotFound" />} />
        <Route path = "/pageNotFound" element={<PageNotFound/>}/>
        <Route path = "/unauthorizedAccess" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
