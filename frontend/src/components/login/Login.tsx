import React from "react";
import { connect } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { authorize } from "../../redux/auth/authSlice";
import { Navigate } from "react-router-dom";

const Login = (props: any) => {
    const dispatch = useAppDispatch();

    const login = () => {
        dispatch(authorize(""));
        localStorage.setItem('loggedIn', 'true')
    };

    return props.isAuthorized 
        ? <Navigate to="/"></Navigate> 
        : <button className="inline-flex justify-center rounded-md text-lg font-semibold py-3 px-4 bg-sky-900 hover:bg-slate-700" onClick={login}>LOG IND</button>;
}

const mapStateToProps = (state: any) => {
    return {
      isAuthorized: state.auth.isAuthorized
    }
  }

export default connect(mapStateToProps)(Login);