import { configureStore } from '@reduxjs/toolkit'
import accountSlice from './account/accountSlice'
import authSlice from './auth/authSlice'
import userSlice from './user/userSlice'
import thunkMiddleware from 'redux-thunk'

const store = configureStore({
  reducer: {
    account: accountSlice,
    auth: authSlice,
    user: userSlice
  },
  middleware: [thunkMiddleware]
},)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store