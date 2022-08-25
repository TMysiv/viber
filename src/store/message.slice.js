import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:'messageSlice',
    initialState:{
        messages:[],
    },
    reducers:{
        getMessagesFromDb:(state,action) =>{
            state.messages = action.payload.message
        }
    }
})

export const messageReducer = messageSlice.reducer;

export const {getMessagesFromDb} = messageSlice.actions
