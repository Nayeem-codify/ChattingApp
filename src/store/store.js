import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slice/authSlice'
import activeMsgSlice from '../slice/activeMsgSlice'

export const store = configureStore({
    reducer: {
        loginUserData: authSlice,
        activeChatUser: activeMsgSlice,
    },
})