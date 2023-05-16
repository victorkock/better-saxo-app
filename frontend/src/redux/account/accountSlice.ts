import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FetchAPIClient } from "./../../api/Client"
import { AppDispatch } from '../store';
import Account from '../../components/account/AccountList';

// Include Lodash functions
var _ = require("lodash");

// Create client
const client = new FetchAPIClient();

export interface Account {
  accountId: string
  accountKey: string
}

// Define a type for the slice state
interface AccountState {
  accounts: Account[]
}

// Define the initial state using that type
const initialState: AccountState = {
  accounts: []
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      return {
        accounts: action.payload
      }
    },
  },
})

export const fetchAccounts = (): any => async (dispatch: AppDispatch) => {
  try {
    const response = await client.get<any>('accounts/me');
    const accounts: Account[] = response.Data.map((a : any) => {
      return {
        accountId: a.AccountId,
        accountKey: a.AccountKey,
      } as Account;
    });
    dispatch(setAccounts(accounts));
  } catch (error) {
    console.error(error);
  }
};

export const { setAccounts } = accountSlice.actions

export default accountSlice.reducer