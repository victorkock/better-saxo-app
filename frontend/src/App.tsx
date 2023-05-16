import { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, redirect } from "react-router-dom";
import Header from './components/navigation/Header';
import { useAppDispatch } from "./redux/hooks";
import { fetchUser } from "./redux/user/userSlice";
import Login from "./components/login/Login";

const App = (props: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch]);
    
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
