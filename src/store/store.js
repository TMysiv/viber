import {configureStore} from "@reduxjs/toolkit";
import {messageReducer} from "./message.slice";

export const store = configureStore({
    reducer:{
        messageReducer
    }
})
