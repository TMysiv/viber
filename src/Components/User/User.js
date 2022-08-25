import React from 'react';
import check from "../../images/free-png.ru-39.png";
import {Link} from "react-router-dom";

const User = ({user}) => {

    return (
        <Link to={`user=${user.data.name}`} state={user}>
            <div key={user.id} className={'user'}>

                <div className={'userMain'}>

                    <div className={'userLogo'}>
                        <img className={'logo'} src={user.data.avatar} alt='logo'/>
                        <img className={'check'} src={check} alt='check'/>
                    </div>

                    <div className={'userMessage'}>
                        <h4>{user.data.name}</h4>
                        <p>{user.data.lastMessage}</p>
                    </div>

                </div>

                <div className={'userDate'}>
                    {new Date(user.data.time).toDateString().slice(3)}
                </div>

            </div>
        </Link>
    );
};

export default User;
