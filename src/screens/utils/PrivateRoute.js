import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from './Common';
 
// handle the private routes
const PrivateRoute = () => {
  const token = getToken();
  return (
    token ? <Outlet /> : <Navigate to='/login' />
    // <Route
    //   {...rest}
    //   render={(props) => getToken() ? <Component {...props} /> : <Navigate to={{ pathname: '/login', state: { from: props.location } }} />}
    // />
  )
}
 
export default PrivateRoute;