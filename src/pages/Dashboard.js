import {useState} from "react";
import React from "react"
import {Link} from "react-router-dom";
import { GlobalCtx } from "../App";

 

function Dashboard(props) {
    console.log("dashboard");
    const {gState, setGState} = React.useContext(GlobalCtx)
    const {url, token} = gState;

    const [jobs, setJobs] = useState(null);

    const getJobs = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setJobs(data)
    }

    React.useEffect(()=> {

    }, [])

    const [newForm, setNewForm] = useState({
        title: "",
        description: "",
        requirements: "",
        location: "",
        salary: "",
    })

    const handleChange = (event) => {
        setNewForm({...newForm, [event.target.name]: event.target.value})
    }

   const handleSubmit = (event) => {
       event.preventDefault()
       props.createJobs(newForm);
       setNewForm({
        title: "",
        description: "",
        requirements: "",
        location: "",
        salary: "",
       })
   } 

   

    const loaded = () => {
        
        
        return props.jobs.map((job) => {
        const jobrequirements = job.requirements.split(".")

          
          return (
              
              <div key={job._id} className="job">
               <Link to ={`/job/${job._id}`}><h1>{job.title}</h1></Link>
               <p>{job.description}</p>
               <ul>{jobrequirements.map((req)=> (<li>{req}</li>))}</ul>
               <h2>{job.salary}</h2>
               <h3>{job.location}</h3>
           </div>

)
})
   }
   const loading = () => {
       return <h1> Loading jobs...</h1>
   }
   return (
       <section>
           <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={newForm.title}
                name="title"
                placeholder="job title"
                onChange={handleChange}
            />
            <input 
                type="text"
                value={newForm.requirements}
                name="requirements"
                placeholder="job requirements"
                onChange={handleChange}
            />
            <input
                type="text"
                value={newForm.description}
                name="description"
                placeholder="job description"
                onChange={handleChange}
            />
            <input 
                type="text"
                value={newForm.location}
                name="location"
                placeholder="location"
                onChange={handleChange}
            />
            <input
                type="text"
                value={newForm.salary}
                name="salary"
                placeholder="salary"
                onChange={handleChange}
            />
            <input type="submit" value="Add new Job" />

           </form>
           {props.jobs ? loaded(props.jobs) : loading()}
       </section>
   )
}

export default Dashboard

