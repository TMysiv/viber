import React, {useEffect, useState} from 'react';
import {getDocs} from 'firebase/firestore';
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";

import {usersFromDb} from '../../firebase'
import logo from "../../images/Users-User-icon.png";
import check from '../../images/free-png.ru-39.png';
import css from './style.css';
import User from "../User/User";

const Users = () => {

    const {register,handleSubmit} = useForm();

    const [users, setUsers] = useState([]);
    const [value,setValue] = useState([]);

    const {messages} = useSelector(state => state['messageReducer']);

    const getUsers = () => {

        getDocs(usersFromDb).then(value => {
            const user = value.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
            const sortedUsers = user.sort((a, b) => b.data.time - a.data.time);
            setUsers(sortedUsers)
            setValue(sortedUsers);
        })

    }

    useEffect(() => {
        getUsers()
    }, [messages.length])

    const filterUsers = (data) => {
        let filterUsers = [...value];

        if (data.search) {
            filterUsers = filterUsers.filter(user => user.data.name.toLowerCase()
                .includes(data.search.toLowerCase()));
        }

        setUsers(filterUsers);
    }

    return (

        <div className={'main'}>

            <div className={'header'}>

                <div className={'header_logo'}>
                    <img className={'logo'} src={logo} alt='logo'/>
                    <img className={'check'} src={check} alt='check'/>
                </div>

                <form onChange={handleSubmit(filterUsers)}>
                    <input type="search" placeholder={'Search or start new chat'} {...register('search')}/>
                </form>

            </div>


            <div className={'users'}>

                <h2>Chats</h2>

                {users && users.map(user => <User key={user.id} user={user} ></User>)}

            </div>

        </div>
    );
};

export default Users;
