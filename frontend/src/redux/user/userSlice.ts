import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FetchAPIClient } from "./../../api/Client"
import { AppDispatch } from '../store';
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
    setUser: (state: UserState, action: PayloadAction<UserState>) => {
      return { 
        id: action.payload.id,
        name: action.payload.name,
      }
    }
  },
});

export const fetchUser = (): any => async (dispatch: AppDispatch) => {
  try {
    const response = await client.get<any>('users/me');
    const user: UserState = {
      id: response.UserId,
      name: response.Name,
    };
    dispatch(setUser(user));
  } catch (error) {
    console.error(error);
  }
};

export const { setUser } = userSlice.actions

export default userSlice.reducer