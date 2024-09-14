import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlic'

export const store = configureStore({
  reducer: {
    user : userReducer
  },
})