import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditAgent = () => {
    const navigate = useNavigate()
    const {id}=useParams()
    useEffect(() => {
        axios.get(`http://localhost:3000/auth/agent/${id}`)
          .then(result => {
            const agentData = result.data.Result[0];
            // Check if time_zone is empty, and set it to a default value (e.g., 'EST') if it is
            const timeZone = agentData.time_zone || 'EST';
      
            setAgent({
              name: agentData.name,
              email: agentData.email,
              website_login: agentData.website_login,
              website_password: agentData.website_password,
              password: '',
              time_zone: timeZone,
              startHour: agentData.startHour,
              endHour: agentData.endHour
            });
          })
          .catch(err => console.log(err));
      }, []);
      
    const [agent, setAgent] = useState({
        name: '',
        email: '',
        password: '',
        website_login: '',
        website_password: '',
        time_zone: '',
        startHour:'',
        endHour:'',
      })
      const handleSubmit = (e) =>{
        e.preventDefault()
        axios.put(`http://localhost:3000/auth/edit_agent/${id}`,agent)
        .then(result=>{
            console.log(result.data)
            navigate(-1)

        }).catch(err => console.log(err))
      }
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className=" p-3 rounded border" style ={{width:'80%'}}>
        <h3 className="text-center">Edit Agent</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={agent.name}
              onChange={(e) => setAgent({ ...agent, name: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={agent.email}
              onChange={(e) => setAgent({ ...agent, email: e.target.value })}

            />
          </div>
          <div className="col-12">
            <label for="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword"
              placeholder="Enter Password"
              autoComplete="off"
              onChange={(e) => setAgent({ ...agent, password: e.target.value })}

            />
          </div>
          
          
          <div className="col-12">
            <label for="website_credentials" className="form-label">
              Website Credentials
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="website_login"
              placeholder="Login"
              value={agent.website_login}
              onChange={(e) => setAgent({ ...agent, website_login: e.target.value })}

            />
            <input
              type="text"
              className="form-control rounded-0"
              id="website_password"
              placeholder="Enter Password"
              value={agent.website_password}
              onChange={(e) => setAgent({ ...agent, website_password: e.target.value })}

            />
          </div>

          <div className="col-12">
            <label for="TimeZone" className="form-label">
              Time Zone
            </label>
            <select
              name='TimeZone'
              id='TimeZone'
              className='form-select'
              value={agent.time_zone}
              onChange={(e) => setAgent({ ...agent, time_zone: e.target.value })}
            >
              <option value='EST'>EST</option>
              <option value='CST'>CST</option>
              <option value='MST'>MST</option>
              <option value='PST'>PST</option>
              <option value='Hawaii'>Hawaii</option>
              <option value='Alaska'>Alaska</option>


            </select>
          </div>
          
          <div className="col-12">
            <label for="startHour">Work Start Hour</label>
            <input
              type="time"
              id="startHour"
              name="startHour"
              className="form-control rounded-0"
              value={agent.startHour}
              onChange={(e) => setAgent({ ...agent, startHour: e.target.value })}
              required
            />
          </div>
          <div className="col-12">
            <label for="endHour">Work End Hour</label>
            <input
              type="time"
              id="endHour"
              name="startHour"
              className="form-control rounded-0"
              value={agent.endHour}
              onChange={(e) => setAgent({ ...agent, endHour: e.target.value })}
              required
            />
          </div>

          

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditAgent