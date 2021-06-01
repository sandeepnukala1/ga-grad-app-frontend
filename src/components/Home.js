import React from "react"
import {Link} from "react-router-dom";

function Home(props) {
    return (
        <div>
            <h1>Welcome to  Job Assembly</h1>
            <h2>An efficient Job Organizing tool</h2>
            <Link to="/signup">
                <h3 className = "signup">Signup here</h3>
            </Link>
            <Link to="/login">
                <h3 className = "login">Login here</h3>
            </Link>


        </div>
    )
}



export default Home