import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store';
import { FetchAPIClient } from "./../../api/Client"

// Create client
const client = new FetchAPIClient();

interface BalanceState {
    cashBalance: number
    currency: string
    totalValue: number
}

const initialState: BalanceState = {
    cashBalance: 0,
    currency: "EUR",
    totalValue: 0 
}

export const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        setBalance: (state, action: PayloadAction<BalanceState>) => {
            return {
                ...state,
                cashBalance: action.payload.cashBalance,
                totalValue: action.payload.totalValue,
                currency: action.payload.currency,
            }
        }
    }
});

export const fetchBalance = (): any => async (dispatch: AppDispatch) => {
    try {
      const response = await client.get<any>('port/v1/balances/me');
      const balance: BalanceState = {
        cashBalance: response.CashBalance,
        totalValue: response.TotalValue,
        currency: response.Currency
      };
      dispatch(setBalance(balance));
    } catch (error) {
      console.error(error);
    }   
};

  export const { setBalance } = balanceSlice.actions

  export default balanceSlice.reducer