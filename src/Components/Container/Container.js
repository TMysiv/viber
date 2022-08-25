import React from 'react';
import {Outlet} from 'react-router-dom';

import css from './style.css'
import Users from "../Users/Users";

const Container = () => {

    return (
        <div className={'container flex'}>
            <Users/>
            <Outlet/>
        </div>
    );
};

export default Container;
