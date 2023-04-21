import { Route,Routes } from "react-router-dom";
import Profile from "./Profile/Profile";
import Board from "./Board/Board";

export default function Content1() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/api/board" element={<Board />} />
        <Route path="/api/userlist" element={<div>userlist</div>} />
        <Route path="/api/activeUsers" element={<div>activeUsers</div>} />
        <Route path="/api/disabledUsers" element={<div>disabledUsers</div>} />
        <Route path="/api/profile" element={<Profile />} />
        <Route path="/api/signout" element={<div>signout</div>} />
      </Routes>
    </div>
  );
}
