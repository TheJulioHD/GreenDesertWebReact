import React, { useCallback, useEffect, useState } from 'react'
import {User, getAuth, onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
export interface IAuthRouterProps {};

const AuthRouter:React.FunctionComponent<IAuthRouterProps> = (props) => {
    
    const { children }:any = props;
    const auth =getAuth()
    const navigate = useNavigate()
    const[loading, setLoading] = useState(false)


    const AuthCheck = onAuthStateChanged(auth, (user) => {

        if (user) {
            console.log('asd');
        } else {
            console.log('unauthorized');
            navigate('/auth/login');
        }
    });
    
    return <>{children}</>
}

export default AuthRouter