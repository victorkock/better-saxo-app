import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from './components/navigation/Header';
import { fetchUser } from "./redux/user/userSlice";
import Login from "./components/login/Login";
import { fetchBalance } from "./redux/balance/balanceSlice";
import { fetchAccounts } from "./redux/account/accountSlice";

const App = (props: any) => {
  const dataFetchedRef = useRef(false);
  console.log(props.dispatch)
  useEffect(() => {
    if(dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    props.dispatch(fetchUser());
    props.dispatch(fetchBalance());
    props.dispatch(fetchAccounts());
  }, []);
    
  return (
    <div className='w-full h-full	text-slate-100'>
      <Header />
        <div className='w-full h-full bg-slate-800 flex flex-col justify-center items-center'>
        { props.isAuthorized ? <Outlet /> : <Login /> }
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
      isAuthorized: state.auth.isAuthorized
  }
}

export default connect(mapStateToProps)(App);
