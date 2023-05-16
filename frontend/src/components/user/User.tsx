import React from "react";
import { connect } from "react-redux";

const User = (props: any) => {

    return (
        <div>
            <h1>{props.user.name}</h1>
            <p>{props.user.id}</p>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(User);