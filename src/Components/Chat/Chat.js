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
            const filterMessages = message.filter(message => message.data.userId === +id);
            const sortedMessages = filterMessages.sort((a, b) => a.data.time - b.data.time)
            setMessages(sortedMessages);
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
        <div className={'chat_wrap flex'}>

            <div className={'chat_header flex'}>

                <div className={'header_logo'}>
                    <img src={data.avatar} alt="logo" className={'logo'}/>
                    <img src={check} alt="check" className={'check'}/>
                </div>
                <h4>{data.name}</h4>

            </div>

            <div className={'chat_medium'}>


                {messages && messages.map(message =>
                    <div key={message.id}>
                        {message.data.text ?

                            <div className={'medium_text flex'}>
                                <div  style={{background:"rgb(224,224,224)"}} className={'text'}>
                                    {message.data.text}
                                </div>
                                <p>
                                    {new Date(message.data.time ).toLocaleString().replaceAll('.','/').slice(0,-3)}
                                </p>
                            </div>

                            :
                            <div className={'medium_answer flex'}>

                                <div className={'header_logo'}>
                                    <img src={data.avatar} alt="logo" className={'logo'}/>
                                </div>

                                <div style={{maxWidth:'70%'}}>

                                    <div className={'text'} style={{background:"rgb(59,63,82)",color:"white"}}>
                                        {message.data.answer}
                                    </div>

                                    <p>
                                        {new Date(message.data.time ).toLocaleString().replaceAll('.','/').slice(0,-3)}
                                    </p>
                                </div>

                            </div>
                        }
                    </div>
                )}
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
