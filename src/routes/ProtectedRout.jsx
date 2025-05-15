import React from 'react'
import cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';
const ProtectedRout = ({children}) => {
    const token=cookies.get("jwt-token");

    const isJWT = (token)=> {
    const jwtRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+$/;
    return jwtRegex.test(token);
    };



    if(token && isJWT(token)){
        return children;
    }else{
        return <Navigate to='/login'/>
    }

}

export default ProtectedRout