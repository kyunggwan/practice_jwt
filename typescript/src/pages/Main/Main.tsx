
import Header from './Header/Header'
import Footer from './Footer/Footer'
import SideMenu from './SideMenu/SideMenu'
import { Route, Routes} from 'react-router';
import Home from './Home/Home';
import Board from '../Board/Board';
import Profile from '../Profile/Profile';
import './index.css'
import BoardDetail from '../Board/BoardDetail/BoardDetail';
import BoardWrite from '../Board/BoardWrite.tsx/BoardWrite';
import BoardContent from '../Board/BoardContent/BoardContent';


export default function Main() {
  return (
    <div className="wrapper">
      <div className="header">
        <Header />
      </div>
      <div className="contentWrapper">
        <div className="sideMenu">
          <SideMenu />
        </div>
        <div className="content">
          <Routes>
            <Route path="/api/home" element={<Home />} />
            <Route path="/api/board" element={<Board />} />
            <Route path="/api/boardDetail" element={<BoardDetail />} />
            <Route path="/api/boardWrite" element={<BoardWrite />} />
            <Route path="/api/boardContent" element={<BoardContent />} />
            <Route path="/api/profile" element={<Profile />} />
            <Route path="/api/signout" element={<div>signout</div>} />
          </Routes>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
