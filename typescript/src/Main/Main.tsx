import { useState } from 'react';
import Header from './Header/Header'
import Footer from './Footer/Footer'
import SideMenu from './SideMenu/SideMenu'
import { Route, Routes} from 'react-router';
import Home from './Home/Home';
import Board from '../pages/Board/Board';
import Profile from '../pages/Profile/Profile';
import './index.css'
import BoardDetail from '../pages/Board/BoardDetail/BoardDetail';
import BoardWrite from '../pages/Board/BoardWrite.tsx/BoardWrite';
import BoardContent from '../pages/Board/BoardContent/BoardContent';
import ShoppingBoard from '../pages/ShoppingBoard/ShoppingBoard';
import Inventory from '../pages/Inventory/Inventory';
import Orders from '../pages/Orders/Orders';
import Login from '../pages/Login/Login';
import Admin from '../pages/Admin/Admin';

export default function Main() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
 
  return (
    <div className="wrapper">
      <div className="header">
        <Header darkMode={darkMode} />
      </div>
      <div className="contentWrapper">
        <div className="sideMenu">
          <SideMenu darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
        <div className="content">
          <Routes>
            <Route path="/api/home" element={<Home />} />
            <Route path="/api/board" element={<Board />} />
            <Route path="/api/boardDetail" element={<BoardDetail />} />
            <Route path="/api/boardWrite" element={<BoardWrite />} />
            <Route path="/api/boardContent" element={<BoardContent />} />
            <Route path="/api/profile" element={<Profile />} />
            <Route path="/api/signout" element={<Home />} />
            <Route path="/api/login" element={<Login />} />
            <Route path="/api/shoppingBoard" element={<ShoppingBoard />} />
            <Route path="/api/orders" element={<Orders />} />
            <Route path="/api/inventory" element={<Inventory />} />
            <Route path="/api/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
      <div className="footer">
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}
