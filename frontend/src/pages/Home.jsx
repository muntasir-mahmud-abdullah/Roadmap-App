import React from 'react';
import { useAuth } from '../store/Auth';
import {useEffect} from 'react'
const Home = () => {
    const {user} = useAuth();
    useEffect(() => {
      console.log(user);
    }, [user])
    
    console.log(user)
    return (
        <div>
            <h1>This is {user.email} Page</h1>
        </div>
    );
};

export default Home;