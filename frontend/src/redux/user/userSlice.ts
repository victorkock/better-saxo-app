import { createSlice } from '@reduxjs/toolkit'
import { FetchAPIClient } from "./../../api/Client"
// Define a type for the slice state
interface UserState {
  name: string,
  id: string
}

const client = new FetchAPIClient();

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
      client.get<any>("users/me")
      .then((response) => {
        
      })
      .catch((error) => {
        console.error(error);
      });
    }
  },
})

export const { fetchUser } = userSlice.actions

export default userSlice.reducer