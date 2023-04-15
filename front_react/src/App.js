import './App.css';
import Home from './Page/Home/Home';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <div className="App">
        <Home />
      </div>

      <Routes>
        {/* <Route path ='/' element = {<Boxoffice />} />
      <Route path ='/mv' element = {<Boxmv />} /> */}
      </Routes>
    </>
  );
}

export default App;
