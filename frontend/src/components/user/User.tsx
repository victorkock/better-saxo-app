import { connect } from "react-redux";
import image from '../../assets/image.png'

const User = (props: any) => {

    return (
        <div className="w-1/2 p-2 bg-slate-300 text-slate-900 rounded-md flex justify-between">
            <div className="w-1/4 flex flex-col">
                <h1 className="text-lg">{props.user.name}</h1>
                <h2 className="text-sm">{props.user.id}</h2>
            </div>
            <img src={image} alt="Logo" />
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(User);