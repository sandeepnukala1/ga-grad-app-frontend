import {Link} from "react-router-dom";
import {GlobalCtx} from "../App"
import React from 'react'

function Header(props) {
    const {gState, setGState} = React.useContext(GlobalCtx)

    const logout = (
        <Link to="">
            <div onClick={() => {
                window.localStorage.removeItem("token");
                setGState({...gState, token: null})
            }}>Logout</div>
        </Link>
    )
    return (
        <nav className="nav">
            <Link to="/">
                <div>Job Assembly</div>
            </Link>
            <Link to="/signup">
                <div>Signup</div>
            </Link>
            <Link to="/login">
                <div>Login</div>
            </Link>
            {gState.token ? logout : null}
        </nav>

    ) 
}

export default Header