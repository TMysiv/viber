import React from 'react';
import Container from "./Components/Container/Container";
import {AuthContextProvider} from "./context/AuthContext";
import {Route, Routes} from "react-router-dom";
import Login from "./Components/Login/Login";
import Protected from "./Hok/Protected";
import Chat from "./Components/Chat/Chat";

const App = () => {
    return (

        <AuthContextProvider>
            <Routes>
                <Route path={'signIn'} element={<Login/>}/>
                <Route path={'/'} element={<Protected><Container/></Protected>}>
                    <Route path={':name'} element={<Chat/>}/>
                </Route>

            </Routes>
        </AuthContextProvider>
    )
        ;
};

export default App;
