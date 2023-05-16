import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Account, fetchAccounts } from "../../redux/account/accountSlice"
import { useAppDispatch } from "../../redux/hooks";



const AccountList = (props: any) => {

    const dispatch = useAppDispatch();

    const accountItems = props.accounts.map((account: Account) =>
        <li>
            <p>{account.accountId}</p>
            <p>{account.accountKey}</p>
        </li>
    );
    
    useEffect(() => {
		dispatch(fetchAccounts())
	}, [dispatch]);
    console.log(props);
    return (
        <>
            <ul>{accountItems}</ul>
        </>
    );
}

const mapStateToProps = (state: any) => {
    return {
        accounts: state.account.accounts
    }
}

export default connect(mapStateToProps)(AccountList);