import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface UserState {
  name: string,
  id: string
}

// Define the initial state using that type
const initialState: UserState = {
  name: '',
  id: ''
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchUser: (state) => {
      state.name = 'Magnus'
      state.id = 'bip bop'
    }
  },
})

export const { fetchUser } = userSlice.actions

export default userSlice.reducer