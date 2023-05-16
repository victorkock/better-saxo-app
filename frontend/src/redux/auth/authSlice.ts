import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {
  isAuthorized: boolean,
  token: string
}

// Define the initial state using that type
const initialState: AuthState = {
  isAuthorized: false,
  token: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isAuthorized = state.isAuthorized ? false : true
    }
  },
})

export const { authorize } = authSlice.actions

export default authSlice.reducer