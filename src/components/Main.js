import {useEffect, useState} from "react";
import {Route, Switch} from "react-router-dom";
import Index from "../pages/Dashboard";
import Show from "../pages/Show";
import {GlobalCtx} from "../App";

function Main(props){
    const [jobs, setJobs] = useState(null);
    
    //URL to be updated when AJ provides URL
    const URL = "https://job-backend-api.herokuapp.com/jobs/";

    const getJobs = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setJobs(data)
    }
    
    const createJobs = async(jobs) => {
        console.log("jobs", jobs)
        await fetch(URL, { 
            method: "post",
            headers: {
                "Content-Type": "application/json",
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
        })
        // update list of people
        getJobs()
      }
    

    useEffect(() => getJobs(), [])

    return (

        <main>
            <Switch>
                <Route exact path="/">
                    <Index jobs={jobs} createJobs={createJobs} />
                </Route>
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

