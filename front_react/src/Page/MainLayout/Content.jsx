import { Route,Routes } from "react-router-dom";

export default function Content1() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/api/board" element={<div>dashboard</div>} />
        <Route path="/api/userlist" element={<div>userlist</div>} />
        <Route path="/api/activeUsers" element={<div>activeUsers</div>} />
        <Route path="/api/disabledUsers" element={<div>disabledUsers</div>} />
        <Route path="/api/profile" element={<div>profile</div>} />
        <Route path="/api/signout" element={<div>signout</div>} />
      </Routes>
    </div>
  );
}
