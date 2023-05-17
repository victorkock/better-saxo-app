import { ChangeEvent, useState } from "react";
import { putNewBalance } from "../../redux/account/accountSlice"
import { connect } from "react-redux";
import store from "./../../redux/store"
import { fetchBalance } from "../../redux/balance/balanceSlice";

const _ = require("lodash");

const Balance = (props: any) => {

    const accountKey = store.getState().account.accounts[0].accountKey;
    
    const [amount, setAmount] = useState(0);

    const [toggleBalanceInput, setToggleBalanceInput] = useState(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(event.currentTarget.value));
    };

    const handleToggleBalance = () => {
        setToggleBalanceInput(!toggleBalanceInput);
    };

    const addFunds = () => {
        props.dispatch(putNewBalance(amount + props.balance.cashBalance, accountKey));
        handleToggleBalance();
    };

    const balanceInput = (
        <>
            <input
            type="number"
            className="w-full py-3 px-4 bg-white-300 text-slate-900 rounded-md"
            placeholder="Add amount"
            value={amount}
            onChange={handleInputChange}
            />
            <button onClick={addFunds} className="inline-flex justify-center rounded-md text-lg text-white font-semibold my-1 py-3 px-4 bg-sky-900 hover:bg-slate-700">Confirm</button>
        </>
    );
    
    return (
        <>
            <h3 className="font-bold">Balance:</h3>
            <h3 className="text-sm">{props.balance.cashBalance} {props.balance.currency}</h3>
            <button onClick={handleToggleBalance} className="inline-flex justify-center rounded-md my-1 text-lg text-white font-semibold py-3 px-4 bg-sky-900 hover:bg-slate-700">Add funds</button>
            {toggleBalanceInput ? balanceInput : <></>}
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        balance: state.balance
    }
}

export default connect(mapStateToProps)(Balance);