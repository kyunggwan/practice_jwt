import './App.css';
import SignIn from './Page/Authentication/SignIn/SignIn';
import SignUp from './Page/Authentication/SignUp/SignUp';
import Home from './Page/Home/Home';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
