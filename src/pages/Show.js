import { useState } from "react"



function Show(props) {
    const id = props.match.params.id
    const jobs = props.jobs
    const job = jobs.find(p => p._id === id)


     // state for form
  const [editForm, setEditForm] = useState(job)

  // handleChange function for form
  const handleChange = event => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value })
  }

  // handlesubmit for form
  const handleSubmit = event => {
    event.preventDefault()
    props.updateJobs(editForm, job._id)
    // redirect people back to index
    props.history.push("/")
  }

  const removeJob = () => {
    props.deleteJobs(job._id)
    props.history.push("/")
  }
    
   
        const jobrequirements = job.requirements.split(".")

        const jobrequirementitems = []
        for (let i = 0; i < jobrequirements.length; i++) {
            jobrequirementitems.push(<li key={i}>{jobrequirements[i]}</li>)
        }

       
  
  
    return (
      <div className="job">
        <h1>{job.title}</h1>
        <p>{job.description}</p>
        <ul>{jobrequirementitems}</ul>
        <h3>{job.location}</h3>
        <h3>{job.salary}</h3>
        <button id="delete" onClick={removeJob}>
        DELETE
      </button>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.title}
          name="title"
          placeholder="job title"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.requirements}
          name="requirements"
          placeholder="job requirements"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.salary}
          name="salary"
          placeholder="salary"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.location}
          name="location"
          placeholder="location"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.description}
          name="description"
          placeholder="description"
          onChange={handleChange}
        />
        <input type="submit" value="Update Job" />
      </form>

      </div>
    )
  }
  
  export default Show