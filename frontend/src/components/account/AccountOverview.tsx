import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Account, fetchAccounts, fetchAccountDetails } from "../../redux/account/accountSlice"
import { AppDispatch } from "../../redux/store";

const AccountOverview = (props: any) => {
    const [chosenAccount, setChosenAccount] = useState('')
    
    useEffect(() => {
		props.fetchAccounts()
	}, [props]);

    const updateChosenAccount = (account: Account) => {
        if(account.accountId !== chosenAccount) {
            props.fetchAccountDetails(account)
        }
        setChosenAccount(account.accountId === chosenAccount ? '' : account.accountId)
    }

    return (
        <ul>
            {props.accounts.map((account: Account) =>
                <div 
                    key={account.accountId} 
                    className="pointer-events-auto w-[21rem] rounded-lg bg-white p-4 shadow-xl shadow-black/5 ring-1 ring-slate-700/10 text-slate-900" 
                    onClick={() => updateChosenAccount(account)}>
                    <div className="flex justify-between">
                        <div className="text-lg font-semibold">{account.accountId}</div>
                    </div>
                    <div className="text-xs text-slate-400">{account.accountKey}</div>
                    {chosenAccount === account.accountId && props.chosenAccount !== undefined
                        ? <div className="rounded-md bg-white leading-6">
                            <div className="mt-4 font-medium leading-5">Balance</div>
                            <div className="mt-1 flex items-center justify-between border-t border-slate-400/20 py-2">
                                <span className="">{props.chosenAccount.balance}</span>
                                <span className="w-1/5 text-xs text-slate-400 text-right pr-1">{props.chosenAccount.currency}</span>
                            </div>
                            <div className="mt-4 font-medium leading-5">Available for trading</div>
                            <div className="mt-1 flex items-center justify-between border-t border-slate-400/20 py-2">
                                <span className="">{props.chosenAccount.availableForTrading}</span>
                                <span className="w-1/5 text-xs text-slate-400 text-right pr-1">{props.chosenAccount.currency}</span>
                            </div>
                        </div>
                        : null}
                </div>
            )}
        </ul>
    );
}

const mapStateToProps = (state: any) => {
    return {
        accounts: state.account.accounts,
        chosenAccount: state.account.chosenAccount
    }
}

const mapDispatchToProps  = (dispatch: AppDispatch) => {
    return {
        fetchAccounts: () => dispatch(fetchAccounts()),
        fetchAccountDetails: (account: Account) => dispatch(fetchAccountDetails(account))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountOverview);