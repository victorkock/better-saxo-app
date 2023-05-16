import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { fetchUser } from "../../redux/user/userSlice";

const Header = (props: any) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
		dispatch(fetchUser())
	}, []);

    return (
        <div className="header bg-slate-900 flex justify-between">
            <div className="basis-3/4 flex justify-start">
                <Link to='/account'>Account</Link>
                <Link to='/buy'>Buy</Link>
            </div>
            <div className="basis-1/4 flex justify-end">
                <Link to='/user'>{props.user.name}</Link>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Header);