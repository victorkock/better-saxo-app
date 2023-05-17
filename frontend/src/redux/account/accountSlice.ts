import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { FetchAPIClient } from "./../../api/Client"
import store, { AppDispatch } from '../store';
import { fetchBalance } from '../balance/balanceSlice';

// Create client
const client = new FetchAPIClient();

export interface Account {
  accountId: string
  accountKey: string
  balance: number
}

export interface AccountDetails {
  accountId: string
  accountKey: string
  balance: number
  currency: string
  availableForTrading: number
}

// Define a type for the slice state
interface AccountState {
  accounts: Account[]
  chosenAccount: AccountDetails | undefined
}

// Define the initial state using that type
const initialState: AccountState = {
  accounts: [],
  chosenAccount: undefined
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      return {
        ...state,
        accounts: action.payload
      }
    },
    setChosenAccount: (state, action: PayloadAction<AccountDetails>) => {
      return {
        ...state,
        chosenAccount: action.payload
      }
    },
  },
})

export const fetchAccounts = (): any => async (dispatch: AppDispatch) => {
  try {
    const response = await client.get<any>('port/v1/accounts/me');
    const accounts: Account[] = response.Data.map((a : any) => {      
      return {
        accountId: a.AccountId,
        accountKey: a.AccountKey,
      } as Account
    });
    dispatch(setAccounts(accounts));
  } catch (error) {
    console.error(error);
  }
};

export const putNewBalance = (amount: number, accountKey: string): any => async (dispatch: AppDispatch) => {
  try {
    await client.put<any>(`port/v1/accounts/${accountKey}/reset`, {NewBalance: amount});
    dispatch(fetchBalance())
  } catch (error) {
    console.error(error);
  }
};

export const fetchAccountDetails = (account: Account): any => async (dispatch: AppDispatch) => {
  try {
    const response = await client.get<any>(`port/v1/balances?ClientKey=${store.getState().user.clientKey}&AccountKey=${account.accountKey}`);
    const accountDetails: AccountDetails = {
      accountId: response.AccountId,
      accountKey: response.AccountKey,
      balance: response.CashBalance,
      currency: response.Currency,
      availableForTrading: response.MarginAvailableForTrading
    }
    dispatch(setChosenAccount(accountDetails));
  } catch (error) {
    console.error(error);
  }
};

export const createAccount = (choiceOfAccount: string): any => async (dispatch: AppDispatch) => {
  // TODO: figure out ChoiceOfAccount
  try {
    const request = {
      ChoiceOfAccount: choiceOfAccount,
      ClientKey: store.getState().user.clientKey
    }
    await client.post<any>('cm/v2/accounts', request);
    dispatch(fetchAccounts());
  } catch (error) {
    console.error(error);
  }
};

export const { setAccounts, setChosenAccount } = accountSlice.actions

export default accountSlice.reducer