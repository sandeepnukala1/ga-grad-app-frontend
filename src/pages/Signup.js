import React from "react"
import {GlobalCtx} from "../App"

function Signup(props) {
    console.log("signup")
    const { gState, setGState } = React.useContext(GlobalCtx)
    const {url} = gState

    const blank = {
        username: "",
        password: "",
    }

    const [form, setForm] = React.useState(blank)

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const {username, password} = form
        fetch(`$(url)/auth/signup`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(data => {
            setForm(blank)
            props.history.push("/login")
        })
    }
    return (
        <div>
           
            <form onSubmit = {handleSubmit}>
                <input 
                type="text" 
                name="username" 
                value={form.username} 
                onChange={handleChange}
                />
                <input 
                type="text" 
                name="password" 
                value={form.password} 
                onChange={handleChange}
                />
                <input type="submit" name="signup"/>
            </form>
        </div>

    ) 
}

export default Signup