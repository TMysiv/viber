import React from 'react';
import GoogleButton from "react-google-button";
import {UserAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

import css from './style.css';

const Login = () => {

    const {googleSignIn} = UserAuth();

    const navigate = useNavigate()

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn()
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={'login flex'}>
            <h2>Sign In</h2>
            <h6>Please,login with your Google account</h6>
            <div>
                <GoogleButton onClick={handleGoogleSignIn}/>
            </div>
        </div>
    );
};

export default Login;
