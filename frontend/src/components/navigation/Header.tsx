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
        <div className="header w-full bg-slate-900 flex justify-between px-3 font-semibold">
            <div className="basis-3/4 flex justify-start items-center">
                <Link to='/' className="m-1 hover:underline">Home</Link>
                <Link to='/account' className="m-1 hover:underline">Account</Link>
                <Link to='/buy' className="m-1 hover:underline">Buy</Link>
            </div>
            <div className="basis-1/4 flex justify-end items-center">
                <Link to='/user' className="m-1 hover:underline">{props.user.name}</Link>
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