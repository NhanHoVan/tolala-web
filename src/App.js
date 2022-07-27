import React from 'react';
import Navbar from './screens/navbar/Navbar';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './screens/home/Home';
import Friends from './screens/friends/Friends';

const user = {
  id: "aaaaas1",
  name: "Nguyen Viet Hoang",
  birthday: "22/2/2022",
  avatar: "",
  hobby: "Đá bóng",
  relationship: 1,
  registerDate: "26/7/2022",
  email: ""
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <div className="bgr_app">
        <div className="bgr_navbar">
          <Navbar />
        </div>
        <Routes>
          <Route exact path="/" element={<Home user={user}/>} /> {/*./imgs/img_admin.png */}
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
