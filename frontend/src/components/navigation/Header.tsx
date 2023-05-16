import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = (props: any) => {
    return (
        <div className="header w-full bg-slate-900 flex justify-between px-3 font-semibold">
            <div className="basis-3/4 flex justify-start items-center">
                <Link to='/' className="m-1 hover:underline">Home</Link>
                <Link to='/account' className="m-1 hover:underline">Account</Link>
                <Link to='/buy' className="m-1 hover:underline">Buy</Link>
            </div>
            { !props.isAuthorized ? null
                : <div className="basis-1/4 flex justify-end items-center">
                    <Link to='/user' className="m-1 hover:underline">{props.user.name}</Link>
                </div>
            }
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
        isAuthorized: state.auth.isAuthorized
    }
}

export default connect(mapStateToProps)(Header);