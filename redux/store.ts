import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './features/users/usersSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export const store=configureStore({
    reducer:{
        users:usersReducer
    },
    devTools:true
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch

export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector