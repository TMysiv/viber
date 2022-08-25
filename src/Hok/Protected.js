import React from 'react';
import {UserAuth} from "../context/AuthContext";
import {Navigate} from 'react-router'

const Protected = ({children}) => {

    const {user} = UserAuth()

    if (!user) {
        return (<Navigate to={'signIn'}/>)
    }

    return children

};

export default Protected;
