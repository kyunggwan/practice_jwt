import { Route,Routes } from "react-router-dom";
import Profile from "./Profile/Profile";
import Board from "./Board/Board";
import UserList from "./UserList/UserList";
import UserPatch from "./UserPatch/UserPatch";

export default function Content1() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/api/board" element={<Board />} />
        <Route path="/api/home" element={<div>Home</div>} />
        <Route path="/api/userlist" element={<UserList />} />
        <Route path="/api/disabledUsers" element={<div>disabledUsers</div>} />
        <Route path="/api/profile" element={<Profile />} />
        <Route path="/api/signout" element={<div>signout</div>} />
        <Route path="/api/userpatch" element={<UserPatch />} />
      </Routes>
    </div>
  );
}
