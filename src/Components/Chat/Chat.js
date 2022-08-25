import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import {getDocs, addDoc, updateDoc, doc} from 'firebase/firestore';
import {useDispatch} from "react-redux";

import check from '../../images/free-png.ru-39.png';
import {messagesFromDb, firestore} from "../../firebase";
import {apiMessage} from "../../services/getApiMessage";
import {getMessagesFromDb} from "../../store/message.slice";

import css from './style.css';

const Chat = () => {


    const {register, handleSubmit, reset} = useForm();
    const [messages, setMessages] = useState([]);

    const {state} = useLocation();
    const {data, id} = state;

    const dispatch = useDispatch();

    const getMessages = () => {

        getDocs(messagesFromDb).then(value => {
            const message = value.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
            const filterMessage = message.filter(message => message.data.userId === +id);
            const sorted = filterMessage.sort((a, b) => a.data.time - b.data.time)
            setMessages(sorted);
            dispatch(getMessagesFromDb({message}))
        })
    }


    const createMessage = (data) => {

        const user = doc(firestore, 'users', id)

        addDoc(messagesFromDb, {
            userId: +id,
            text: data.message,
            time: new Date().getTime()
        })
        updateDoc(user, {
            lastMessage: data.message,
            time: new Date().getTime()
        })
        getMessages()
        reset()

        setTimeout(() => {
            apiMessage.getMessage().then(response => {
                addDoc(messagesFromDb, {
                    userId: +id,
                    answer: response.value,
                    time: new Date().getTime()
                })
                updateDoc(user, {
                    lastMessage: response.value,
                    time: new Date().getTime()
                })
                getMessages();
            })
        }, 2000)
    }

    useEffect(() => {
        getMessages()
    }, [id])


    return (
        <div className={'chat_wrap'}>

            <div className={'chat_header'}>

                <div className={'userLogo'}>
                    <img src={data.avatar} alt="logo" className={'logo'}/>
                    <img src={check} alt="check" className={'check'}/>
                </div>
                <h4>{data.name}</h4>

            </div>

            <div className={'chat_medium'}>
                {messages && messages.map(message => <div key={message.id} className={'medium'}>
                    <div style={{display:'flex', columnGap:"10px"}}>
                        <div className={'userLogo'} style={{display:message.data.answer ? "flex" : "none"}}>
                            <img src={data.avatar} alt="logo" className={'logo'}/>
                        </div>
                        <p className={'medium_text'}
                           style={{background: message.data.answer ? "rgb(136,141,165)" : "none"}}>{message.data.answer}</p>
                    </div>
                    <div className={'medium_text'}
                         style={{background: message.data.text ? "rgb(224,224,224)" : "none"}}>
                        {message.data.text}
                    </div>
                </div>)}

            </div>

            <div className={'chat_bottom'}>

                <form onSubmit={handleSubmit(createMessage)}>
                    <input type="text" placeholder={'Type your message'}  {...register('message')}/>
                    <button type={'submit'}></button>
                </form>

            </div>

        </div>
    );
};

export default Chat;
