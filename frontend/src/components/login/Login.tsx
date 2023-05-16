import React from "react";
import { connect } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { authorize } from "../../redux/auth/authSlice";
import { Navigate } from "react-router-dom";

const Login = (props: any) => {
    const dispatch = useAppDispatch();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        dispatch(authorize(""));
    };

    const login = (
        <form onSubmit={handleSubmit}>
            <input id="userpassword" type="password" placeholder="Password" />
            <input type="submit" />
        </form>
    );

    return (
        <>
            {props.isAuthorized ? <Navigate to="/"></Navigate> : login}
        </>
    );
}

const mapStateToProps = (state: any) => {
    return {
      isAuthorized: state.auth.isAuthorized
    }
  }

export default connect(mapStateToProps)(Login);