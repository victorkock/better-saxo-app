import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FetchAPIClient } from "./../../api/Client"
import { AppDispatch } from '../store';
// Define a type for the slice state
interface UserState {
  name: string,
  userId: string,
  clientKey: string,
}

const client = new FetchAPIClient();

// Define the initial state using that type
const initialState: UserState = {
  name: '',
  userId: '',
  clientKey: '',
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserState>) => {
      return { 
        ...state,
        userId: action.payload.userId,
        name: action.payload.name,
        clientKey: action.payload.clientKey,
      }
    }
  },
});

export const fetchUser = (): any => async (dispatch: AppDispatch) => {
  try {
    const response = await client.get<any>('port/v1/users/me');
    const user: UserState = {
      userId: response.UserId,
      name: response.Name,
      clientKey: response.ClientKey
    };
    dispatch(setUser(user));
  } catch (error) {
    console.error(error);
  }
};

export const { setUser } = userSlice.actions

export default userSlice.reducer