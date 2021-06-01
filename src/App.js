import React from "react"
import './App.css';
import Header from "./components/Header";
import Main from "./components/Main";
import {Route, Link, Switch} from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"

export const GlobalCtx = React.createContext(null)


function App() {
  const [gState, setGState] = React.useState({url:"https://job-backend-api.herokuapp.com", 
  token: null,
})

//SEEING IF ALREADY LOGGED IN 

React.useEffect(() => {
  const token = JSON.parse(window.localStorage.getItem("token"))
  console.log(token)
  if (token) {
    setGState({...gState, token: token.token})
  }
}, [])
  return (
    <GlobalCtx.Provider value={{gState, setGState}}>
      <div className="App">
        <Link to= "/"><h1>
          My Job Assembly</h1>
        </Link>
        <Header/>
        <main>
          <Switch>
            <Route exact path="/" render={(rp) => gState.token ? <Dashboard/>: <Home/>}/>
            <Route path="/signup" render={(rp) => <Signup {...rp} />}/>
            <Route path="/login" render={(rp) => <Login {...rp}/>}/>
          </Switch>
        </main>
      </div>
    </GlobalCtx.Provider>
  );
}

export default App;
