import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from './Common';
 
// handle the public routes
const PublicRoute = () => {
  const token = getToken();
  return (
    (!token) ? <Outlet /> : <Navigate to='/' />
    // <Route
    //   {...rest}
    //   render={(props) => !getToken() ? <Component {...props} /> : <Navigate to={{ pathname: '/' }} />}
    // />
  )
}
 
export default PublicRoute;