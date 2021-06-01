import {useState} from "react";
import {Link} from "react-router-dom";
import Section from "../components/Section";

 

function Index(props) {

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
        console.log(props.jobs)
      return props.jobs ? props.jobs.map((job, index) => 
        (
          <div key={index} className="card-flex">
            <div className="card-main"><span className="view-card">View my application progress</span></div>
            <div key={job._id} className="card">
                <Link to ={`/job/${job._id}`}><p className="card-heading">Job Title: {job.title}</p></Link>
                <p><span className="card-heading">Description: </span>{job.description}</p>
                <ul><span className="card-heading">Requirements: </span>{job.requirements.split(".").map((req,index)=> (<li key={index}>{req}</li>))}</ul>
                <p><span className="card-heading">Salary: </span>{job.salary}</p>
                <p><span className="card-heading">Location: </span>{job.location}</p>
            </div>
        </div>

        )) : null
    }

   const loading = () => {
       return <h1> Loading jobs...</h1>
   }

   return (
       <section>
           <Section title="Add a new job"/>
           <form className="form-style" onSubmit={handleSubmit}>
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
           <Section title="Jobs I'm tracking"/>
           {props.jobs ? <div className="flex-cols">{loaded()}</div> : loading()}
       </section>
   )
}

export default Index