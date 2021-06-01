import './App.css';
import React from 'react';
import Header from "./components/Header";
import Main from "./components/Main";

export const GlobalCtx = React.createContext(null)

function App() {
  const [gState, setGState] = React.useState({url: "https://job-backend-api.herokuapp.com", token: null})

  React.useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"))
    console.log(token)
    if(token) {
      setGState({...gState, token: token.token})
    }
  }, [])
  return (
    <GlobalCtx.Provider value={{gState, setGState}}>
    <div className="">
      <Header/>

      <Main token={gState.token}/>
    </div>

    </GlobalCtx.Provider>
  );
}

export default App;
