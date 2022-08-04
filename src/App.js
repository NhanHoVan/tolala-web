import React, {useState, useEffect} from 'react';
import Navbar from './screens/navbar/Navbar';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './screens/home/Home';
import Friends from './screens/friends/Friends';
import Login from './screens/login/Login';
import Message from './screens/message/Message';
import PrivateRoute from './screens/utils/PrivateRoute';
import PublicRoute from './screens/utils/PublicRoute';
import axios from 'axios';
import { getToken, removeUserSession, setUserSession } from './screens/utils/Common';

function App() {

  const [authLoading, setAuthLoading] = useState(true);
  const [infUsers, setInfUsers] = useState([]);
  
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    //Get verify Token
    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });

    //Get API User
    axios.get(`http://localhost:4000/users?token=${token}`).then(response => {
        setInfUsers(response.data.userInfor);
    }).catch(error => {
        console.log("Get API Users Error");
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="app">
      <BrowserRouter>
      <div className="bgr_app">
        <div className="bgr_navbar">
          <Navbar infUsers = {infUsers}/>
        </div>
        <Routes>
          <Route exact path="/" element={<Home infUsers = {infUsers}/>} />
          
          <Route exact path='/friends' element={<PrivateRoute />}>
            <Route exact path='/friends' element={<Friends />}/>
          </Route>
          
          <Route exact path='/messenger' element={<PrivateRoute />}>
            <Route exact path='/messenger' element={<Message />}/>
          </Route>

          <Route exact path='/login' element={<PublicRoute />}>
            <Route exact path='/login' element={<Login />}/>
          </Route>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
