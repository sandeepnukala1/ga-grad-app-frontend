import { useState } from "react"



function Show(props) {
    const id = props.match.params.id
    const jobs = props.jobs
    const job = jobs.find(p => p._id === id)
    console.log(job)
    
    // state for form
    const [editForm, setEditForm] = useState(job)
    const [hasBeenToggled, setHasBeenToggled] = useState(false)
    
  // handleChange function for form
  const handleChange = event => {
    const updatedSubForm = {...editForm}
    if (event.target.type === 'checkbox') {
      setHasBeenToggled(true)
      updatedSubForm[event.target.name] =
          !updatedSubForm[event.target.name];
    } else {
      updatedSubForm[event.target.name] = event.target.value;
    }
    setEditForm(updatedSubForm);
  }

  const handleToggle = ({ target }) =>
  setEditForm(s => ({ ...s, [target.name]: !s[target.name] }));

  // handlesubmit for form
  const handleSubmit = event => {
    event.preventDefault()
    console.log(editForm)
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
        <h1>title: {job.title}</h1>
        <p>Description: {job.description}</p>
        <ul>Job Requirements: {jobrequirementitems}</ul>
        <h3>Job Location: {job.location}</h3>
        <h3>Salary: {job.salary}</h3>


        <button id="delete" onClick={removeJob}>
        DELETE
      </button>
        <form onSubmit={handleSubmit}>
        <h2>Job Track Progress</h2>
          <table>
            <tr>
              <th>Resume Ready?</th>
              <th>LinkedIn Connection?</th>
              <th>Recruiter Follow-Up?</th>
              <th>Application Submitted?</th>
              <th>Date Submitted?</th>
            </tr>
            <tr>
              <td>
                <input type="checkbox" id="vehicle1" name="resumeReady" value={editForm.resumeReady} onChange={handleChange} checked={hasBeenToggled ? editForm.resumeReady : job.resumeReady}/>
              </td>
              <td>
                <input type="checkbox" id="vehicle1" name= "foundLinkedInConnection" value={editForm.foundLinkedInConnection} onChange={handleChange} checked={editForm.foundLinkedInConnection}/>
              </td>
              <td>
                <input type="checkbox" id="vehicle1" name= "recruiterFollowUp" value={editForm.recruiterFollowUp} onChange={handleChange} checked={editForm.recruiterFollowUp}/>
              </td>
              <td>
                <input type="checkbox" id="vehicle1" name= "applicationSubmitted" value={editForm.applicationSubmitted} onChange={handleChange} checked={editForm.applicationSubmitted}/>
              </td>
              <td>
                <input type="date" id="vehicle1" name= "dateSubmitted" value={editForm.dateSubmitted} onChange={handleChange} />
              </td>
            </tr>
          </table>
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