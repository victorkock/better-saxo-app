import React from "react";
import { connect } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { fetchUser } from "../../redux/user/userSlice";

const User = (props: any) => {
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>{props.user.name}</h1>
            <p>{props.user.id}</p>
            <button onClick={() => dispatch(fetchUser(props.state))}>Click to fetch user :-)!</button>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(User);