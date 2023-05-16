import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuthorized: boolean,
  token: string
}

const initialState: AuthState = {
  isAuthorized: false,
  token: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize: (state, action: PayloadAction<string>) => {
      return {
        token: action.payload,
        isAuthorized: state.isAuthorized ? false : true
      }
    }
  },
})

export const { authorize } = authSlice.actions

export default authSlice.reducer