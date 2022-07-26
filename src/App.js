import React from 'react';
import Navbar from './screens/navbar/Navbar';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './screens/home/Home';
import Friends from './screens/friends/Friends';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <div className="bgr_app">
        <div className="bgr_navbar">
          <Navbar />
        </div>
        <Routes>
          <Route exact path="/" element={<Home img_admin={""}/>} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
