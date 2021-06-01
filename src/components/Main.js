import {useEffect, useState, useContext} from "react";
import {Route, Switch} from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";
import Section from "./Section"
import Signup from "../pages/Signup"
import Login from "../pages/Login"
import {GlobalCtx} from "../App"

function Main(props){
    const [jobs, setJobs] = useState(null);
    const {gState, setGState} = useContext(GlobalCtx)
    
    //URL to be updated when AJ provides URL
    const URL = "http://localhost:4000/job/";

    const token = JSON.parse(window.localStorage.getItem("token")).token

    const getJobs = async () => {

        console.log(gState.token)
        const response = await fetch(URL, {
            method: "get",
            headers: {
                "Authorization": "bearer " + token 
            }
        });
        const data = await response.json();
        setJobs(data)
    }
    
    const createJobs = async(jobs) => {
        console.log("jobs", jobs)
        await fetch(URL, { 
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + token
            },
            body: JSON.stringify(jobs),
        })
        getJobs()
    }

    const updateJobs = async (job, id) => {
        // make put request to create people
        await fetch(URL + id, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + token
          },
          body: JSON.stringify(job),
        })
        // update list of people
        getJobs()
      }
    
      const deleteJobs = async id => {
        // make delete request to create people
        await fetch(URL + id, {
          method: "delete",
          headers: {
            Authorization: `bearer ` + token
          },
        })
        // update list of people
        getJobs()
      }
    

    useEffect(() => getJobs(), [])

    return (

        <main>
            <Switch>
                <Route exact path="/" render={() => token ? 
                <Index jobs={jobs} createJobs={createJobs} /> : <h1>Home</h1>}>
                    
                </Route>
                <Route path="/signup" render={(rp) => <Signup {...rp} />}/>
                <Route path="/login" render={(rp) => <Login {...rp} />}/>
                <Route path="/job/:id"
                    render={(rp) => (
                        <Show 
                            jobs={jobs}
                            updateJobs={updateJobs}
                            deleteJobs={deleteJobs}
                        {...rp}
                        />
                    )} 
                />
            </Switch>
        </main>
    )

}
export default Main